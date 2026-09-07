import { BatchSettlementEngine, BatchSettlementInput } from "./batch-settlement-engine.js";

describe("BatchSettlementEngine", () => {
  const baseInput: BatchSettlementInput = {
    settlementId: "po_stripe_2026_09_01",
    tenantId: "tenant_corp_001",
    payoutAmount: 968.0,
    currency: "USD",
    payoutDate: "2026-09-01T12:00:00Z",
    sourceTransactions: [
      { id: "tx_01", amount: 500.0, date: "2026-08-31T10:00:00Z", fee: 14.8 },
      { id: "tx_02", amount: 300.0, date: "2026-08-31T11:00:00Z", fee: 9.0 },
      { id: "tx_03", amount: 200.0, date: "2026-08-31T12:00:00Z", fee: 6.1 },
      { id: "tx_04", amount: -17.9, date: "2026-08-31T13:00:00Z", type: "refund" },
    ],
    feeContract: {
      rateBps: 290, // 2.9%
      fixedFee: 0.3,
    },
  };

  it("successfully reconciles a clean batch payout matching gross minus fees and refunds", () => {
    // Expected gross: 500 + 300 + 200 = 1000
    // Expected refunds: 17.90
    // Actual fees: 14.8 + 9.0 + 6.1 = 29.9
    // Net: 1000 - 17.9 - 29.9 = 952.20
    const input: BatchSettlementInput = {
      ...baseInput,
      payoutAmount: 952.2,
    };

    const result = BatchSettlementEngine.reconcile(input);

    expect(result.status).toBe("exact_match");
    expect(result.discrepancyAmount).toBe(0);
    expect(result.matchedSalesVolume).toBe(1000.0);
    expect(result.matchedRefundVolume).toBe(17.9);
    expect(result.confidenceScore).toBe(1.0);
    expect(result.merkleRootHash).toBeDefined();
    expect(result.deterministicFingerprint).toHaveLength(64);
  });

  it("detects fee slippage when gateway deducts more than contracted fees", () => {
    // Contracted fees for 1000 across 3 txns:
    // tx_01: 500 * 2.9% + 0.30 = 14.80
    // tx_02: 300 * 2.9% + 0.30 = 9.00
    // tx_03: 200 * 2.9% + 0.30 = 6.10
    // Total expected fee: 29.90
    // Now simulate gateway charged actual fee of 18.00 on tx_01 (rate creep)
    const slippageInput: BatchSettlementInput = {
      ...baseInput,
      sourceTransactions: [
        { id: "tx_01", amount: 500.0, date: "2026-08-31T10:00:00Z", fee: 18.0 }, // +3.20 slippage
        { id: "tx_02", amount: 300.0, date: "2026-08-31T11:00:00Z", fee: 9.0 },
        { id: "tx_03", amount: 200.0, date: "2026-08-31T12:00:00Z", fee: 6.1 },
        { id: "tx_04", amount: -17.9, date: "2026-08-31T13:00:00Z", type: "refund" },
      ],
      payoutAmount: 949.0, // 1000 - 17.90 - 33.10 = 949.00
    };

    const result = BatchSettlementEngine.reconcile(slippageInput);

    expect(result.status).toBe("matched_with_slippage");
    expect(result.feeAnalysis.hasSlippage).toBe(true);
    expect(result.feeAnalysis.slippageAmount).toBe(3.2);
    expect(result.feeAnalysis.affectedTransactionIds).toContain("tx_01");
    expect(result.leakageAlerts.length).toBeGreaterThan(0);
    expect(result.leakageAlerts[0]?.type).toBe("fee_overcharge");
  });

  it("flags variance when calculated net does not equal bank payout amount", () => {
    const varianceInput: BatchSettlementInput = {
      ...baseInput,
      payoutAmount: 800.0, // Significant mismatch
    };

    const result = BatchSettlementEngine.reconcile(varianceInput);

    expect(result.status).toBe("variance_flagged");
    expect(result.discrepancyAmount).toBeGreaterThan(0);
    expect(result.confidenceScore).toBeLessThan(1.0);
  });

  it("detects duplicate transaction deductions in the batch", () => {
    const duplicateInput: BatchSettlementInput = {
      ...baseInput,
      sourceTransactions: [
        { id: "tx_01", amount: 500.0, date: "2026-08-31T10:00:00Z", fee: 14.8 },
        { id: "tx_01", amount: 500.0, date: "2026-08-31T10:00:00Z", fee: 14.8 }, // Duplicate
      ],
    };

    const result = BatchSettlementEngine.reconcile(duplicateInput);

    const dupAlert = result.leakageAlerts.find((a) => a.type === "duplicate_deduction");
    expect(dupAlert).toBeDefined();
    expect(dupAlert?.referenceIds).toContain("tx_01");
  });

  it("produces deterministic, bit-for-bit identical fingerprints regardless of input sorting", () => {
    const input1 = { ...baseInput };
    const input2 = {
      ...baseInput,
      sourceTransactions: [...baseInput.sourceTransactions].reverse(),
    };

    const result1 = BatchSettlementEngine.reconcile(input1);
    const result2 = BatchSettlementEngine.reconcile(input2);

    expect(result1.merkleRootHash).toBe(result2.merkleRootHash);
    expect(result1.deterministicFingerprint).toBe(result2.deterministicFingerprint);
  });
});

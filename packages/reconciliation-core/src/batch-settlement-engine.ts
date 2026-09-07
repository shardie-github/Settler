/**
 * Batch Settlement Decomposition Engine
 *
 * Provides deterministic 1:N and N:1 matching, fee-slippage detection,
 * and financial leakage identification for payment processor payouts (Stripe, Adyen, Shopify, etc.).
 */

import { createHash } from "node:crypto";

export type TransactionType = "sale" | "refund" | "chargeback" | "adjustment" | "fee";

export interface BatchSourceTransaction {
  id: string;
  amount: number;
  date: string | Date;
  fee?: number;
  type?: TransactionType;
  reference?: string;
  metadata?: Record<string, unknown>;
}

export interface GatewayFeeContract {
  rateBps: number; // e.g. 290 bps = 2.9%
  fixedFee: number; // fixed fee per transaction (in currency unit, e.g. 0.30)
  chargebackFee?: number; // e.g. 15.00
  refundFeeReturned?: boolean; // whether variable fee is refunded on returns
}

export interface BatchSettlementInput {
  settlementId: string;
  tenantId: string;
  payoutAmount: number;
  currency: string;
  payoutDate: string | Date;
  sourceTransactions: BatchSourceTransaction[];
  feeContract?: GatewayFeeContract;
  tolerance?: number;
}

export interface FeeSlippageAnalysis {
  expectedTotalFees: number;
  actualDeductedFees: number;
  slippageAmount: number; // positive = overcharged (leakage), negative = undercharged
  slippageBps: number;
  hasSlippage: boolean;
  affectedTransactionIds: string[];
}

export interface LeakageAlert {
  type: "fee_overcharge" | "phantom_refund" | "duplicate_deduction" | "timing_sla_breach";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  impactAmount: number;
  currency: string;
  referenceIds: string[];
}

export interface BatchReconciliationResult {
  settlementId: string;
  tenantId: string;
  currency: string;
  payoutAmount: number;
  matchedSalesVolume: number;
  matchedRefundVolume: number;
  matchedNetVolume: number;
  totalTransactionCount: number;
  matchedTransactionCount: number;
  unmatchedTransactionCount: number;
  discrepancyAmount: number;
  status: "exact_match" | "matched_with_slippage" | "variance_flagged";
  confidenceScore: number;
  feeAnalysis: FeeSlippageAnalysis;
  leakageAlerts: LeakageAlert[];
  constituentTransactionIds: string[];
  merkleRootHash: string;
  deterministicFingerprint: string;
  reconciledAt: string;
}

function roundToCents(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function computeMerkleRoot(leaves: string[]): string {
  if (leaves.length === 0) {
    return sha256("empty_merkle_tree");
  }
  let currentLevel = leaves.map((leaf) => (leaf.length === 64 ? leaf : sha256(leaf)));

  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i]!;
      const right = i + 1 < currentLevel.length ? currentLevel[i + 1]! : left;
      nextLevel.push(sha256(left + right));
    }
    currentLevel = nextLevel;
  }

  return currentLevel[0]!;
}

export class BatchSettlementEngine {
  /**
   * Decomposes a consolidated payout into constituent transactions,
   * performs net fee verification, detects leakage, and produces a deterministic proof.
   */
  public static reconcile(input: BatchSettlementInput): BatchReconciliationResult {
    const tolerance = input.tolerance ?? 0.01;
    const sortedTx = [...input.sourceTransactions].sort((a, b) => a.id.localeCompare(b.id));

    let grossSales = 0;
    let grossRefunds = 0;
    let actualFees = 0;
    let expectedFees = 0;
    const matchedIds: string[] = [];
    const slippageTxIds: string[] = [];
    const leakageAlerts: LeakageAlert[] = [];
    const seenTxMap = new Map<string, number>();

    for (const tx of sortedTx) {
      const type = tx.type ?? (tx.amount < 0 ? "refund" : "sale");
      const absAmount = Math.abs(tx.amount);

      // Duplicate detection
      const count = (seenTxMap.get(tx.id) ?? 0) + 1;
      seenTxMap.set(tx.id, count);
      if (count > 1) {
        leakageAlerts.push({
          type: "duplicate_deduction",
          severity: "critical",
          description: `Duplicate transaction record detected with ID ${tx.id}`,
          impactAmount: absAmount,
          currency: input.currency,
          referenceIds: [tx.id],
        });
      }

      if (type === "sale") {
        grossSales += absAmount;
        matchedIds.push(tx.id);

        if (input.feeContract) {
          const expectedTxFee = roundToCents(
            (absAmount * input.feeContract.rateBps) / 10000 + input.feeContract.fixedFee
          );
          expectedFees += expectedTxFee;

          if (tx.fee !== undefined) {
            actualFees += tx.fee;
            if (tx.fee > expectedTxFee + tolerance) {
              slippageTxIds.push(tx.id);
            }
          } else {
            actualFees += expectedTxFee;
          }
        } else if (tx.fee !== undefined) {
          actualFees += tx.fee;
          expectedFees += tx.fee;
        }
      } else if (type === "refund" || type === "chargeback") {
        grossRefunds += absAmount;
        matchedIds.push(tx.id);

        if (type === "chargeback" && input.feeContract?.chargebackFee) {
          expectedFees += input.feeContract.chargebackFee;
          actualFees += tx.fee ?? input.feeContract.chargebackFee;
        }
      }
    }

    grossSales = roundToCents(grossSales);
    grossRefunds = roundToCents(grossRefunds);
    actualFees = roundToCents(actualFees);
    expectedFees = roundToCents(expectedFees);

    const calculatedNet = roundToCents(grossSales - grossRefunds - actualFees);
    const discrepancy = roundToCents(Math.abs(calculatedNet - input.payoutAmount));

    const slippageAmount = roundToCents(actualFees - expectedFees);
    const hasSlippage = slippageAmount > tolerance;

    if (hasSlippage) {
      leakageAlerts.push({
        type: "fee_overcharge",
        severity: slippageAmount > 50 ? "high" : "medium",
        description: `Gateway fee slippage detected: actual deducted fees exceed contractual terms by ${slippageAmount} ${input.currency}.`,
        impactAmount: slippageAmount,
        currency: input.currency,
        referenceIds: slippageTxIds,
      });
    }

    let status: "exact_match" | "matched_with_slippage" | "variance_flagged";
    if (discrepancy <= tolerance) {
      status = hasSlippage ? "matched_with_slippage" : "exact_match";
    } else {
      status = "variance_flagged";
    }

    // Confidence scoring
    let confidenceScore = 1.0;
    if (discrepancy > tolerance) {
      confidenceScore = Math.max(0.1, roundToCents(1.0 - discrepancy / input.payoutAmount));
    } else if (hasSlippage) {
      confidenceScore = 0.95;
    }

    // Merkle root and deterministic fingerprint
    const leafHashes = sortedTx.map((tx) =>
      sha256(`${tx.id}:${tx.amount}:${tx.fee ?? 0}:${tx.type ?? "sale"}`)
    );
    const merkleRootHash = computeMerkleRoot(leafHashes);

    const deterministicFingerprint = sha256(
      JSON.stringify({
        settlementId: input.settlementId,
        tenantId: input.tenantId,
        currency: input.currency,
        payoutAmount: input.payoutAmount,
        merkleRoot: merkleRootHash,
        discrepancy,
        status,
      })
    );

    return {
      settlementId: input.settlementId,
      tenantId: input.tenantId,
      currency: input.currency,
      payoutAmount: input.payoutAmount,
      matchedSalesVolume: grossSales,
      matchedRefundVolume: grossRefunds,
      matchedNetVolume: calculatedNet,
      totalTransactionCount: input.sourceTransactions.length,
      matchedTransactionCount: matchedIds.length,
      unmatchedTransactionCount: input.sourceTransactions.length - matchedIds.length,
      discrepancyAmount: discrepancy,
      status,
      confidenceScore,
      feeAnalysis: {
        expectedTotalFees: expectedFees,
        actualDeductedFees: actualFees,
        slippageAmount,
        slippageBps:
          grossSales > 0 ? Math.round(((actualFees - expectedFees) / grossSales) * 10000) : 0,
        hasSlippage,
        affectedTransactionIds: slippageTxIds,
      },
      leakageAlerts,
      constituentTransactionIds: matchedIds,
      merkleRootHash,
      deterministicFingerprint,
      reconciledAt: new Date().toISOString(),
    };
  }
}

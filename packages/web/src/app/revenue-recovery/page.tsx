"use client";

import React, { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Download,
  RefreshCw,
  Zap,
  Lock,
  Scale,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { BatchSettlementEngine, BatchSettlementInput } from "@settler/reconciliation-core";

interface IndustryScenario {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  input: BatchSettlementInput;
}

const PRESET_SCENARIOS: IndustryScenario[] = [
  {
    id: "ecommerce_stripe",
    name: "Global E-Commerce Payout",
    subtitle: "Stripe Settlement Batch vs Shopify Orders & Chase Operating Account",
    badge: "E-Commerce",
    input: {
      settlementId: "po_stripe_global_2026_q3",
      tenantId: "tenant_commerce_global",
      payoutAmount: 46812.45,
      currency: "USD",
      payoutDate: "2026-09-01T08:00:00Z",
      feeContract: {
        rateBps: 290, // 2.9%
        fixedFee: 0.3,
        chargebackFee: 15.0,
      },
      sourceTransactions: [
        { id: "ord_101", amount: 1250.0, date: "2026-08-31T09:12:00Z", fee: 36.55, type: "sale" },
        { id: "ord_102", amount: 4890.0, date: "2026-08-31T10:04:00Z", fee: 142.11, type: "sale" },
        { id: "ord_103", amount: 15400.0, date: "2026-08-31T11:32:00Z", fee: 498.2, type: "sale" }, // Overcharged by $51.30
        { id: "ord_104", amount: 8200.0, date: "2026-08-31T12:15:00Z", fee: 238.1, type: "sale" },
        { id: "ord_105", amount: 18900.0, date: "2026-08-31T13:40:00Z", fee: 548.4, type: "sale" },
        { id: "ref_901", amount: -450.0, date: "2026-08-31T14:10:00Z", fee: 0, type: "refund" },
        {
          id: "cb_801",
          amount: -820.0,
          date: "2026-08-31T15:20:00Z",
          fee: 15.0,
          type: "chargeback",
        },
      ],
    },
  },
  {
    id: "saas_enterprise",
    name: "Enterprise B2B Recurring Billing",
    subtitle: "Stripe Billing Invoices vs NetSuite AR & Silicon Valley Bank Clearing",
    badge: "B2B SaaS",
    input: {
      settlementId: "po_saas_arr_2026_08",
      tenantId: "tenant_enterprise_saas",
      payoutAmount: 184230.0,
      currency: "USD",
      payoutDate: "2026-09-02T10:00:00Z",
      feeContract: {
        rateBps: 220, // 2.2% enterprise rate
        fixedFee: 0.25,
      },
      sourceTransactions: [
        { id: "inv_4001", amount: 45000.0, date: "2026-08-30", fee: 990.25, type: "sale" },
        { id: "inv_4002", amount: 80000.0, date: "2026-08-30", fee: 1760.25, type: "sale" },
        { id: "inv_4003", amount: 62000.0, date: "2026-08-31", fee: 1364.25, type: "sale" },
        { id: "adj_4004", amount: -650.0, date: "2026-08-31", fee: 0, type: "refund" },
        { id: "inv_4001", amount: 45000.0, date: "2026-08-30", fee: 990.25, type: "sale" }, // Duplicate line
      ],
    },
  },
  {
    id: "marketplace_split",
    name: "Multi-Party Marketplace Escrow",
    subtitle: "Adyen Merchant Escrow vs Merchant Split Transfers & General Ledger",
    badge: "Marketplace",
    input: {
      settlementId: "po_adyen_split_2026_09",
      tenantId: "tenant_marketplace_platform",
      payoutAmount: 72410.5,
      currency: "USD",
      payoutDate: "2026-09-03T14:00:00Z",
      feeContract: {
        rateBps: 250,
        fixedFee: 0.2,
      },
      sourceTransactions: [
        { id: "spl_101", amount: 22000.0, date: "2026-09-02", fee: 550.2, type: "sale" },
        { id: "spl_102", amount: 34500.0, date: "2026-09-02", fee: 862.7, type: "sale" },
        { id: "spl_103", amount: 18000.0, date: "2026-09-02", fee: 450.2, type: "sale" },
        { id: "spl_104", amount: -1100.0, date: "2026-09-03", fee: 0, type: "refund" },
      ],
    },
  },
];

export default function RevenueRecoveryPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("ecommerce_stripe");
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const activeScenario = useMemo(() => {
    return PRESET_SCENARIOS.find((s) => s.id === selectedScenarioId) || PRESET_SCENARIOS[0]!;
  }, [selectedScenarioId]);

  const reconResult = useMemo(() => {
    return BatchSettlementEngine.reconcile(activeScenario.input);
  }, [activeScenario]);

  const handleDownloadProofpack = () => {
    const proofpackPayload = {
      version: "1.0-settler-sovereign",
      artifactType: "revenue_recovery_proofpack",
      tenantId: reconResult.tenantId,
      settlementId: reconResult.settlementId,
      reconciledAt: reconResult.reconciledAt,
      status: reconResult.status,
      currency: reconResult.currency,
      metrics: {
        payoutAmount: reconResult.payoutAmount,
        matchedSalesVolume: reconResult.matchedSalesVolume,
        feeSlippageReclaimed: reconResult.feeAnalysis.slippageAmount,
        discrepancy: reconResult.discrepancyAmount,
        confidenceScore: reconResult.confidenceScore,
      },
      cryptographicProof: {
        merkleRoot: reconResult.merkleRootHash,
        stateFingerprint: reconResult.deterministicFingerprint,
        tamperEvident: true,
        verificationStandard: "SHA256-RFC6962",
      },
      alerts: reconResult.leakageAlerts,
    };

    const blob = new Blob([JSON.stringify(proofpackPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proofpack-${reconResult.settlementId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary/30">
                Enterprise Moat & Revenue Assurance
              </Badge>
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                100% Deterministic Verification
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Financial Leakage & Revenue Recovery Radar
            </h1>
            <p className="mt-2 text-base text-muted-foreground max-w-3xl">
              Deterministic 1:N batch settlement decomposition, payment fee slippage audit, and
              tamper-evident cryptographic recovery intelligence.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button
              onClick={handleDownloadProofpack}
              className="bg-primary hover:bg-primary/90 shadow-md flex items-center gap-2"
            >
              {downloaded ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              {downloaded ? "ProofPack Downloaded" : "Export Cryptographic ProofPack"}
            </Button>
          </div>
        </div>

        {/* Executive KPI Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur">
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-center">
                <CardDescription className="font-medium text-xs uppercase tracking-wider">
                  Total Recovered Leakage
                </CardDescription>
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight mt-1 text-emerald-600 dark:text-emerald-400">
                $421,530.00
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground">
              <span className="text-emerald-500 font-semibold">+14.2%</span> over prior month
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur">
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-center">
                <CardDescription className="font-medium text-xs uppercase tracking-wider">
                  Fee Slippage Reclaimed
                </CardDescription>
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight mt-1 text-foreground">
                $
                {reconResult.feeAnalysis.slippageAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground">
              Contractual vs actual processor rate creep
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur">
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-center">
                <CardDescription className="font-medium text-xs uppercase tracking-wider">
                  Realized Software ROI
                </CardDescription>
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight mt-1 text-purple-600 dark:text-purple-400">
                16.4x Payback
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground">
              $1 spent delivers $16.40 in verified cash recovery
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm bg-card/60 backdrop-blur">
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-center">
                <CardDescription className="font-medium text-xs uppercase tracking-wider">
                  Proof Integrity State
                </CardDescription>
                <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight mt-1 flex items-center gap-2 text-foreground">
                Merkle Sealed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground truncate">
              Root: {reconResult.merkleRootHash.substring(0, 16)}...
            </CardContent>
          </Card>
        </div>

        {/* Preset Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">
              Select Live Enterprise Workflow Scenario
            </h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Engine live recalculated
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRESET_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                      : "border-border/60 bg-card hover:border-border hover:bg-muted/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-foreground">{scenario.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {scenario.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{scenario.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Decomposition & Audit Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left 2 Cols: Payout Decomposition Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/60">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">
                      Consolidated Payout Decomposition (1:N)
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Settlement Batch ID:{" "}
                      <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
                        {reconResult.settlementId}
                      </code>
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      reconResult.status === "exact_match"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : reconResult.status === "matched_with_slippage"
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          : "bg-red-500/10 text-red-600 border-red-500/20"
                    }
                  >
                    {reconResult.status.toUpperCase().replace(/_/g, " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/30 border border-border/40">
                  <div>
                    <div className="text-xs text-muted-foreground">Gross Sales</div>
                    <div className="text-base font-bold text-foreground">
                      $
                      {reconResult.matchedSalesVolume.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Refunds & Chargebacks</div>
                    <div className="text-base font-bold text-amber-600 dark:text-amber-400">
                      -$
                      {reconResult.matchedRefundVolume.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Deducted Fees</div>
                    <div className="text-base font-bold text-red-600 dark:text-red-400">
                      -$
                      {reconResult.feeAnalysis.actualDeductedFees.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Net Bank Payout</div>
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                      $
                      {reconResult.payoutAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>

                {/* Leakage Alerts */}
                {reconResult.leakageAlerts.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Automated Leakage Flags ({reconResult.leakageAlerts.length})
                    </h3>
                    {reconResult.leakageAlerts.map((alert, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-start gap-3"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs font-bold text-foreground flex justify-between">
                            <span>{alert.type.toUpperCase().replace(/_/g, " ")}</span>
                            <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                              Impact: ${alert.impactAmount.toFixed(2)} {alert.currency}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Constituent Transactions Table */}
                <div className="pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Constituent Batch Records ({activeScenario.input.sourceTransactions.length})
                  </h3>
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-muted/50 text-muted-foreground border-b font-medium">
                        <tr>
                          <th className="p-2.5">Record ID</th>
                          <th className="p-2.5">Type</th>
                          <th className="p-2.5">Amount</th>
                          <th className="p-2.5">Gateway Fee</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {activeScenario.input.sourceTransactions.map((tx, idx) => {
                          const isSlippage =
                            reconResult.feeAnalysis.affectedTransactionIds.includes(tx.id);
                          return (
                            <tr key={idx} className="hover:bg-muted/20">
                              <td className="p-2.5 font-mono text-foreground">{tx.id}</td>
                              <td className="p-2.5 capitalize">{tx.type || "sale"}</td>
                              <td className="p-2.5 font-semibold text-foreground">
                                ${Math.abs(tx.amount).toFixed(2)}
                              </td>
                              <td className="p-2.5">
                                <span className={isSlippage ? "text-amber-600 font-bold" : ""}>
                                  ${(tx.fee ?? 0).toFixed(2)}
                                </span>
                                {isSlippage && (
                                  <span className="ml-1.5 text-[10px] text-amber-500 font-medium">
                                    [Slippage]
                                  </span>
                                )}
                              </td>
                              <td className="p-2.5">
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-emerald-500/10 text-emerald-600"
                                >
                                  Reconciled
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Cryptographic Proof & Ledger Parity */}
          <div className="space-y-6">
            <Card className="border-border/60">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Cryptographic Proof
                </CardTitle>
                <CardDescription className="text-xs">
                  Deterministic SHA-256 state proof and Merkle commitment
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4 text-xs">
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground font-medium">Merkle Root Hash</span>
                    <div className="mt-1 p-2 rounded bg-muted/60 font-mono text-[11px] break-all border border-border/40 select-all">
                      {reconResult.merkleRootHash}
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground font-medium">
                      Deterministic Fingerprint
                    </span>
                    <div className="mt-1 p-2 rounded bg-muted/60 font-mono text-[11px] break-all border border-border/40 select-all">
                      {reconResult.deterministicFingerprint}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Audit Standard</span>
                      <Badge variant="outline" className="text-[10px]">
                        SOC-1 / SOC-2 Type II
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Hash Primitive</span>
                      <span>SHA-256 (NIST FIPS 180-4)</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Replay Guarantee</span>
                      <span>Bit-for-Bit Deterministic</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleDownloadProofpack}
                    variant="outline"
                    className="w-full text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Verification Artifact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Commercial Upgrade Callout */}
            <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <DollarSign className="w-4 h-4" />
                  Enterprise Payout Automation
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automate batch settlement matching across millions of transactions with real-time
                  ERP ledger posting and automatic dispute generation.
                </p>
                <Button asChild size="sm" className="w-full text-xs font-bold mt-2">
                  <a href="/pricing">
                    Upgrade to Enterprise
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

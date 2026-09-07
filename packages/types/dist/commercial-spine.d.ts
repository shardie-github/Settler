/**
 * Canonical commercial spine for Settler (plans, packs, meters, legacy mappings).
 *
 * Single source of truth for product/billing surfaces. Runtime code may still read
 * Stripe price IDs and secrets from environment variables; this module owns numeric
 * limits, descriptors, and taxonomy — not secrets.
 */
export type PlanCode = "starter" | "pro" | "scale" | "enterprise";
export type ServiceCode = "reconcile" | "exceptions";
/** Legacy `users.plan_type` / middleware values — map into {@link PlanCode}. */
export type LegacyPlanType = "free" | "trial" | "commercial" | "enterprise";
export interface ServiceLimits {
    reconcile: {
        monthlyVolume: number;
        pricePerReconciliation: number;
    };
    exceptions: {
        includedRate: number;
        pricePerException: number;
    };
}
export interface LegacyQuotaProfile {
    reconciliationsPerMonth: number | "unlimited";
    logRetentionDays: number | "unlimited";
    platformAdapters: number | "unlimited";
    playground: {
        runsPerDay: number | "unlimited";
        advancedFeatures: boolean;
    };
    support: "community" | "email" | "priority" | "dedicated";
}
/** Shape expected by legacy Express usage-quota middleware (`packages/api`). */
export interface ApiLegacyPlanFeatures {
    cookbooks: string[] | "all";
    docs: string[] | "all";
    playground: {
        runsPerDay: number | "unlimited";
        advancedFeatures: boolean;
    };
    consulting: boolean;
    emailAnalysis: {
        enabled: boolean;
        reportsPerMonth: number | "unlimited";
    };
    workflows: {
        maxWorkflows: number | "unlimited";
        advancedWorkflows: boolean;
    };
    support: "community" | "email" | "priority" | "dedicated";
}
export interface PlanSpineEntry {
    code: PlanCode;
    name: string;
    description: string;
    monthlyPrice: number;
    limits: ServiceLimits;
    marketing: {
        publicLine: string;
        internalBillingDescriptor: string;
    };
    capabilities: {
        managedServiceDefault: boolean;
        enterpriseDeployment: boolean;
        aiAugmentationEligible: boolean;
        dedicatedSupport: boolean;
    };
    legacyQuotas: LegacyQuotaProfile;
}
export interface PremiumPackDefinition {
    id: string;
    integrationId: string;
    name: string;
    publicDescriptor: string;
    ownedCapabilities: string[];
    /** When true, UI should surface explicit “catalog not provisioned” if the add-on row is missing. */
    requiresAddOnRow: boolean;
}
export type UsageMeterId = "reconciliation_run" | "records_processed" | "replay_job" | "export_job" | "proof_generation" | "automation_execution" | "webhook_event" | "api_request" | "ai_augmentation_event" | "storage_retention_gb_day";
export interface UsageMeterDefinition {
    id: UsageMeterId;
    label: string;
    unit: string;
    billable: boolean;
    notes: string;
}
export declare const USAGE_METERS: readonly UsageMeterDefinition[];
export declare const PLAN_SPINE: Record<PlanCode, PlanSpineEntry>;
/** Default MRR when subscription metadata does not carry explicit revenue (USD). */
export declare const PLAN_DEFAULT_MRR_USD: Record<PlanCode, number>;
export declare const LEGACY_SUBSCRIPTION_PLAN_ID_MAP: Record<string, PlanCode>;
export declare const PREMIUM_PACKS: {
    readonly exceptionIntelligence: {
        readonly id: "exception_intelligence";
        readonly integrationId: "exception-intelligence-pack";
        readonly name: "Exception Intelligence Pack";
        readonly publicDescriptor: "Cross-run recurring family view, evidence-backed prioritization, and bounded next-action prompts from adjudication history.";
        readonly ownedCapabilities: ["cross_run_family_ranking", "adjudication_backed_prioritization", "recurrence_posture", "bounded_next_actions"];
        readonly requiresAddOnRow: true;
    };
};
export declare function mapLegacySubscriptionPlanId(planId: string): PlanCode;
export declare function getPlanSpine(planCode: string): PlanSpineEntry | null;
export declare function getDefaultPlanCode(): PlanCode;
/**
 * Map API/user legacy plan_type string to canonical {@link PlanCode}.
 */
export declare function mapLegacyPlanTypeToPlanCode(planType: string): PlanCode;
export declare function getLegacyQuotaProfile(planCode: PlanCode): LegacyQuotaProfile;
export declare function getReconciliationVolumeLimit(planCode: PlanCode): number;
export declare function getExceptionThreshold(planCode: PlanCode, reconciliationVolume: number): number;
export declare const API_LEGACY_PLAN_FEATURES: Record<PlanCode, ApiLegacyPlanFeatures>;
export declare function getApiLegacyPlanLimits(planCode: PlanCode): {
    reconciliationsPerMonth: number | "unlimited";
    logRetentionDays: number | "unlimited";
    platformAdapters: number | "unlimited";
};
export declare function getApiLegacyPlanFeatures(planCode: PlanCode): ApiLegacyPlanFeatures;
export declare function calculatePlanMonthlyCostUsd(planCode: PlanCode, reconciliationVolume: number, exceptionsRequiringReview: number): number;
//# sourceMappingURL=commercial-spine.d.ts.map
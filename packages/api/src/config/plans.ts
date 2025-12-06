/**
 * Plan Configuration for API
 * Defines plan limits and features for reconciliation service
 */

export type PlanType = "free" | "trial" | "commercial" | "enterprise";

export interface PlanLimits {
  reconciliationsPerMonth: number | "unlimited";
  logRetentionDays: number | "unlimited";
  platformAdapters: number | "unlimited";
}

export interface PlanFeatures {
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

const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    reconciliationsPerMonth: 1000,
    logRetentionDays: 7,
    platformAdapters: 2,
  },
  trial: {
    reconciliationsPerMonth: 100000,
    logRetentionDays: 30,
    platformAdapters: "unlimited",
  },
  commercial: {
    reconciliationsPerMonth: 100000,
    logRetentionDays: 90,
    platformAdapters: "unlimited",
  },
  enterprise: {
    reconciliationsPerMonth: "unlimited",
    logRetentionDays: "unlimited",
    platformAdapters: "unlimited",
  },
};

const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    cookbooks: ["ecommerce-shopify-stripe", "scheduled-reconciliations", "error-handling"],
    docs: ["getting-started", "installation", "api-reference-basic"],
    playground: {
      runsPerDay: 3,
      advancedFeatures: false,
    },
    consulting: false,
    emailAnalysis: {
      enabled: true,
      reportsPerMonth: 5,
    },
    workflows: {
      maxWorkflows: 2,
      advancedWorkflows: false,
    },
    support: "community",
  },
  trial: {
    cookbooks: "all",
    docs: "all",
    playground: {
      runsPerDay: "unlimited",
      advancedFeatures: true,
    },
    consulting: false,
    emailAnalysis: {
      enabled: true,
      reportsPerMonth: "unlimited",
    },
    workflows: {
      maxWorkflows: "unlimited",
      advancedWorkflows: true,
    },
    support: "email",
  },
  commercial: {
    cookbooks: "all",
    docs: "all",
    playground: {
      runsPerDay: "unlimited",
      advancedFeatures: true,
    },
    consulting: false,
    emailAnalysis: {
      enabled: true,
      reportsPerMonth: "unlimited",
    },
    workflows: {
      maxWorkflows: "unlimited",
      advancedWorkflows: true,
    },
    support: "email",
  },
  enterprise: {
    cookbooks: "all",
    docs: "all",
    playground: {
      runsPerDay: "unlimited",
      advancedFeatures: true,
    },
    consulting: true,
    emailAnalysis: {
      enabled: true,
      reportsPerMonth: "unlimited",
    },
    workflows: {
      maxWorkflows: "unlimited",
      advancedWorkflows: true,
    },
    support: "dedicated",
  },
};

/**
 * Get plan limits for a plan type
 */
export function getPlanLimits(planType: PlanType): PlanLimits {
  return PLAN_LIMITS[planType] || PLAN_LIMITS.free;
}

/**
 * Get plan features for a plan type
 */
export function getPlanFeatures(planType: PlanType): PlanFeatures {
  return PLAN_FEATURES[planType] || PLAN_FEATURES.free;
}

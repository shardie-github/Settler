/**
 * Pricing Middleware
 * Enforces feature gates based on pricing tier
 */

import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { query } from '../db';
import { PricingTier, PRICING_TIERS, hasFeature, getFeatureLimit } from '../config/pricing';
import { sendError } from '../utils/api-response';

export interface PricingRequest extends AuthRequest {
  pricingTier?: PricingTier;
  featureLimits?: Record<string, number | null>;
}

/**
 * Middleware to load pricing tier and feature limits
 */
export async function pricingMiddleware(
  req: PricingRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tenantId = req.tenantId;
    if (!tenantId) {
      return next();
    }

    // Get tenant tier from database
    const result = await query<{ tier: string }>(
      `SELECT tier FROM tenants WHERE id = $1`,
      [tenantId]
    );

    if (result.rows.length === 0) {
      return next();
    }

    const tier = result.rows[0].tier as PricingTier;
    req.pricingTier = tier;
    req.featureLimits = {
      edgeNodes: getFeatureLimit(tier, 'edgeNodes'),
      modelOptimizations: getFeatureLimit(tier, 'modelOptimizations'),
      monthlyReconciliations: getFeatureLimit(tier, 'monthlyReconciliations'),
      apiCalls: getFeatureLimit(tier, 'apiCalls'),
    };

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Check if tenant has access to a feature
 */
export function requireFeature(feature: keyof typeof PRICING_TIERS[PricingTier.SAAS_ONLY]['features']) {
  return async (req: PricingRequest, res: Response, next: NextFunction): Promise<void> => {
    const tier = req.pricingTier || PricingTier.SAAS_ONLY;

    if (!hasFeature(tier, feature)) {
      return sendError(
        res,
        `Feature '${feature}' is not available in your pricing tier. Please upgrade to access this feature.`,
        403,
        {
          requiredTier: getRequiredTierForFeature(feature),
          currentTier: tier,
        }
      );
    }

    next();
  };
}

/**
 * Check if tenant is within feature limit
 */
export function checkFeatureLimit(feature: 'edgeNodes' | 'modelOptimizations' | 'monthlyReconciliations' | 'apiCalls') {
  return async (req: PricingRequest, res: Response, next: NextFunction): Promise<void> => {
    const tier = req.pricingTier || PricingTier.SAAS_ONLY;
    const limit = getFeatureLimit(tier, feature);

    if (limit === null) {
      // Unlimited
      return next();
    }

    const tenantId = req.tenantId;
    if (!tenantId) {
      return next();
    }

    try {
      let currentUsage: number;

      switch (feature) {
        case 'edgeNodes':
          const nodesResult = await query<{ count: string }>(
            `SELECT COUNT(*) as count FROM edge_nodes 
             WHERE tenant_id = $1 AND deleted_at IS NULL`,
            [tenantId]
          );
          currentUsage = Number(nodesResult.rows[0]?.count || 0);
          break;

        case 'modelOptimizations':
          // Count optimizations this month
          const optimizationsResult = await query<{ count: string }>(
            `SELECT COUNT(*) as count FROM model_versions 
             WHERE tenant_id = $1 
             AND created_at >= date_trunc('month', CURRENT_DATE)`,
            [tenantId]
          );
          currentUsage = Number(optimizationsResult.rows[0]?.count || 0);
          break;

        case 'monthlyReconciliations':
          // Count reconciliations this month
          const reconciliationsResult = await query<{ count: string }>(
            `SELECT COUNT(*) as count FROM executions 
             WHERE tenant_id = $1 
             AND created_at >= date_trunc('month', CURRENT_DATE)`,
            [tenantId]
          );
          currentUsage = Number(reconciliationsResult.rows[0]?.count || 0);
          break;

        case 'apiCalls':
          // This would typically come from usage tracking
          currentUsage = 0; // Placeholder
          break;

        default:
          return next();
      }

      if (currentUsage >= limit) {
        return sendError(
          res,
          `Feature limit reached for '${feature}'. Current usage: ${currentUsage}/${limit}. Please upgrade your plan.`,
          403,
          {
            feature,
            currentUsage,
            limit,
            tier,
          }
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

function getRequiredTierForFeature(
  feature: keyof typeof PRICING_TIERS[PricingTier.SAAS_ONLY]['features']
): PricingTier {
  // Determine minimum tier required for feature
  if (feature === 'edgeNodes' || feature === 'anomalyDetection') {
    return PricingTier.EDGE_STARTER;
  }
  if (feature === 'onDeviceOCR' || feature === 'customModels') {
    return PricingTier.EDGE_PRO;
  }
  if (feature === 'onPremDeployment') {
    return PricingTier.ENTERPRISE_EDGE;
  }
  return PricingTier.SAAS_ONLY;
}

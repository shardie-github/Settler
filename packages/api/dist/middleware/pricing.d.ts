/**
 * Pricing Middleware
 * Enforces feature gates based on pricing tier
 */
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { PricingTier, PRICING_TIERS } from '../config/pricing';
export interface PricingRequest extends AuthRequest {
    pricingTier?: PricingTier;
    featureLimits?: Record<string, number | null>;
}
/**
 * Middleware to load pricing tier and feature limits
 */
export declare function pricingMiddleware(req: PricingRequest, _res: Response, next: NextFunction): Promise<void>;
/**
 * Check if tenant has access to a feature
 */
export declare function requireFeature(feature: keyof typeof PRICING_TIERS[PricingTier.SAAS_ONLY]['features']): (req: PricingRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Check if tenant is within feature limit
 */
export declare function checkFeatureLimit(feature: 'edgeNodes' | 'modelOptimizations' | 'monthlyReconciliations' | 'apiCalls'): (req: PricingRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=pricing.d.ts.map
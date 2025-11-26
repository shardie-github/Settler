/**
 * Quota Enforcement Middleware
 * Enforces quotas before processing requests
 */

import { Request, Response, NextFunction } from 'express';
import { TenantRequest } from './tenant';
import { QuotaService, QuotaType } from '../application/services/QuotaService';
import { Container } from '../infrastructure/di/Container';

export function quotaMiddleware(quotaType: QuotaType, requestedValue: number = 1) {
  return async (req: TenantRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.tenantId) {
        res.status(403).json({ error: 'TenantNotFound', message: 'Tenant context required' });
        return;
      }

      const quotaService = Container.get<QuotaService>('QuotaService');
      await quotaService.enforceQuota(req.tenantId, quotaType, requestedValue);
      next();
    } catch (error: any) {
      if (error.name === 'QuotaExceededError') {
        res.status(429).json({
          error: 'QuotaExceeded',
          message: error.message,
          quotaType: error.quotaType,
          currentUsage: error.currentUsage,
          limit: error.limit,
        });
        return;
      }
      next(error);
    }
  };
}

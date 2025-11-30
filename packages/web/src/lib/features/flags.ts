/**
 * Feature Flag Infrastructure
 * 
 * PM Mode: Future-Proofing
 * - Wrap risky operations in feature flags
 * - Store flags in Supabase config or environment
 */

import { getEnvBoolean } from '@/lib/env';

export interface FeatureFlags {
  enableAdvancedMatching: boolean;
  enableMLFeatures: boolean;
  enableRealtimeDashboard: boolean;
  enableAdminImpersonation: boolean;
  enableWebhookRetries: boolean;
  enableSchemaPerTenant: boolean;
  enableRequestTimeout: boolean;
  enableAPIDocs: boolean;
}

/**
 * Get feature flag value from environment or database
 * Falls back to environment variables, can be overridden by database config
 */
export async function getFeatureFlag(
  flag: keyof FeatureFlags,
  tenantId?: string
): Promise<boolean> {
  // First check environment variable
  const envKey = `ENABLE_${flag.toUpperCase().replace(/([A-Z])/g, '_$1')}`;
  const envValue = getEnvBoolean(envKey, false);
  
  // If tenant-specific, check database config
  if (tenantId) {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      
      const { data: tenant } = await supabase
        .from('tenants')
        .select('config')
        .eq('id', tenantId)
        .single();
      
      if (tenant && typeof tenant === 'object' && 'config' in tenant) {
        const config = (tenant as { config?: unknown }).config;
        if (config && typeof config === 'object') {
          const configObj = config as Record<string, unknown>;
          if (typeof configObj[flag] === 'boolean') {
            return configObj[flag] as boolean;
          }
        }
      }
    } catch (error) {
      // Fall back to env var if database check fails
      console.warn('Failed to check feature flag from database:', error);
    }
  }
  
  return envValue;
}

/**
 * Get all feature flags for a tenant
 */
export async function getAllFeatureFlags(
  tenantId?: string
): Promise<FeatureFlags> {
  return {
    enableAdvancedMatching: await getFeatureFlag('enableAdvancedMatching', tenantId),
    enableMLFeatures: await getFeatureFlag('enableMLFeatures', tenantId),
    enableRealtimeDashboard: await getFeatureFlag('enableRealtimeDashboard', tenantId),
    enableAdminImpersonation: await getFeatureFlag('enableAdminImpersonation', tenantId),
    enableWebhookRetries: await getFeatureFlag('enableWebhookRetries', tenantId),
    enableSchemaPerTenant: await getFeatureFlag('enableSchemaPerTenant', tenantId),
    enableRequestTimeout: await getFeatureFlag('enableRequestTimeout', tenantId),
    enableAPIDocs: await getFeatureFlag('enableAPIDocs', tenantId),
  };
}

/**
 * Check if feature is enabled (synchronous, for client components)
 */
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  const envKey = `ENABLE_${flag.toUpperCase().replace(/([A-Z])/g, '_$1')}`;
  return getEnvBoolean(envKey, false);
}

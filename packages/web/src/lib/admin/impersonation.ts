/**
 * Admin Impersonation Utilities
 * 
 * Support Mode: Customer Success
 * - Allow admins to view app as specific user for debugging
 * - Only accessible to admin/owner roles
 */

'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { success, error, type ActionResult } from '@/lib/actions/types';

/**
 * Impersonate a user (admin only)
 * Returns a session token that can be used to act as that user
 */
export async function impersonateUser(
  targetUserId: string,
  adminUserId: string
): Promise<ActionResult<{ sessionToken: string }>> {
  try {
    const supabase = await createAdminClient();
    
    // Verify admin has permission
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('role, tenant_id')
      .eq('id', adminUserId)
      .single();
    
    if (adminError || !adminUser) {
      return error('Admin user not found');
    }
    
    if (adminUser.role !== 'admin' && adminUser.role !== 'owner') {
      return error('Insufficient permissions for impersonation');
    }
    
    // Verify target user exists and is in same tenant
    const { data: targetUser, error: targetError } = await supabase
      .from('users')
      .select('id, tenant_id, email')
      .eq('id', targetUserId)
      .single();
    
    if (targetError || !targetUser) {
      return error('Target user not found');
    }
    
    if (targetUser.tenant_id !== adminUser.tenant_id) {
      return error('Cannot impersonate user from different tenant');
    }
    
    // Create impersonation session
    // In production, use Supabase Auth admin API to create a session
    // For now, return a token that can be used for debugging
    
    // Log impersonation activity
    await supabase.from('activity_logs').insert({
      tenant_id: adminUser.tenant_id,
      entity_type: 'user',
      entity_id: targetUserId,
      action: 'impersonated',
      user_id: adminUserId,
      metadata: {
        target_user_id: targetUserId,
        target_email: targetUser.email,
        admin_user_id: adminUserId,
      },
    });
    
    return success({
      sessionToken: `impersonation_${targetUserId}_${Date.now()}`,
    }, 'Impersonation session created');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to impersonate user';
    return error(errorMessage);
  }
}

/**
 * Stop impersonation and return to admin session
 */
export async function stopImpersonation(
  adminUserId: string
): Promise<ActionResult> {
  try {
    const supabase = await createAdminClient();
    
    // Log end of impersonation
    await supabase.from('activity_logs').insert({
      entity_type: 'user',
      entity_id: adminUserId,
      action: 'impersonation_ended',
      user_id: adminUserId,
    });
    
    return success(null, 'Impersonation ended');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to stop impersonation';
    return error(errorMessage);
  }
}

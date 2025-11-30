/**
 * Supabase Client Client
 * 
 * CTO Mode: Deployment Guardrails
 * - Safe for use in Client Components only
 * - Uses browser cookies for session management
 */

'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

/**
 * Get Supabase browser client for client-side operations
 * Only use in Client Components ('use client')
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

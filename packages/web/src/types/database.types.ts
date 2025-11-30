/**
 * Supabase Database Types
 * 
 * CTO Mode: Type Safety
 * - Generated from Supabase schema
 * - Use these types instead of 'any'
 * - Run: supabase gen types typescript --project-id <project-ref> > src/types/database.types.ts
 * 
 * TODO: Generate actual types from Supabase schema
 * For now, this is a placeholder structure
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          parent_tenant_id: string | null;
          tier: string;
          status: string;
          quotas: Json;
          config: Json;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['tenants']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tenants']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          tenant_id: string | null;
          email: string;
          password_hash: string;
          name: string | null;
          role: string;
          data_residency_region: string;
          data_retention_days: number;
          deleted_at: string | null;
          deletion_scheduled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      // Add other tables as needed
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
  };
}

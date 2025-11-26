-- Multi-Tenancy Database Migration
-- This migration adds full multi-tenancy support with RLS, schema-per-tenant, and quotas

-- ============================================================================
-- 1. TENANTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  parent_tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  tier VARCHAR(50) NOT NULL DEFAULT 'free',
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  quotas JSONB NOT NULL DEFAULT '{
    "rateLimitRpm": 1000,
    "storageBytes": 1073741824,
    "concurrentJobs": 5,
    "monthlyReconciliations": 1000,
    "customDomains": 0
  }'::jsonb,
  config JSONB NOT NULL DEFAULT '{
    "customDomainVerified": false,
    "dataResidencyRegion": "us",
    "enableAdvancedMatching": false,
    "enableMLFeatures": false,
    "webhookTimeout": 30000,
    "maxRetries": 3
  }'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_parent ON tenants(parent_tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_tier ON tenants(tier);
CREATE INDEX IF NOT EXISTS idx_tenants_deleted ON tenants(deleted_at);
CREATE INDEX IF NOT EXISTS idx_tenants_custom_domain ON tenants USING GIN ((config->'customDomain'));

-- ============================================================================
-- 2. UPDATE EXISTING TABLES TO INCLUDE TENANT_ID
-- ============================================================================

-- Add tenant_id to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_tenant_email ON users(tenant_id, email);

-- Add tenant_id to jobs (derived from user_id, but denormalized for RLS)
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_jobs_tenant_id ON jobs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_jobs_tenant_status ON jobs(tenant_id, status);

-- Add tenant_id to executions (derived from job_id)
ALTER TABLE executions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_executions_tenant_id ON executions(tenant_id);

-- Add tenant_id to matches (derived from job_id)
ALTER TABLE matches ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_matches_tenant_id ON matches(tenant_id);

-- Add tenant_id to unmatched (derived from job_id)
ALTER TABLE unmatched ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_unmatched_tenant_id ON unmatched(tenant_id);

-- Add tenant_id to reports (derived from job_id)
ALTER TABLE reports ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_reports_tenant_id ON reports(tenant_id);

-- Add tenant_id to webhooks (derived from user_id)
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_webhooks_tenant_id ON webhooks(tenant_id);

-- Add tenant_id to api_keys (derived from user_id)
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_api_keys_tenant_id ON api_keys(tenant_id);

-- Add tenant_id to webhook_payloads (for tenant-specific webhook routing)
ALTER TABLE webhook_payloads ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_webhook_payloads_tenant_id ON webhook_payloads(tenant_id);

-- Add tenant_id to audit_logs
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id ON audit_logs(tenant_id);

-- Add tenant_id to idempotency_keys (derived from user_id)
ALTER TABLE idempotency_keys ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_idempotency_tenant_id ON idempotency_keys(tenant_id);

-- ============================================================================
-- 3. TENANT USAGE TRACKING TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS tenant_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  metric_type VARCHAR(50) NOT NULL, -- 'reconciliation', 'storage', 'api_call', 'job_execution'
  metric_value BIGINT NOT NULL DEFAULT 0,
  period_start TIMESTAMP NOT NULL,
  period_end TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(tenant_id, metric_type, period_start)
);

CREATE INDEX IF NOT EXISTS idx_tenant_usage_tenant_id ON tenant_usage(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_usage_period ON tenant_usage(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_tenant_usage_type ON tenant_usage(metric_type);

-- Real-time quota tracking
CREATE TABLE IF NOT EXISTS tenant_quota_usage (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  current_storage_bytes BIGINT DEFAULT 0,
  current_concurrent_jobs INTEGER DEFAULT 0,
  current_monthly_reconciliations INTEGER DEFAULT 0,
  last_reset_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- 4. FEATURE FLAGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT false,
  rollout_percentage INTEGER DEFAULT 0, -- 0-100 for A/B testing
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL = global flag
  user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- NULL = tenant-level flag
  conditions JSONB DEFAULT '{}'::jsonb, -- Additional conditions for targeting
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  UNIQUE(name, tenant_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_feature_flags_name ON feature_flags(name);
CREATE INDEX IF NOT EXISTS idx_feature_flags_tenant_id ON feature_flags(tenant_id);
CREATE INDEX IF NOT EXISTS idx_feature_flags_user_id ON feature_flags(user_id);
CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled ON feature_flags(enabled) WHERE deleted_at IS NULL;

-- Feature flag audit log
CREATE TABLE IF NOT EXISTS feature_flag_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  old_value JSONB,
  new_value JSONB,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feature_flag_changes_flag_id ON feature_flag_changes(feature_flag_id);
CREATE INDEX IF NOT EXISTS idx_feature_flag_changes_created_at ON feature_flag_changes(created_at);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tenant-scoped tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE unmatched ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_payloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE idempotency_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_quota_usage ENABLE ROW LEVEL SECURITY;

-- Create a function to get current tenant context
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS UUID AS $$
  SELECT current_setting('app.current_tenant_id', true)::UUID;
$$ LANGUAGE sql STABLE;

-- RLS Policy: Users can only see their tenant's users
CREATE POLICY tenant_isolation_users ON users
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's jobs
CREATE POLICY tenant_isolation_jobs ON jobs
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's executions
CREATE POLICY tenant_isolation_executions ON executions
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's matches
CREATE POLICY tenant_isolation_matches ON matches
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's unmatched records
CREATE POLICY tenant_isolation_unmatched ON unmatched
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's reports
CREATE POLICY tenant_isolation_reports ON reports
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's webhooks
CREATE POLICY tenant_isolation_webhooks ON webhooks
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's API keys
CREATE POLICY tenant_isolation_api_keys ON api_keys
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's webhook payloads
CREATE POLICY tenant_isolation_webhook_payloads ON webhook_payloads
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's audit logs
CREATE POLICY tenant_isolation_audit_logs ON audit_logs
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's idempotency keys
CREATE POLICY tenant_isolation_idempotency_keys ON idempotency_keys
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's usage
CREATE POLICY tenant_isolation_tenant_usage ON tenant_usage
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- RLS Policy: Users can only see their tenant's quota usage
CREATE POLICY tenant_isolation_tenant_quota_usage ON tenant_quota_usage
  FOR ALL
  USING (tenant_id = current_tenant_id());

-- ============================================================================
-- 6. TRIGGERS FOR AUTOMATIC TENANT_ID PROPAGATION
-- ============================================================================

-- Function to propagate tenant_id from user to jobs
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_jobs()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM users WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_job_tenant_id
  BEFORE INSERT OR UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_jobs();

-- Function to propagate tenant_id from job to executions
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_executions()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM jobs WHERE id = NEW.job_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_execution_tenant_id
  BEFORE INSERT OR UPDATE ON executions
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_executions();

-- Function to propagate tenant_id from job to matches
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_matches()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM jobs WHERE id = NEW.job_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_match_tenant_id
  BEFORE INSERT OR UPDATE ON matches
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_matches();

-- Function to propagate tenant_id from job to unmatched
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_unmatched()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM jobs WHERE id = NEW.job_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_unmatched_tenant_id
  BEFORE INSERT OR UPDATE ON unmatched
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_unmatched();

-- Function to propagate tenant_id from job to reports
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_reports()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM jobs WHERE id = NEW.job_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_report_tenant_id
  BEFORE INSERT OR UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_reports();

-- Function to propagate tenant_id from user to webhooks
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_webhooks()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM users WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_webhook_tenant_id
  BEFORE INSERT OR UPDATE ON webhooks
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_webhooks();

-- Function to propagate tenant_id from user to api_keys
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_api_keys()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM users WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_api_key_tenant_id
  BEFORE INSERT OR UPDATE ON api_keys
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_api_keys();

-- Function to propagate tenant_id from user to idempotency_keys
CREATE OR REPLACE FUNCTION propagate_tenant_id_to_idempotency_keys()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    SELECT tenant_id INTO NEW.tenant_id FROM users WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_idempotency_key_tenant_id
  BEFORE INSERT OR UPDATE ON idempotency_keys
  FOR EACH ROW
  EXECUTE FUNCTION propagate_tenant_id_to_idempotency_keys();

-- ============================================================================
-- 7. SCHEMA-PER-TENANT SUPPORT
-- ============================================================================

-- Function to create a schema for a tenant
CREATE OR REPLACE FUNCTION create_tenant_schema(tenant_slug TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', 'tenant_' || tenant_slug);
END;
$$ LANGUAGE plpgsql;

-- Function to drop a tenant schema
CREATE OR REPLACE FUNCTION drop_tenant_schema(tenant_slug TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('DROP SCHEMA IF EXISTS %I CASCADE', 'tenant_' || tenant_slug);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 8. QUOTA ENFORCEMENT FUNCTIONS
-- ============================================================================

-- Function to check if tenant has exceeded quota
CREATE OR REPLACE FUNCTION check_tenant_quota(
  p_tenant_id UUID,
  p_quota_type TEXT,
  p_requested_value BIGINT DEFAULT 1
)
RETURNS BOOLEAN AS $$
DECLARE
  v_quota_limit BIGINT;
  v_current_usage BIGINT;
  v_quotas JSONB;
BEGIN
  -- Get tenant quotas
  SELECT quotas INTO v_quotas FROM tenants WHERE id = p_tenant_id AND deleted_at IS NULL;
  
  IF v_quotas IS NULL THEN
    RETURN false;
  END IF;
  
  -- Check specific quota type
  CASE p_quota_type
    WHEN 'rateLimitRpm' THEN
      -- Rate limiting is handled at application level
      RETURN true;
    WHEN 'storageBytes' THEN
      v_quota_limit := (v_quotas->>'storageBytes')::BIGINT;
      SELECT COALESCE(current_storage_bytes, 0) INTO v_current_usage
      FROM tenant_quota_usage WHERE tenant_id = p_tenant_id;
      RETURN (v_current_usage + p_requested_value) <= v_quota_limit;
    WHEN 'concurrentJobs' THEN
      v_quota_limit := (v_quotas->>'concurrentJobs')::BIGINT;
      SELECT COALESCE(current_concurrent_jobs, 0) INTO v_current_usage
      FROM tenant_quota_usage WHERE tenant_id = p_tenant_id;
      RETURN (v_current_usage + p_requested_value) <= v_quota_limit;
    WHEN 'monthlyReconciliations' THEN
      v_quota_limit := (v_quotas->>'monthlyReconciliations')::BIGINT;
      SELECT COALESCE(SUM(metric_value), 0) INTO v_current_usage
      FROM tenant_usage
      WHERE tenant_id = p_tenant_id
        AND metric_type = 'reconciliation'
        AND period_start >= date_trunc('month', NOW());
      RETURN (v_current_usage + p_requested_value) <= v_quota_limit;
    ELSE
      RETURN false;
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Function to increment quota usage
CREATE OR REPLACE FUNCTION increment_tenant_quota_usage(
  p_tenant_id UUID,
  p_quota_type TEXT,
  p_value BIGINT DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO tenant_quota_usage (tenant_id, current_storage_bytes, current_concurrent_jobs, updated_at)
  VALUES (p_tenant_id, 0, 0, NOW())
  ON CONFLICT (tenant_id) DO UPDATE SET
    current_storage_bytes = CASE
      WHEN p_quota_type = 'storageBytes' THEN tenant_quota_usage.current_storage_bytes + p_value
      ELSE tenant_quota_usage.current_storage_bytes
    END,
    current_concurrent_jobs = CASE
      WHEN p_quota_type = 'concurrentJobs' THEN tenant_quota_usage.current_concurrent_jobs + p_value
      ELSE tenant_quota_usage.current_concurrent_jobs
    END,
    updated_at = NOW();
    
  -- Track monthly reconciliation usage
  IF p_quota_type = 'reconciliation' THEN
    INSERT INTO tenant_usage (tenant_id, metric_type, metric_value, period_start, period_end)
    VALUES (
      p_tenant_id,
      'reconciliation',
      p_value,
      date_trunc('month', NOW()),
      date_trunc('month', NOW()) + INTERVAL '1 month'
    )
    ON CONFLICT (tenant_id, metric_type, period_start) DO UPDATE SET
      metric_value = tenant_usage.metric_value + p_value;
  END IF;
END;
$$ LANGUAGE plpgsql;

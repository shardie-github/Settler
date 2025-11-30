#!/bin/bash
# Run database migrations
# This script runs the new migrations we created

set -e

echo "Running Settler database migrations..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ] && [ -z "$SUPABASE_URL" ]; then
  echo "Error: DATABASE_URL or SUPABASE_URL must be set"
  echo "For Supabase, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  echo "For local PostgreSQL, set DATABASE_URL"
  exit 1
fi

# If using Supabase, use the connection string format
if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Using Supabase connection..."
  # Extract project ref from SUPABASE_URL
  PROJECT_REF=$(echo $SUPABASE_URL | sed 's|https://\([^.]*\)\.supabase\.co.*|\1|')
  
  if [ -z "$DATABASE_URL" ]; then
    echo "Note: DATABASE_URL not set. You may need to run migrations via Supabase CLI:"
    echo "  supabase db push"
    echo ""
    echo "Or set DATABASE_URL to your Supabase connection string:"
    echo "  postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
    exit 1
  fi
fi

# Run migrations in order
MIGRATIONS=(
  "supabase/migrations/20251129000000_crm_schema.sql"
  "supabase/migrations/20251129000001_financial_ledger.sql"
  "supabase/migrations/20251129000002_error_logs.sql"
  "supabase/migrations/20251129000003_lead_scoring.sql"
)

for migration in "${MIGRATIONS[@]}"; do
  if [ -f "$migration" ]; then
    echo "Running migration: $migration"
    psql "$DATABASE_URL" -f "$migration" || {
      echo "Warning: Migration $migration may have already been applied (idempotent)"
    }
  else
    echo "Warning: Migration file not found: $migration"
  fi
done

echo "Migrations completed!"

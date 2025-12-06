/**
 * Batch Query Utilities
 * Prevents N+1 query patterns by batching database operations
 */

import { query } from "../db";
import { logInfo } from "./logger";

/**
 * Batch fetch users by IDs
 */
export async function batchFetchUsers(
  userIds: string[]
): Promise<Map<string, { id: string; email: string; plan_type: string }>> {
  if (userIds.length === 0) {
    return new Map();
  }

  try {
    const users = await query<{
      id: string;
      email: string;
      plan_type: string;
    }>(
      `SELECT id, email, plan_type
       FROM users
       WHERE id = ANY($1::uuid[])
         AND deleted_at IS NULL`,
      [userIds]
    );

    const userMap = new Map<string, { id: string; email: string; plan_type: string }>();
    for (const user of users) {
      userMap.set(user.id, user);
    }

    return userMap;
  } catch (error) {
    logInfo("Failed to batch fetch users", {
      error: error instanceof Error ? error.message : String(error),
      userIdCount: userIds.length,
    });
    return new Map();
  }
}

/**
 * Batch fetch jobs by IDs
 */
export async function batchFetchJobs(
  jobIds: string[]
): Promise<Map<string, { id: string; user_id: string; name: string }>> {
  if (jobIds.length === 0) {
    return new Map();
  }

  try {
    const jobs = await query<{
      id: string;
      user_id: string;
      name: string;
    }>(
      `SELECT id, user_id, name
       FROM jobs
       WHERE id = ANY($1::uuid[])`,
      [jobIds]
    );

    const jobMap = new Map<string, { id: string; user_id: string; name: string }>();
    for (const job of jobs) {
      jobMap.set(job.id, job);
    }

    return jobMap;
  } catch (error) {
    logInfo("Failed to batch fetch jobs", {
      error: error instanceof Error ? error.message : String(error),
      jobCount: jobIds.length,
    });
    return new Map();
  }
}

/**
 * Batch fetch tenants by IDs
 */
export async function batchFetchTenants(
  tenantIds: string[]
): Promise<Map<string, { id: string; name: string }>> {
  if (tenantIds.length === 0) {
    return new Map();
  }

  try {
    const tenants = await query<{
      id: string;
      name: string;
    }>(
      `SELECT id, name
       FROM tenants
       WHERE id = ANY($1::uuid[])`,
      [tenantIds]
    );

    const tenantMap = new Map<string, { id: string; name: string }>();
    for (const tenant of tenants) {
      tenantMap.set(tenant.id, tenant);
    }

    return tenantMap;
  } catch (error) {
    logInfo("Failed to batch fetch tenants", {
      error: error instanceof Error ? error.message : String(error),
      tenantCount: tenantIds.length,
    });
    return new Map();
  }
}

/**
 * Batch insert with conflict handling
 */
export async function batchInsert<T extends Record<string, unknown>>(
  table: string,
  records: T[],
  conflictColumns: string[] = []
): Promise<void> {
  if (records.length === 0) {
    return;
  }

  try {
    const columns = Object.keys(records[0]);
    const placeholders = records
      .map(
        (_, index) =>
          `(${columns.map((_, colIndex) => `$${index * columns.length + colIndex + 1}`).join(", ")})`
      )
      .join(", ");

    const values = records.flatMap((record) => columns.map((col) => record[col]));

    let conflictClause = "";
    if (conflictColumns.length > 0) {
      conflictClause = ` ON CONFLICT (${conflictColumns.join(", ")}) DO NOTHING`;
    }

    await query(
      `INSERT INTO ${table} (${columns.join(", ")}) VALUES ${placeholders}${conflictClause}`,
      values
    );
  } catch (error) {
    logInfo("Failed to batch insert", {
      error: error instanceof Error ? error.message : String(error),
      table,
      recordCount: records.length,
    });
    throw error;
  }
}

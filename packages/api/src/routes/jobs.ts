import { Router, Request, Response } from "express";
import { z } from "zod";
import { validateRequest } from "../middleware/validation";
import { AuthRequest } from "../middleware/auth";
import { requirePermission, requireResourceOwnership } from "../middleware/authorization";
import { query, transaction } from "../db";
import { encrypt, decrypt } from "../utils/encryption";
import { logInfo, logError } from "../utils/logger";
import { Mutex } from "async-mutex";

const router = Router();

// Per-job mutex to prevent concurrent execution
const jobMutexes = new Map<string, Mutex>();

function getJobMutex(jobId: string): Mutex {
  if (!jobMutexes.has(jobId)) {
    jobMutexes.set(jobId, new Mutex());
  }
  return jobMutexes.get(jobId)!;
}

// Validation schemas with input sanitization
const adapterConfigSchema = z.record(
  z.union([
    z.string().max(1000),
    z.number(),
    z.boolean(),
    z.array(z.string().max(1000)),
  ])
).refine(
  (config) => {
    // Prevent prototype pollution
    return !('__proto__' in config || 'constructor' in config || 'prototype' in config);
  },
  { message: 'Invalid config keys' }
);

const createJobSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    source: z.object({
      adapter: z.string().min(1).max(50),
      config: adapterConfigSchema,
    }),
    target: z.object({
      adapter: z.string().min(1).max(50),
      config: adapterConfigSchema,
    }),
    rules: z.object({
      matching: z.array(z.object({
        field: z.string(),
        type: z.enum(["exact", "fuzzy", "range"]),
        tolerance: z.number().optional(),
        days: z.number().optional(),
        threshold: z.number().optional(),
      })),
      conflictResolution: z.enum(["first-wins", "last-wins", "manual-review"]).optional(),
    }),
    schedule: z.string().optional(), // Cron expression
  }),
});

const getJobSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional().default("1"),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default("100"),
  }),
});

// Create reconciliation job
router.post(
  "/",
  requirePermission("jobs", "create"),
  validateRequest(createJobSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, source, target, rules, schedule } = req.body;
      const userId = req.userId!;

      // Encrypt API keys in configs
      const encryptedSourceConfig = encrypt(JSON.stringify(source.config));
      const encryptedTargetConfig = encrypt(JSON.stringify(target.config));

      const result = await query<{ id: string }>(
        `INSERT INTO jobs (user_id, name, source_adapter, source_config_encrypted, target_adapter, target_config_encrypted, rules, schedule)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [
          userId,
          name,
          source.adapter,
          encryptedSourceConfig,
          target.adapter,
          encryptedTargetConfig,
          JSON.stringify(rules),
          schedule,
        ]
      );

      const jobId = result[0].id;

      // Log audit event
      await query(
        `INSERT INTO audit_logs (event, user_id, metadata)
         VALUES ($1, $2, $3)`,
        [
          'job_created',
          userId,
          JSON.stringify({ jobId, name }),
        ]
      );

      logInfo('Job created', { jobId, userId, name });

      res.status(201).json({
        data: {
          id: jobId,
          userId,
          name,
          source: { adapter: source.adapter },
          target: { adapter: target.adapter },
          rules,
          schedule,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        message: "Reconciliation job created successfully",
      });
    } catch (error: any) {
      logError('Failed to create job', error, { userId: req.userId });
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to create reconciliation job",
      });
    }
  }
);

// Get all jobs with pagination
router.get(
  "/",
  requirePermission("jobs", "read"),
  validateRequest(paginationSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000);
      const offset = (page - 1) * limit;

      const [jobs, totalResult] = await Promise.all([
        query<{
          id: string;
          name: string;
          status: string;
          created_at: Date;
        }>(
          `SELECT id, name, status, created_at
           FROM jobs
           WHERE user_id = $1
           ORDER BY created_at DESC
           LIMIT $2 OFFSET $3`,
          [userId, limit, offset]
        ),
        query<{ count: string }>(
          `SELECT COUNT(*) as count FROM jobs WHERE user_id = $1`,
          [userId]
        ),
      ]);

      const total = parseInt(totalResult[0].count);

      res.json({
        data: jobs.map(job => ({
          id: job.id,
          userId,
          name: job.name,
          status: job.status,
          createdAt: job.created_at.toISOString(),
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      logError('Failed to fetch jobs', error, { userId: req.userId });
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch jobs",
      });
    }
  }
);

// Get job by ID
router.get(
  "/:id",
  requirePermission("jobs", "read"),
  validateRequest(getJobSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId!;

      // Check ownership
      await new Promise<void>((resolve, reject) => {
        requireResourceOwnership(req, res, (err?: any) => {
          if (err) reject(err);
          else resolve();
        }, 'job', id);
      });

      const jobs = await query<{
        id: string;
        user_id: string;
        name: string;
        source_adapter: string;
        source_config_encrypted: string;
        target_adapter: string;
        target_config_encrypted: string;
        rules: any;
        schedule: string;
        status: string;
        created_at: Date;
        updated_at: Date;
      }>(
        `SELECT id, user_id, name, source_adapter, source_config_encrypted, target_adapter, target_config_encrypted, rules, schedule, status, created_at, updated_at
         FROM jobs
         WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      if (jobs.length === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      const job = jobs[0];

      // Decrypt configs (but don't expose full API keys in response)
      const sourceConfig = JSON.parse(decrypt(job.source_config_encrypted));
      const targetConfig = JSON.parse(decrypt(job.target_config_encrypted));

      // Redact sensitive fields
      const redactedSourceConfig = Object.fromEntries(
        Object.entries(sourceConfig).map(([k, v]) => [
          k,
          k.toLowerCase().includes('key') || k.toLowerCase().includes('secret')
            ? '[REDACTED]'
            : v,
        ])
      );
      const redactedTargetConfig = Object.fromEntries(
        Object.entries(targetConfig).map(([k, v]) => [
          k,
          k.toLowerCase().includes('key') || k.toLowerCase().includes('secret')
            ? '[REDACTED]'
            : v,
        ])
      );

      res.json({
        data: {
          id: job.id,
          userId: job.user_id,
          name: job.name,
          source: {
            adapter: job.source_adapter,
            config: redactedSourceConfig,
          },
          target: {
            adapter: job.target_adapter,
            config: redactedTargetConfig,
          },
          rules: job.rules,
          schedule: job.schedule,
          status: job.status,
          createdAt: job.created_at.toISOString(),
          updatedAt: job.updated_at.toISOString(),
        },
      });
    } catch (error: any) {
      logError('Failed to fetch job', error, { userId: req.userId, jobId: req.params.id });
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch job",
      });
    }
  }
);

// Trigger job execution with race condition prevention
router.post(
  "/:id/run",
  requirePermission("jobs", "create"),
  validateRequest(getJobSchema),
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId!;
    const mutex = getJobMutex(id);

    const release = await mutex.acquire();
    try {
      // Check ownership
      await new Promise<void>((resolve, reject) => {
        requireResourceOwnership(req, res, (err?: any) => {
          if (err) reject(err);
          else resolve();
        }, 'job', id);
      });

      // Check if job is already running (optimistic locking)
      const jobs = await query<{ status: string; version: number }>(
        `SELECT status, version FROM jobs WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      if (jobs.length === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      const job = jobs[0];

      if (job.status === 'running') {
        return res.status(409).json({ error: "Job is already running" });
      }

      // Update job status atomically
      const updated = await query(
        `UPDATE jobs
         SET status = 'running', version = version + 1, updated_at = NOW()
         WHERE id = $1 AND user_id = $2 AND version = $3
         RETURNING id`,
        [id, userId, job.version]
      );

      if (updated.length === 0) {
        return res.status(409).json({ error: "Job state changed, please retry" });
      }

      // Create execution record
      const executions = await query<{ id: string }>(
        `INSERT INTO executions (job_id, status)
         VALUES ($1, 'running')
         RETURNING id`,
        [id]
      );

      const executionId = executions[0].id;

      // Log audit event
      await query(
        `INSERT INTO audit_logs (event, user_id, metadata)
         VALUES ($1, $2, $3)`,
        [
          'job_executed',
          userId,
          JSON.stringify({ jobId: id, executionId }),
        ]
      );

      // Queue job execution (async)
      // In production, this would use a job queue like Bull
      setTimeout(async () => {
        try {
          // Execute reconciliation logic here
          await query(
            `UPDATE executions SET status = 'completed', completed_at = NOW()
             WHERE id = $1`,
            [executionId]
          );
          await query(
            `UPDATE jobs SET status = 'active', updated_at = NOW() WHERE id = $1`,
            [id]
          );
        } catch (error) {
          logError('Job execution failed', error, { executionId, jobId: id });
          await query(
            `UPDATE executions SET status = 'failed', error = $1 WHERE id = $2`,
            [error instanceof Error ? error.message : 'Unknown error', executionId]
          );
          await query(
            `UPDATE jobs SET status = 'active', updated_at = NOW() WHERE id = $1`,
            [id]
          );
        }
      }, 0);

      logInfo('Job execution started', { jobId: id, executionId, userId });

      res.status(202).json({
        data: {
          id: executionId,
          jobId: id,
          status: "running",
          startedAt: new Date().toISOString(),
        },
        message: "Job execution started",
      });
    } catch (error: any) {
      logError('Failed to start job execution', error, { userId, jobId: id });
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to start job execution",
      });
    } finally {
      release();
    }
  }
);

// Delete job
router.delete(
  "/:id",
  requirePermission("jobs", "delete"),
  validateRequest(getJobSchema),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId!;

      // Check ownership
      await new Promise<void>((resolve, reject) => {
        requireResourceOwnership(req, res, (err?: any) => {
          if (err) reject(err);
          else resolve();
        }, 'job', id);
      });

      await query(
        `DELETE FROM jobs WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      // Log audit event
      await query(
        `INSERT INTO audit_logs (event, user_id, metadata)
         VALUES ($1, $2, $3)`,
        [
          'job_deleted',
          userId,
          JSON.stringify({ jobId: id }),
        ]
      );

      logInfo('Job deleted', { jobId: id, userId });

      res.status(204).send();
    } catch (error: any) {
      logError('Failed to delete job', error, { userId: req.userId, jobId: req.params.id });
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to delete job",
      });
    }
  }
);

export { router as jobsRouter };

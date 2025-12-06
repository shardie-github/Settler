/**
 * AIAS Edge AI Accelerator Studio Integration Routes
 * 
 * NOTE: This is an API-based integration. Settler.dev uses AIAS via HTTP API,
 * not direct code coupling. This ensures product independence.
 * 
 * Handles model optimization, benchmarking, and export workflows via AIAS API.
 */

import { Router, Response } from "express";
import { z } from "zod";
import { validateRequest } from "../middleware/validation";
import { AuthRequest } from "../middleware/auth";
import { requirePermission } from "../middleware/authorization";
import { Permission } from "../infrastructure/security/Permissions";
import { asyncHandler } from "../utils/error-handler";
import { sendSuccess, sendError } from "../utils/api-response";
import { getAIASClient } from "../services/aias/client";
import { query } from "../db";
import { logInfo } from "../utils/logger";
import { trackEventAsync } from "../utils/event-tracker";

const router = Router();

// ============================================================================
// Validation Schemas
// ============================================================================

const uploadModelSchema = z.object({
  body: z.object({
    modelName: z.string().min(1).max(255),
    modelType: z.enum(['matching', 'anomaly_detection', 'schema_inference', 'pii_detection']),
    modelFile: z.string().min(1), // Base64 encoded
    format: z.enum(['onnx', 'tensorrt', 'executorch', 'tflite', 'pytorch']),
    metadata: z.record(z.unknown()).optional(),
  }),
});

const optimizeModelSchema = z.object({
  params: z.object({
    modelId: z.string().uuid(),
  }),
  body: z.object({
    targetDevices: z.array(z.string()),
    quantization: z.enum(['int4', 'int8', 'fp16', 'fp32']),
    optimizationLevel: z.enum(['speed', 'balanced', 'accuracy']),
  }),
});

const benchmarkModelSchema = z.object({
  params: z.object({
    modelId: z.string().uuid(),
  }),
  body: z.object({
    deviceProfile: z.object({
      deviceType: z.string(),
      os: z.string(),
      arch: z.string(),
      capabilities: z.record(z.boolean()),
    }),
    testData: z.array(z.unknown()).optional(),
  }),
});

const exportModelSchema = z.object({
  params: z.object({
    modelId: z.string().uuid(),
  }),
  body: z.object({
    format: z.enum(['docker', 'wasm', 'apk', 'onnx', 'tensorrt']),
    targetDevice: z.string().optional(),
  }),
});

// ============================================================================
// Routes
// ============================================================================

/**
 * POST /api/v1/aias/models/upload
 * Upload a model to AIAS
 */
router.post(
  "/models/upload",
  validateRequest(uploadModelSchema),
  requirePermission(Permission.EDGE_AIAS_ACCESS),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { modelName, modelType, modelFile, format, metadata } = req.body;
    const tenantId = req.tenantId!;

    const aiasClient = getAIASClient();
    const uploadResult = await aiasClient.uploadModel({
      modelName,
      modelType,
      modelFile,
      format,
      metadata,
    });

    // Store model version in database
    const modelResult = await query<{ id: string }>(
      `INSERT INTO model_versions (
        tenant_id, model_name, version, model_type, format,
        aias_job_id, metadata, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [
        tenantId,
        modelName,
        '1.0.0', // Initial version
        modelType,
        format,
        uploadResult.jobId,
        JSON.stringify(metadata || {}),
        false, // Not active until optimized
      ]
    );

    const modelId = modelResult[0]?.id;
    if (!modelId) {
      return sendError(res, 500, "INTERNAL_ERROR", "Failed to create model record");
    }
    await trackEventAsync(tenantId, 'aias_model_uploaded', {
      model_id: modelId,
      aias_job_id: uploadResult.jobId,
    });

    logInfo(`Model uploaded to AIAS: ${modelId}`);

    sendSuccess(res, {
      modelId: modelId,
      aiasJobId: uploadResult.jobId,
      aiasModelId: uploadResult.modelId,
      status: 'uploaded',
    });
  })
);

/**
 * POST /api/v1/aias/models/:modelId/optimize
 * Request model optimization
 */
router.post(
  "/models/:modelId/optimize",
  validateRequest(optimizeModelSchema),
  requirePermission(Permission.EDGE_AIAS_ACCESS),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { modelId } = req.params;
    const { targetDevices, quantization, optimizationLevel } = req.body;
    const tenantId = req.tenantId!;

    if (!modelId || !tenantId) {
      return sendError(res, 400, "BAD_REQUEST", "Missing required parameters");
    }

    // Verify model belongs to tenant
    const modelCheck = await query<{ id: string }>(
      `SELECT id FROM model_versions 
       WHERE id = $1 AND tenant_id = $2`,
      [modelId, tenantId] as (string | number | boolean | Date | null)[]
    );

    if (modelCheck.length === 0) {
      return sendError(res, 404, "NOT_FOUND", "Model not found");
    }

    const aiasClient = getAIASClient();
    const aiasModelId = await getAIASModelId(modelId);
    if (!aiasModelId) {
      return sendError(res, 404, "NOT_FOUND", "AIAS model ID not found");
    }
    
    const optimizeResult = await aiasClient.optimizeModel({
      modelId: aiasModelId,
      targetDevices,
      quantization,
      optimizationLevel,
    });

    // Update model version with optimization job
    await query(
      `UPDATE model_versions 
       SET aias_job_id = $1, updated_at = NOW()
       WHERE id = $2`,
      [optimizeResult.jobId, modelId]
    );

    await trackEventAsync(tenantId, 'aias_model_optimization_requested', {
      model_id: modelId,
      aias_job_id: optimizeResult.jobId,
      quantization,
    });

    sendSuccess(res, {
      jobId: optimizeResult.jobId,
      status: 'pending',
    });
  })
);

/**
 * GET /api/v1/aias/jobs/:jobId/status
 * Get optimization/benchmark job status
 */
router.get(
  "/jobs/:jobId/status",
  validateRequest(z.object({
    params: z.object({ jobId: z.string() }),
  })),
  requirePermission(Permission.EDGE_AIAS_ACCESS),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { jobId } = req.params;
    const tenantId = req.tenantId!;

    if (!jobId || !tenantId) {
      return sendError(res, 400, "BAD_REQUEST", "Missing required parameters");
    }

    // Verify job belongs to tenant's model
    const modelCheck = await query<{ id: string }>(
      `SELECT id FROM model_versions 
       WHERE aias_job_id = $1 AND tenant_id = $2`,
      [jobId, tenantId] as (string | number | boolean | Date | null)[]
    );

    if (modelCheck.length === 0) {
      return sendError(res, 404, "NOT_FOUND", "Job not found");
    }

    const modelVersionId = modelCheck[0]?.id;
    if (!modelVersionId) {
      return sendError(res, 404, "NOT_FOUND", "Model version not found");
    }

    const aiasClient = getAIASClient();
    const status = await aiasClient.getOptimizationStatus(jobId);

    // If completed, update model version
    if (status.status === 'completed' && status.result) {
      await query(
        `UPDATE model_versions 
         SET benchmark_results = $1, updated_at = NOW()
         WHERE id = $2`,
        [
          JSON.stringify(status.result.benchmarkResults),
          modelVersionId,
        ] as (string | number | boolean | Date | null)[]
      );
    }

    sendSuccess(res, status);
  })
);

/**
 * POST /api/v1/aias/models/:modelId/benchmark
 * Run benchmark on a model
 */
router.post(
  "/models/:modelId/benchmark",
  validateRequest(benchmarkModelSchema),
  requirePermission(Permission.EDGE_AIAS_ACCESS),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { modelId } = req.params;
    const { deviceProfile, testData } = req.body;
    const tenantId = req.tenantId!;

    if (!modelId || !tenantId) {
      return sendError(res, 400, "BAD_REQUEST", "Missing required parameters");
    }

    // Verify model belongs to tenant
    const modelCheck = await query<{ id: string }>(
      `SELECT id FROM model_versions 
       WHERE id = $1 AND tenant_id = $2`,
      [modelId, tenantId] as (string | number | boolean | Date | null)[]
    );

    if (modelCheck.length === 0) {
      return sendError(res, 404, "NOT_FOUND", "Model not found");
    }

    const aiasClient = getAIASClient();
    const aiasModelId = await getAIASModelId(modelId);
    if (!aiasModelId) {
      return sendError(res, 404, "NOT_FOUND", "AIAS model ID not found");
    }
    
    const benchmarkResult = await aiasClient.benchmarkModel({
      modelId: aiasModelId,
      deviceProfile,
      testData,
    });

    await trackEventAsync(tenantId, 'aias_model_benchmark_requested', {
      model_id: modelId,
      aias_job_id: benchmarkResult.jobId,
    });

    sendSuccess(res, {
      jobId: benchmarkResult.jobId,
      status: 'pending',
    });
  })
);

/**
 * GET /api/v1/aias/jobs/:jobId/benchmark-results
 * Get benchmark results
 */
router.get(
  "/jobs/:jobId/benchmark-results",
  validateRequest(z.object({
    params: z.object({ jobId: z.string() }),
  })),
  requirePermission(Permission.EDGE_AIAS_ACCESS),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { jobId } = req.params;
    const tenantId = req.tenantId!;

    if (!jobId || !tenantId) {
      return sendError(res, 400, "BAD_REQUEST", "Missing required parameters");
    }

    // Verify job belongs to tenant's model
    const modelCheck = await query<{ id: string }>(
      `SELECT id FROM model_versions 
       WHERE aias_job_id = $1 AND tenant_id = $2`,
      [jobId, tenantId] as (string | number | boolean | Date | null)[]
    );

    if (modelCheck.length === 0) {
      return sendError(res, 404, "NOT_FOUND", "Job not found");
    }

    const modelVersionId = modelCheck[0]?.id;
    if (!modelVersionId) {
      return sendError(res, 404, "NOT_FOUND", "Model version not found");
    }

    const aiasClient = getAIASClient();
    const results = await aiasClient.getBenchmarkResults(jobId);

    // Update model version with benchmark results
    await query(
      `UPDATE model_versions 
       SET benchmark_results = $1, updated_at = NOW()
       WHERE id = $2`,
      [
        JSON.stringify(results),
        modelVersionId,
      ] as (string | number | boolean | Date | null)[]
    );

    sendSuccess(res, results);
  })
);

/**
 * POST /api/v1/aias/models/:modelId/export
 * Export optimized model
 */
router.post(
  "/models/:modelId/export",
  validateRequest(exportModelSchema),
  requirePermission(Permission.EDGE_AIAS_ACCESS),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { modelId } = req.params;
    const { format, targetDevice } = req.body;
    const tenantId = req.tenantId!;

    if (!modelId || !tenantId) {
      return sendError(res, 400, "BAD_REQUEST", "Missing required parameters");
    }

    // Verify model belongs to tenant
    const modelCheck = await query<{ id: string }>(
      `SELECT id FROM model_versions 
       WHERE id = $1 AND tenant_id = $2`,
      [modelId, tenantId] as (string | number | boolean | Date | null)[]
    );

    if (modelCheck.length === 0) {
      return sendError(res, 404, "NOT_FOUND", "Model not found");
    }

    const aiasClient = getAIASClient();
    const aiasModelId = await getAIASModelId(modelId);
    
    const exportResult = await aiasClient.exportModel({
      modelId: aiasModelId,
      format,
      targetDevice,
    });

    // Update model version with export info
    await query(
      `UPDATE model_versions 
       SET file_path = $1, file_size_bytes = $2, updated_at = NOW()
       WHERE id = $3`,
      [
        exportResult.downloadUrl,
        exportResult.fileSize,
        modelId,
      ]
    );

    await trackEventAsync(tenantId, 'aias_model_exported', {
      model_id: modelId,
      format,
    });

    sendSuccess(res, exportResult);
  })
);

/**
 * GET /api/v1/aias/models
 * List models for tenant
 */
router.get(
  "/models",
  requirePermission(Permission.EDGE_MODELS_READ),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const tenantId = req.tenantId!;
    const { page = "1", limit = "100" } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const result = await query<{
      id: string;
      model_name: string;
      version: string;
      model_type: string;
      format: string;
      is_active: boolean;
      created_at: Date;
    }>(
      `SELECT id, model_name, version, model_type, format, is_active, created_at
       FROM model_versions
       WHERE tenant_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [tenantId, String(limit), String(offset)] as (string | number | boolean | Date | null)[]
    );

    const countResult = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM model_versions WHERE tenant_id = $1`,
      [tenantId]
    );

    sendSuccess(res, {
      models: result,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(countResult[0]?.count || 0),
      },
    });
  })
);

/**
 * GET /api/v1/aias/models/:modelId
 * Get model details
 */
router.get(
  "/models/:modelId",
  validateRequest(z.object({
    params: z.object({ modelId: z.string().uuid() }),
  })),
  requirePermission(Permission.EDGE_MODELS_READ),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { modelId } = req.params;
    const tenantId = req.tenantId!;

    if (!modelId || !tenantId) {
      return sendError(res, 400, "BAD_REQUEST", "Missing required parameters");
    }

    const result = await query<{
      id: string;
      model_name: string;
      version: string;
      model_type: string;
      format: string;
      quantization: string;
      file_path: string;
      file_size_bytes: number;
      benchmark_results: string;
      device_targets: string[];
      metadata: string;
      is_active: boolean;
      created_at: Date;
    }>(
      `SELECT id, model_name, version, model_type, format, quantization,
              file_path, file_size_bytes, benchmark_results, device_targets,
              metadata, is_active, created_at
       FROM model_versions
       WHERE id = $1 AND tenant_id = $2`,
      [modelId, tenantId]
    );

    if (result.length === 0) {
      return sendError(res, 404, "NOT_FOUND", "Model not found");
    }

    const model = result[0];
    if (!model) {
      return sendError(res, 404, "NOT_FOUND", "Model not found");
    }
    sendSuccess(res, {
      ...model,
      benchmark_results: model.benchmark_results ? JSON.parse(model.benchmark_results) : null,
      device_targets: model.device_targets || [],
      metadata: JSON.parse(model.metadata || '{}'),
    });
  })
);

// ============================================================================
// Helper Functions
// ============================================================================

async function getAIASModelId(modelVersionId: string): Promise<string> {
  // This would typically fetch from a mapping table or metadata
  // For now, we'll use a placeholder - in production, store AIAS model ID in model_versions.metadata
  const result = await query<{ metadata: string }>(
    `SELECT metadata FROM model_versions WHERE id = $1`,
    [modelVersionId]
  );

  if (result.length === 0) {
    throw new Error('Model not found');
  }

  const metadataRow = result[0];
  if (!metadataRow) {
    throw new Error('Model not found');
  }
  const metadata = JSON.parse(metadataRow.metadata || '{}');
  return metadata.aiasModelId || modelVersionId; // Fallback to model version ID
}

export { router as aiasRouter };

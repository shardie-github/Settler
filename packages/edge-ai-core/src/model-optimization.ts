/**
 * Model Optimization
 * Brand-neutral model optimization utilities
 */

import type { QuantizationType } from "./quantization";
export type OptimizationLevel = "speed" | "balanced" | "accuracy";
export type ModelFormat = "onnx" | "tensorrt" | "executorch" | "tflite" | "pytorch";

export interface OptimizationRequest {
  modelId: string;
  targetDevices: string[];
  quantization: QuantizationType;
  optimizationLevel: OptimizationLevel;
  format: ModelFormat;
}

export interface OptimizationResult {
  optimizedModelUrl: string;
  benchmarkResults: {
    latency_ms: number;
    throughput_per_sec: number;
    accuracy?: number;
    memory_usage_mb: number;
  };
  metadata: Record<string, unknown>;
}

/**
 * Calculate expected model size after quantization
 */
export function estimateQuantizedSize(
  originalSizeBytes: number,
  quantization: QuantizationType
): number {
  const ratios: Record<QuantizationType, number> = {
    int4: 0.125, // 4 bits = 1/8 of 32 bits
    int8: 0.25, // 8 bits = 1/4 of 32 bits
    fp16: 0.5, // 16 bits = 1/2 of 32 bits
    fp32: 1.0, // 32 bits = full size
  };

  return Math.round(originalSizeBytes * ratios[quantization]);
}

/**
 * Validate optimization request
 */
export function validateOptimizationRequest(request: OptimizationRequest): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!request.modelId) {
    errors.push("modelId is required");
  }

  if (!request.targetDevices || request.targetDevices.length === 0) {
    errors.push("targetDevices must contain at least one device");
  }

  if (!["int4", "int8", "fp16", "fp32"].includes(request.quantization)) {
    errors.push("quantization must be one of: int4, int8, fp16, fp32");
  }

  if (!["speed", "balanced", "accuracy"].includes(request.optimizationLevel)) {
    errors.push("optimizationLevel must be one of: speed, balanced, accuracy");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate optimization metadata
 */
export function generateOptimizationMetadata(
  request: OptimizationRequest,
  result: OptimizationResult
): Record<string, unknown> {
  return {
    quantization: request.quantization,
    optimizationLevel: request.optimizationLevel,
    targetDevices: request.targetDevices,
    format: request.format,
    benchmarkedAt: new Date().toISOString(),
    benchmarkResults: result.benchmarkResults,
  };
}

/**
 * Quantization Utilities
 * Brand-neutral quantization helpers
 */

export type QuantizationType = "int4" | "int8" | "fp16" | "fp32";

export interface QuantizationConfig {
  type: QuantizationType;
  calibrationData?: unknown[];
  preserveAccuracy?: boolean;
}

/**
 * Get quantization bit width
 */
export function getQuantizationBits(type: QuantizationType): number {
  const bits: Record<QuantizationType, number> = {
    int4: 4,
    int8: 8,
    fp16: 16,
    fp32: 32,
  };
  return bits[type];
}

/**
 * Calculate compression ratio
 */
export function getCompressionRatio(
  originalType: QuantizationType,
  quantizedType: QuantizationType
): number {
  const originalBits = getQuantizationBits(originalType);
  const quantizedBits = getQuantizationBits(quantizedType);
  return originalBits / quantizedBits;
}

/**
 * Estimate accuracy impact
 */
export function estimateAccuracyImpact(quantization: QuantizationType): "low" | "medium" | "high" {
  switch (quantization) {
    case "fp32":
      return "low";
    case "fp16":
      return "low";
    case "int8":
      return "medium";
    case "int4":
      return "high";
  }
}

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
export declare function getQuantizationBits(type: QuantizationType): number;
/**
 * Calculate compression ratio
 */
export declare function getCompressionRatio(originalType: QuantizationType, quantizedType: QuantizationType): number;
/**
 * Estimate accuracy impact
 */
export declare function estimateAccuracyImpact(quantization: QuantizationType): "low" | "medium" | "high";
//# sourceMappingURL=quantization.d.ts.map
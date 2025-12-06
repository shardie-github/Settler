/**
 * Model Optimization
 * Brand-neutral model optimization utilities
 */
import type { QuantizationType } from './quantization';
export type OptimizationLevel = 'speed' | 'balanced' | 'accuracy';
export type ModelFormat = 'onnx' | 'tensorrt' | 'executorch' | 'tflite' | 'pytorch';
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
export declare function estimateQuantizedSize(originalSizeBytes: number, quantization: QuantizationType): number;
/**
 * Validate optimization request
 */
export declare function validateOptimizationRequest(request: OptimizationRequest): {
    valid: boolean;
    errors: string[];
};
/**
 * Generate optimization metadata
 */
export declare function generateOptimizationMetadata(request: OptimizationRequest, result: OptimizationResult): Record<string, unknown>;
//# sourceMappingURL=model-optimization.d.ts.map
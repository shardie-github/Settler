"use strict";
/**
 * Model Optimization
 * Brand-neutral model optimization utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateQuantizedSize = estimateQuantizedSize;
exports.validateOptimizationRequest = validateOptimizationRequest;
exports.generateOptimizationMetadata = generateOptimizationMetadata;
/**
 * Calculate expected model size after quantization
 */
function estimateQuantizedSize(originalSizeBytes, quantization) {
    const ratios = {
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
function validateOptimizationRequest(request) {
    const errors = [];
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
function generateOptimizationMetadata(request, result) {
    return {
        quantization: request.quantization,
        optimizationLevel: request.optimizationLevel,
        targetDevices: request.targetDevices,
        format: request.format,
        benchmarkedAt: new Date().toISOString(),
        benchmarkResults: result.benchmarkResults,
    };
}
//# sourceMappingURL=model-optimization.js.map
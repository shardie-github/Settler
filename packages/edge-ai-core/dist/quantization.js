"use strict";
/**
 * Quantization Utilities
 * Brand-neutral quantization helpers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuantizationBits = getQuantizationBits;
exports.getCompressionRatio = getCompressionRatio;
exports.estimateAccuracyImpact = estimateAccuracyImpact;
/**
 * Get quantization bit width
 */
function getQuantizationBits(type) {
    const bits = {
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
function getCompressionRatio(originalType, quantizedType) {
    const originalBits = getQuantizationBits(originalType);
    const quantizedBits = getQuantizationBits(quantizedType);
    return originalBits / quantizedBits;
}
/**
 * Estimate accuracy impact
 */
function estimateAccuracyImpact(quantization) {
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
//# sourceMappingURL=quantization.js.map
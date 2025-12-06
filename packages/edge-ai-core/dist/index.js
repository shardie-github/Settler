"use strict";
/**
 * Edge AI Core - Brand-Neutral Shared Engine
 *
 * This module provides shared technical components for Edge AI functionality.
 * It is used by both AIAS and Settler.dev, but contains NO product-specific
 * branding, pricing, or business logic.
 *
 * Architecture Principle: Internal cohesion, external separation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Device Profiling
__exportStar(require("./device-profiling"), exports);
// Model Optimization
__exportStar(require("./model-optimization"), exports);
// Inference Engines
__exportStar(require("./inference"), exports);
// Quantization
__exportStar(require("./quantization"), exports);
// Runtime Selection
__exportStar(require("./runtime-selector"), exports);
// Edge Node Deployment
__exportStar(require("./deployment"), exports);
// Model Distribution
__exportStar(require("./model-distribution"), exports);
// Security
__exportStar(require("./security"), exports);
//# sourceMappingURL=index.js.map
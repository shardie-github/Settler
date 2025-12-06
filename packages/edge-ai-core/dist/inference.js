"use strict";
/**
 * Inference Engine
 * Brand-neutral inference execution layer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferenceExecutor = void 0;
/**
 * Runtime-agnostic inference executor
 */
class InferenceExecutor {
    engines = new Map();
    registerEngine(runtime, engine) {
        this.engines.set(runtime, engine);
    }
    async execute(runtime, request) {
        const engine = this.engines.get(runtime);
        if (!engine) {
            throw new Error(`Inference engine not found for runtime: ${runtime}`);
        }
        return engine.runInference(request);
    }
    getAvailableRuntimes() {
        return Array.from(this.engines.keys());
    }
}
exports.InferenceExecutor = InferenceExecutor;
//# sourceMappingURL=inference.js.map
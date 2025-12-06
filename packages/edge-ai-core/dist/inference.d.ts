/**
 * Inference Engine
 * Brand-neutral inference execution layer
 */
export interface InferenceRequest {
    modelId: string;
    input: unknown;
    options?: {
        batchSize?: number;
        timeout?: number;
    };
}
export interface InferenceResult {
    output: unknown;
    latency_ms: number;
    metadata?: Record<string, unknown>;
}
/**
 * Abstract inference engine interface
 */
export interface InferenceEngine {
    loadModel(modelId: string, modelData: Buffer | string): Promise<void>;
    runInference(request: InferenceRequest): Promise<InferenceResult>;
    unloadModel(modelId: string): Promise<void>;
}
/**
 * Runtime-agnostic inference executor
 */
export declare class InferenceExecutor {
    private engines;
    registerEngine(runtime: string, engine: InferenceEngine): void;
    execute(runtime: string, request: InferenceRequest): Promise<InferenceResult>;
    getAvailableRuntimes(): string[];
}
//# sourceMappingURL=inference.d.ts.map
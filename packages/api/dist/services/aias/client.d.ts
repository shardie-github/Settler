/**
 * AIAS Edge AI Accelerator Studio API Client
 *
 * IMPORTANT: This is an API client for AIAS. Settler.dev integrates with AIAS
 * via HTTP API calls, NOT direct code dependencies. This ensures:
 * - Product independence
 * - Separate versioning
 * - Independent deployment
 * - Future exit strategy protection
 *
 * Handles model upload, optimization, benchmarking, and export workflows via AIAS API.
 */
export interface AIASConfig {
    apiKey: string;
    baseUrl?: string;
}
export interface ModelUploadRequest {
    modelName: string;
    modelType: "matching" | "anomaly_detection" | "schema_inference" | "pii_detection";
    modelFile: Buffer | string;
    format: "onnx" | "tensorrt" | "executorch" | "tflite" | "pytorch";
    metadata?: Record<string, unknown>;
}
export interface ModelOptimizationRequest {
    modelId: string;
    targetDevices: string[];
    quantization: "int4" | "int8" | "fp16" | "fp32";
    optimizationLevel: "speed" | "balanced" | "accuracy";
}
export interface BenchmarkRequest {
    modelId: string;
    deviceProfile: {
        deviceType: string;
        os: string;
        arch: string;
        capabilities: Record<string, boolean>;
    };
    testData?: unknown[];
}
export interface BenchmarkResult {
    latency_ms: number;
    throughput_per_sec: number;
    accuracy?: number;
    memory_usage_mb: number;
    power_consumption_w?: number;
}
export interface ExportRequest {
    modelId: string;
    format: "docker" | "wasm" | "apk" | "onnx" | "tensorrt";
    targetDevice?: string;
}
export interface ExportResult {
    downloadUrl: string;
    fileSize: number;
    checksum: string;
}
export declare class AIASClient {
    private apiKey;
    private baseUrl;
    constructor(config: AIASConfig);
    private request;
    /**
     * Upload a model to AIAS for optimization
     */
    uploadModel(request: ModelUploadRequest): Promise<{
        jobId: string;
        modelId: string;
    }>;
    /**
     * Request model optimization
     */
    optimizeModel(request: ModelOptimizationRequest): Promise<{
        jobId: string;
    }>;
    /**
     * Get optimization job status
     */
    getOptimizationStatus(jobId: string): Promise<{
        status: "pending" | "running" | "completed" | "failed";
        progress?: number;
        result?: {
            modelId: string;
            optimizedModelUrl: string;
            benchmarkResults: BenchmarkResult;
        };
        error?: string;
    }>;
    /**
     * Run benchmark on a model
     */
    benchmarkModel(request: BenchmarkRequest): Promise<{
        jobId: string;
    }>;
    /**
     * Get benchmark results
     */
    getBenchmarkResults(jobId: string): Promise<BenchmarkResult>;
    /**
     * Export optimized model
     */
    exportModel(request: ExportRequest): Promise<ExportResult>;
    /**
     * List available models
     */
    listModels(): Promise<Array<{
        id: string;
        name: string;
        type: string;
        format: string;
        createdAt: string;
    }>>;
    /**
     * Get model details
     */
    getModel(modelId: string): Promise<{
        id: string;
        name: string;
        type: string;
        format: string;
        metadata: Record<string, unknown>;
        createdAt: string;
    }>;
    /**
     * Delete a model
     */
    deleteModel(modelId: string): Promise<void>;
}
export declare function getAIASClient(): AIASClient;
//# sourceMappingURL=client.d.ts.map
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
export class InferenceExecutor {
  private engines: Map<string, InferenceEngine> = new Map();

  registerEngine(runtime: string, engine: InferenceEngine): void {
    this.engines.set(runtime, engine);
  }

  async execute(runtime: string, request: InferenceRequest): Promise<InferenceResult> {
    const engine = this.engines.get(runtime);
    if (!engine) {
      throw new Error(`Inference engine not found for runtime: ${runtime}`);
    }

    return engine.runInference(request);
  }

  getAvailableRuntimes(): string[] {
    return Array.from(this.engines.keys());
  }
}

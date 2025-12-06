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

import { logInfo, logError } from "../../utils/logger";

export interface AIASConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface ModelUploadRequest {
  modelName: string;
  modelType: 'matching' | 'anomaly_detection' | 'schema_inference' | 'pii_detection';
  modelFile: Buffer | string; // Base64 encoded or file path
  format: 'onnx' | 'tensorrt' | 'executorch' | 'tflite' | 'pytorch';
  metadata?: Record<string, unknown>;
}

export interface ModelOptimizationRequest {
  modelId: string;
  targetDevices: string[]; // ['x86_64', 'arm64', 'armv7']
  quantization: 'int4' | 'int8' | 'fp16' | 'fp32';
  optimizationLevel: 'speed' | 'balanced' | 'accuracy';
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
  format: 'docker' | 'wasm' | 'apk' | 'onnx' | 'tensorrt';
  targetDevice?: string;
}

export interface ExportResult {
  downloadUrl: string;
  fileSize: number;
  checksum: string;
}

export class AIASClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: AIASConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || process.env.AIAS_BASE_URL || 'https://api.aias.studio';
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const requestHeaders: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...headers,
    };

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };
      
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
      
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AIAS API error: ${response.status} ${errorText}`);
      }

      return await response.json() as T;
    } catch (error) {
      logError('AIAS API request failed', error as Error, {
        method,
        endpoint,
      });
      throw error;
    }
  }

  /**
   * Upload a model to AIAS for optimization
   */
  async uploadModel(request: ModelUploadRequest): Promise<{ jobId: string; modelId: string }> {
    logInfo('Uploading model to AIAS', { modelName: request.modelName });

    const modelData = typeof request.modelFile === 'string'
      ? request.modelFile
      : request.modelFile.toString('base64');

    const response = await this.request<{ jobId: string; modelId: string }>(
      'POST',
      '/v1/models/upload',
      {
        model_name: request.modelName,
        model_type: request.modelType,
        model_data: modelData,
        format: request.format,
        metadata: request.metadata || {},
      }
    );

    return response;
  }

  /**
   * Request model optimization
   */
  async optimizeModel(request: ModelOptimizationRequest): Promise<{ jobId: string }> {
    logInfo('Requesting model optimization', { modelId: request.modelId });

    const response = await this.request<{ jobId: string }>(
      'POST',
      `/v1/models/${request.modelId}/optimize`,
      {
        target_devices: request.targetDevices,
        quantization: request.quantization,
        optimization_level: request.optimizationLevel,
      }
    );

    return response;
  }

  /**
   * Get optimization job status
   */
  async getOptimizationStatus(jobId: string): Promise<{
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress?: number;
    result?: {
      modelId: string;
      optimizedModelUrl: string;
      benchmarkResults: BenchmarkResult;
    };
    error?: string;
  }> {
    const response = await this.request<{
      status: string;
      progress?: number;
      result?: unknown;
      error?: string;
    }>(
      'GET',
      `/v1/jobs/${jobId}`
    );

    const status: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      progress?: number;
      result?: {
        modelId: string;
        optimizedModelUrl: string;
        benchmarkResults: BenchmarkResult;
      };
      error?: string;
    } = {
      status: response.status as 'pending' | 'running' | 'completed' | 'failed',
    };
    
    if (response.progress !== undefined) {
      status.progress = response.progress;
    }
    
    if (response.result !== undefined) {
      status.result = response.result as {
        modelId: string;
        optimizedModelUrl: string;
        benchmarkResults: BenchmarkResult;
      };
    }
    
    if (response.error !== undefined) {
      status.error = response.error;
    }
    
    return status;
  }

  /**
   * Run benchmark on a model
   */
  async benchmarkModel(request: BenchmarkRequest): Promise<{ jobId: string }> {
    logInfo('Requesting model benchmark', { modelId: request.modelId });

    const response = await this.request<{ jobId: string }>(
      'POST',
      `/v1/models/${request.modelId}/benchmark`,
      {
        device_profile: request.deviceProfile,
        test_data: request.testData || [],
      }
    );

    return response;
  }

  /**
   * Get benchmark results
   */
  async getBenchmarkResults(jobId: string): Promise<BenchmarkResult> {
    const response = await this.request<BenchmarkResult>(
      'GET',
      `/v1/jobs/${jobId}/results`
    );

    return response;
  }

  /**
   * Export optimized model
   */
  async exportModel(request: ExportRequest): Promise<ExportResult> {
    logInfo('Requesting model export', { modelId: request.modelId, format: request.format });

    const response = await this.request<ExportResult>(
      'POST',
      `/v1/models/${request.modelId}/export`,
      {
        format: request.format,
        target_device: request.targetDevice,
      }
    );

    return response;
  }

  /**
   * List available models
   */
  async listModels(): Promise<Array<{
    id: string;
    name: string;
    type: string;
    format: string;
    createdAt: string;
  }>> {
    const response = await this.request<Array<{
      id: string;
      name: string;
      type: string;
      format: string;
      created_at: string;
    }>>(
      'GET',
      '/v1/models'
    );

    return response.map(m => ({
      id: m.id,
      name: m.name,
      type: m.type,
      format: m.format,
      createdAt: m.created_at,
    }));
  }

  /**
   * Get model details
   */
  async getModel(modelId: string): Promise<{
    id: string;
    name: string;
    type: string;
    format: string;
    metadata: Record<string, unknown>;
    createdAt: string;
  }> {
    const response = await this.request<{
      id: string;
      name: string;
      type: string;
      format: string;
      metadata: Record<string, unknown>;
      created_at: string;
    }>(
      'GET',
      `/v1/models/${modelId}`
    );

    return {
      id: response.id,
      name: response.name,
      type: response.type,
      format: response.format,
      metadata: response.metadata,
      createdAt: response.created_at,
    };
  }

  /**
   * Delete a model
   */
  async deleteModel(modelId: string): Promise<void> {
    await this.request<void>(
      'DELETE',
      `/v1/models/${modelId}`
    );
  }
}

// Singleton instance
let aiasClientInstance: AIASClient | null = null;

export function getAIASClient(): AIASClient {
  if (!aiasClientInstance) {
    const apiKey = process.env.AIAS_API_KEY || '';
    if (!apiKey) {
      throw new Error('AIAS_API_KEY environment variable is required');
    }
    const config: AIASConfig = { apiKey };
    if (process.env.AIAS_BASE_URL) {
      config.baseUrl = process.env.AIAS_BASE_URL;
    }
    aiasClientInstance = new AIASClient(config);
  }
  return aiasClientInstance;
}

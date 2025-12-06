/**
 * Model Manager
 * Manages loading and execution of ML models for edge inference
 */
export declare class ModelManager {
    private models;
    private modelDir;
    constructor(dataDir: string);
    loadModels(): Promise<void>;
    getModel(modelName: string): Promise<unknown>;
    runInference(modelName: string, _input: unknown): Promise<unknown>;
}
//# sourceMappingURL=ModelManager.d.ts.map
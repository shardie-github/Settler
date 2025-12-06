/**
 * Model Distribution
 * Brand-neutral model versioning and distribution
 */
export interface ModelVersion {
    id: string;
    name: string;
    version: string;
    format: string;
    downloadUrl: string;
    checksum: string;
    metadata: Record<string, unknown>;
}
export interface DistributionConfig {
    modelId: string;
    targetDevices: string[];
    autoUpdate: boolean;
}
/**
 * Validate model version
 */
export declare function validateModelVersion(version: ModelVersion): boolean;
/**
 * Compare model versions
 */
export declare function compareVersions(v1: string, v2: string): number;
/**
 * Check if version update is available
 */
export declare function isUpdateAvailable(currentVersion: string, latestVersion: string): boolean;
//# sourceMappingURL=model-distribution.d.ts.map
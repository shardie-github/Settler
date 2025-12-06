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
export function validateModelVersion(version: ModelVersion): boolean {
  return !!(
    version.id &&
    version.name &&
    version.version &&
    version.format &&
    version.downloadUrl &&
    version.checksum
  );
}

/**
 * Compare model versions
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }

  return 0;
}

/**
 * Check if version update is available
 */
export function isUpdateAvailable(currentVersion: string, latestVersion: string): boolean {
  return compareVersions(latestVersion, currentVersion) > 0;
}

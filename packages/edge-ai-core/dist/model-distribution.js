"use strict";
/**
 * Model Distribution
 * Brand-neutral model versioning and distribution
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModelVersion = validateModelVersion;
exports.compareVersions = compareVersions;
exports.isUpdateAvailable = isUpdateAvailable;
/**
 * Validate model version
 */
function validateModelVersion(version) {
    return !!(version.id &&
        version.name &&
        version.version &&
        version.format &&
        version.downloadUrl &&
        version.checksum);
}
/**
 * Compare model versions
 */
function compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;
        if (part1 > part2)
            return 1;
        if (part1 < part2)
            return -1;
    }
    return 0;
}
/**
 * Check if version update is available
 */
function isUpdateAvailable(currentVersion, latestVersion) {
    return compareVersions(latestVersion, currentVersion) > 0;
}
//# sourceMappingURL=model-distribution.js.map
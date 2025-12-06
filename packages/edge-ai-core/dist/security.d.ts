/**
 * Security Utilities
 * Brand-neutral security wrappers for edge AI operations
 */
/**
 * Generate secure node key
 */
export declare function generateNodeKey(): string;
/**
 * Hash node key for storage
 */
export declare function hashNodeKey(key: string): string;
/**
 * Generate enrollment key
 */
export declare function generateEnrollmentKey(): string;
/**
 * Encrypt sensitive data
 */
export declare function encrypt(data: string, key: string): string;
/**
 * Decrypt sensitive data
 */
export declare function decrypt(encrypted: string, key: string): string;
/**
 * Generate PII token
 */
export declare function generatePIIToken(value: string, piiType: string): string;
//# sourceMappingURL=security.d.ts.map
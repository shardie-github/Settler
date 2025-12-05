/**
 * Security Utilities
 * Brand-neutral security wrappers for edge AI operations
 */

import crypto from 'crypto';

/**
 * Generate secure node key
 */
export function generateNodeKey(): string {
  return `sk_edge_${crypto.randomBytes(32).toString('base64url')}`;
}

/**
 * Hash node key for storage
 */
export function hashNodeKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

/**
 * Generate enrollment key
 */
export function generateEnrollmentKey(): string {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Encrypt sensitive data
 */
export function encrypt(data: string, key: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt sensitive data
 */
export function decrypt(encrypted: string, key: string): string {
  const parts = encrypted.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedData = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Generate PII token
 */
export function generatePIIToken(value: string, piiType: string): string {
  const hash = crypto.createHash('sha256')
    .update(`${piiType}:${value}`)
    .digest('hex')
    .substring(0, 16);
  return `[REDACTED_${piiType.toUpperCase()}_${hash}]`;
}

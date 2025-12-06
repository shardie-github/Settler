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
  const keyBuffer = Buffer.from(key, 'hex');
  if (keyBuffer.length !== 32) {
    throw new Error('Invalid key length. Key must be 32 bytes (64 hex characters)');
  }
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt sensitive data
 */
export function decrypt(encrypted: string, key: string): string {
  const parts = encrypted.split(':');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error('Invalid encrypted data format');
  }
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedData = parts[1];
  const keyBuffer = Buffer.from(key, 'hex');
  if (keyBuffer.length !== 32) {
    throw new Error('Invalid key length. Key must be 32 bytes (64 hex characters)');
  }
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
  let decrypted: string = decipher.update(encryptedData, 'hex', 'utf8');
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

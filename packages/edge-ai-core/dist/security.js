"use strict";
/**
 * Security Utilities
 * Brand-neutral security wrappers for edge AI operations
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNodeKey = generateNodeKey;
exports.hashNodeKey = hashNodeKey;
exports.generateEnrollmentKey = generateEnrollmentKey;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.generatePIIToken = generatePIIToken;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generate secure node key
 */
function generateNodeKey() {
    return `sk_edge_${crypto_1.default.randomBytes(32).toString('base64url')}`;
}
/**
 * Hash node key for storage
 */
function hashNodeKey(key) {
    return crypto_1.default.createHash('sha256').update(key).digest('hex');
}
/**
 * Generate enrollment key
 */
function generateEnrollmentKey() {
    return crypto_1.default.randomBytes(32).toString('base64url');
}
/**
 * Encrypt sensitive data
 */
function encrypt(data, key) {
    const iv = crypto_1.default.randomBytes(16);
    const keyBuffer = Buffer.from(key, 'hex');
    if (keyBuffer.length !== 32) {
        throw new Error('Invalid key length. Key must be 32 bytes (64 hex characters)');
    }
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', keyBuffer, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
/**
 * Decrypt sensitive data
 */
function decrypt(encrypted, key) {
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
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
/**
 * Generate PII token
 */
function generatePIIToken(value, piiType) {
    const hash = crypto_1.default.createHash('sha256')
        .update(`${piiType}:${value}`)
        .digest('hex')
        .substring(0, 16);
    return `[REDACTED_${piiType.toUpperCase()}_${hash}]`;
}
//# sourceMappingURL=security.js.map
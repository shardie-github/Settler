"use strict";
/**
 * Environment Variable Validation
 * Uses envalid for type-safe environment variable validation
 *
 * Note: Validation is skipped during Next.js builds to avoid requiring
 * runtime-only environment variables at build time.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedConfig = void 0;
const envalid_1 = require("envalid");
// Skip validation during Next.js build (when NEXT_PHASE is set)
const skipValidation = process.env.NEXT_PHASE !== undefined ||
    process.env.NEXT_BUILD === 'true' ||
    (process.env.NODE_ENV === 'production' && !process.env.VERCEL);
const env = skipValidation ? {
    NODE_ENV: (process.env.NODE_ENV || 'development'),
    PORT: Number(process.env.PORT || 3000),
    HOST: process.env.HOST || '0.0.0.0',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: Number(process.env.DB_PORT || 5432),
    DB_NAME: process.env.DB_NAME || 'settler',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_SSL: process.env.DB_SSL === 'true',
    DB_POOL_MIN: Number(process.env.DB_POOL_MIN || 5),
    DB_POOL_MAX: Number(process.env.DB_POOL_MAX || 20),
    DB_CONNECTION_TIMEOUT: Number(process.env.DB_CONNECTION_TIMEOUT || 2000),
    DB_STATEMENT_TIMEOUT: Number(process.env.DB_STATEMENT_TIMEOUT || 30000),
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: Number(process.env.REDIS_PORT || 6379),
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_TLS: process.env.REDIS_TLS === 'true',
    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'dev-encryption-key-32-chars-long!!',
    RATE_LIMIT_DEFAULT: Number(process.env.RATE_LIMIT_DEFAULT || 1000),
    RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
    WEBHOOK_MAX_RETRIES: Number(process.env.WEBHOOK_MAX_RETRIES || 5),
    WEBHOOK_INITIAL_DELAY: Number(process.env.WEBHOOK_INITIAL_DELAY || 2000),
    WEBHOOK_MAX_DELAY: Number(process.env.WEBHOOK_MAX_DELAY || 32000),
    DATA_RETENTION_DAYS: Number(process.env.DATA_RETENTION_DAYS || 365),
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '*',
    LOG_LEVEL: (process.env.LOG_LEVEL || 'info'),
    LOG_SAMPLING_RATE: Number(process.env.LOG_SAMPLING_RATE || 1.0),
    SERVICE_NAME: process.env.SERVICE_NAME || 'settler-api',
    OTLP_ENDPOINT: process.env.OTLP_ENDPOINT,
    JAEGER_ENDPOINT: process.env.JAEGER_ENDPOINT,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
    SENTRY_TRACES_SAMPLE_RATE: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
    ENABLE_SCHEMA_PER_TENANT: process.env.ENABLE_SCHEMA_PER_TENANT === 'true',
    ENABLE_REQUEST_TIMEOUT: process.env.ENABLE_REQUEST_TIMEOUT !== 'false',
    ENABLE_API_DOCS: process.env.ENABLE_API_DOCS !== 'false',
    DEPLOYMENT_ENV: (process.env.DEPLOYMENT_ENV || 'local'),
    TRUST_PROXY: process.env.TRUST_PROXY === 'true',
    SECURE_COOKIES: process.env.SECURE_COOKIES === 'true',
    METRICS_ENABLED: process.env.METRICS_ENABLED !== 'false',
    HEALTH_CHECK_ENABLED: process.env.HEALTH_CHECK_ENABLED !== 'false',
} : (0, envalid_1.cleanEnv)(process.env, {
    // Node Environment
    NODE_ENV: (0, envalid_1.str)({
        choices: ['development', 'test', 'production', 'staging', 'preview'],
        default: 'development',
    }),
    // Server Configuration
    PORT: (0, envalid_1.port)({ default: 3000 }),
    HOST: (0, envalid_1.host)({ default: '0.0.0.0' }),
    // Database Configuration
    DB_HOST: (0, envalid_1.host)({ default: 'localhost' }),
    DB_PORT: (0, envalid_1.port)({ default: 5432 }),
    DB_NAME: (0, envalid_1.str)({ default: 'settler' }),
    DB_USER: (0, envalid_1.str)({ default: 'postgres' }),
    DB_PASSWORD: (0, envalid_1.str)({ default: 'postgres', devDefault: 'postgres' }),
    DB_SSL: (0, envalid_1.bool)({ default: false }),
    DB_POOL_MIN: (0, envalid_1.num)({ default: 5 }),
    DB_POOL_MAX: (0, envalid_1.num)({ default: 20 }),
    DB_CONNECTION_TIMEOUT: (0, envalid_1.num)({ default: 2000 }),
    DB_STATEMENT_TIMEOUT: (0, envalid_1.num)({ default: 30000 }),
    // Redis Configuration
    REDIS_HOST: (0, envalid_1.host)({ default: 'localhost' }),
    REDIS_PORT: (0, envalid_1.port)({ default: 6379 }),
    REDIS_URL: (0, envalid_1.url)({ default: undefined }),
    REDIS_PASSWORD: (0, envalid_1.str)({ default: undefined }),
    REDIS_TLS: (0, envalid_1.bool)({ default: false }),
    // JWT Configuration
    JWT_SECRET: (0, envalid_1.str)({
        default: 'dev-secret-change-in-production',
        devDefault: 'dev-secret-change-in-production',
        desc: 'Secret key for JWT token signing',
    }),
    JWT_ACCESS_EXPIRY: (0, envalid_1.str)({ default: '15m' }),
    JWT_REFRESH_EXPIRY: (0, envalid_1.str)({ default: '7d' }),
    JWT_REFRESH_SECRET: (0, envalid_1.str)({
        default: undefined,
        devDefault: undefined,
        desc: 'Optional separate secret for refresh tokens',
    }),
    // Encryption Configuration
    ENCRYPTION_KEY: (0, envalid_1.str)({
        default: 'dev-encryption-key-32-chars-long!!',
        devDefault: 'dev-encryption-key-32-chars-long!!',
        desc: '32-byte key for AES-256-GCM encryption',
    }),
    // Rate Limiting
    RATE_LIMIT_DEFAULT: (0, envalid_1.num)({ default: 1000 }),
    RATE_LIMIT_WINDOW_MS: (0, envalid_1.num)({ default: 900000 }), // 15 minutes
    // Webhook Configuration
    WEBHOOK_MAX_RETRIES: (0, envalid_1.num)({ default: 5 }),
    WEBHOOK_INITIAL_DELAY: (0, envalid_1.num)({ default: 2000 }),
    WEBHOOK_MAX_DELAY: (0, envalid_1.num)({ default: 32000 }),
    // Data Retention
    DATA_RETENTION_DAYS: (0, envalid_1.num)({ default: 365 }),
    // CORS Configuration
    ALLOWED_ORIGINS: (0, envalid_1.str)({
        default: '*',
        desc: 'Comma-separated list of allowed origins',
    }),
    // Logging Configuration
    LOG_LEVEL: (0, envalid_1.str)({
        choices: ['error', 'warn', 'info', 'debug'],
        default: 'info',
    }),
    LOG_SAMPLING_RATE: (0, envalid_1.num)({ default: 1.0 }),
    // Observability Configuration
    SERVICE_NAME: (0, envalid_1.str)({ default: 'settler-api' }),
    OTLP_ENDPOINT: (0, envalid_1.url)({ default: undefined }),
    JAEGER_ENDPOINT: (0, envalid_1.url)({ default: undefined }),
    // Sentry Configuration
    SENTRY_DSN: (0, envalid_1.url)({ default: undefined }),
    SENTRY_ENVIRONMENT: (0, envalid_1.str)({ default: undefined }),
    SENTRY_TRACES_SAMPLE_RATE: (0, envalid_1.num)({ default: 0.1 }),
    // Feature Flags
    ENABLE_SCHEMA_PER_TENANT: (0, envalid_1.bool)({ default: false }),
    ENABLE_REQUEST_TIMEOUT: (0, envalid_1.bool)({ default: true }),
    ENABLE_API_DOCS: (0, envalid_1.bool)({ default: true }),
    // Deployment Configuration
    DEPLOYMENT_ENV: (0, envalid_1.str)({
        choices: ['local', 'staging', 'production'],
        default: 'local',
    }),
    // Security Configuration
    TRUST_PROXY: (0, envalid_1.bool)({ default: false }),
    SECURE_COOKIES: (0, envalid_1.bool)({ default: false }),
    // Monitoring Configuration
    METRICS_ENABLED: (0, envalid_1.bool)({ default: true }),
    HEALTH_CHECK_ENABLED: (0, envalid_1.bool)({ default: true }),
});
// Validate encryption key length in production and preview
// Skip validation during Next.js build (when NEXT_PHASE is set or during build process)
const isNextBuild = process.env.NEXT_PHASE !== undefined ||
    process.env.NEXT_BUILD === 'true' ||
    process.env.__NEXT_PRIVATE_STANDALONE_BUILD !== undefined;
if (!isNextBuild && (env.NODE_ENV === 'production' || env.NODE_ENV === 'preview')) {
    if (!env.ENCRYPTION_KEY || env.ENCRYPTION_KEY.length !== 32) {
        throw new Error(`ENCRYPTION_KEY must be exactly 32 characters in ${env.NODE_ENV}`);
    }
    if (!env.JWT_SECRET || env.JWT_SECRET === 'dev-secret-change-in-production') {
        throw new Error(`JWT_SECRET must be set to a secure random value in ${env.NODE_ENV}`);
    }
    if (env.ALLOWED_ORIGINS === '*') {
        console.warn(`WARNING: CORS allows all origins in ${env.NODE_ENV}. Consider restricting ALLOWED_ORIGINS.`);
    }
}
// Export validated config
exports.validatedConfig = {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    host: env.HOST,
    database: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        name: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        ssl: env.DB_SSL,
        poolMin: env.DB_POOL_MIN,
        poolMax: env.DB_POOL_MAX,
        connectionTimeout: env.DB_CONNECTION_TIMEOUT,
        statementTimeout: env.DB_STATEMENT_TIMEOUT,
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        url: env.REDIS_URL,
        password: env.REDIS_PASSWORD,
        tls: env.REDIS_TLS,
    },
    jwt: {
        secret: env.JWT_SECRET,
        accessTokenExpiry: env.JWT_ACCESS_EXPIRY,
        refreshTokenExpiry: env.JWT_REFRESH_EXPIRY,
        refreshSecret: env.JWT_REFRESH_SECRET || env.JWT_SECRET,
    },
    encryption: {
        key: env.ENCRYPTION_KEY,
    },
    rateLimiting: {
        defaultLimit: env.RATE_LIMIT_DEFAULT,
        windowMs: env.RATE_LIMIT_WINDOW_MS,
    },
    webhook: {
        maxRetries: env.WEBHOOK_MAX_RETRIES,
        initialDelay: env.WEBHOOK_INITIAL_DELAY,
        maxDelay: env.WEBHOOK_MAX_DELAY,
    },
    dataRetention: {
        defaultDays: env.DATA_RETENTION_DAYS,
    },
    allowedOrigins: env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()),
    logging: {
        level: env.LOG_LEVEL,
        samplingRate: env.LOG_SAMPLING_RATE,
    },
    observability: {
        serviceName: env.SERVICE_NAME,
        otlpEndpoint: env.OTLP_ENDPOINT,
        jaegerEndpoint: env.JAEGER_ENDPOINT,
    },
    sentry: {
        dsn: env.SENTRY_DSN,
        environment: env.SENTRY_ENVIRONMENT || env.NODE_ENV,
        tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE,
    },
    features: {
        enableSchemaPerTenant: env.ENABLE_SCHEMA_PER_TENANT,
        enableRequestTimeout: env.ENABLE_REQUEST_TIMEOUT,
        enableApiDocs: env.ENABLE_API_DOCS,
    },
    deployment: {
        env: env.DEPLOYMENT_ENV,
    },
    security: {
        trustProxy: env.TRUST_PROXY,
        secureCookies: env.SECURE_COOKIES,
    },
    monitoring: {
        metricsEnabled: env.METRICS_ENABLED,
        healthCheckEnabled: env.HEALTH_CHECK_ENABLED,
    },
};
//# sourceMappingURL=validation.js.map
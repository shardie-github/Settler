/**
 * Environment Variable Validation
 * Uses envalid for type-safe environment variable validation
 *
 * Note: Validation is skipped during Next.js builds to avoid requiring
 * runtime-only environment variables at build time.
 */
export declare const validatedConfig: {
    nodeEnv: any;
    port: any;
    host: any;
    database: {
        host: any;
        port: any;
        name: any;
        user: any;
        password: any;
        ssl: any;
        poolMin: any;
        poolMax: any;
        connectionTimeout: any;
        statementTimeout: any;
    };
    redis: {
        host: any;
        port: any;
        url: any;
        password: any;
        tls: any;
    };
    jwt: {
        secret: any;
        accessTokenExpiry: any;
        refreshTokenExpiry: any;
        refreshSecret: any;
    };
    encryption: {
        key: any;
    };
    rateLimiting: {
        defaultLimit: any;
        windowMs: any;
    };
    webhook: {
        maxRetries: any;
        initialDelay: any;
        maxDelay: any;
    };
    dataRetention: {
        defaultDays: any;
    };
    allowedOrigins: any;
    logging: {
        level: any;
        samplingRate: any;
    };
    observability: {
        serviceName: any;
        otlpEndpoint: any;
        jaegerEndpoint: any;
    };
    sentry: {
        dsn: any;
        environment: any;
        tracesSampleRate: any;
    };
    features: {
        enableSchemaPerTenant: any;
        enableRequestTimeout: any;
        enableApiDocs: any;
    };
    deployment: {
        env: any;
    };
    security: {
        trustProxy: any;
        secureCookies: any;
    };
    monitoring: {
        metricsEnabled: any;
        healthCheckEnabled: any;
    };
};
//# sourceMappingURL=validation.d.ts.map
import winston from 'winston';
import { redact } from './redaction';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: {
    service: 'settler-api',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(redact(meta)) : '';
          return `${timestamp} [${level}]: ${message} ${metaStr}`;
        })
      ),
    }),
  ],
});

// Helper to log with automatic redaction
export function logInfo(message: string, meta?: any) {
  logger.info(message, redact(meta));
}

export function logError(message: string, error?: any, meta?: any) {
  logger.error(message, {
    ...redact(meta),
    error: error?.message,
    stack: error?.stack,
  });
}

export function logWarn(message: string, meta?: any) {
  logger.warn(message, redact(meta));
}

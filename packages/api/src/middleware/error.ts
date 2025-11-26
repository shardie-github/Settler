import { Request, Response, NextFunction } from "express";
import { logError } from "../utils/logger";
import { AuthRequest } from "./auth";
import { config } from "../config";
import { captureException, setSentryUser } from "./sentry";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authReq = req as AuthRequest;
  
  // Set Sentry user context
  if (authReq.userId) {
    setSentryUser(authReq);
  }
  
  // Log error with context
  logError('Request error', err, {
    method: req.method,
    path: req.path,
    ip: req.ip,
    traceId: authReq.traceId,
    userId: authReq.userId,
  });

  // Capture exception to Sentry (only for 5xx errors)
  const statusCode = (err as any).statusCode || 500;
  if (statusCode >= 500) {
    captureException(err, {
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body,
      },
      user: {
        id: authReq.userId,
        email: authReq.email,
      },
    });
  }

  // Default error response
  const message = err.message || "Internal Server Error";

  // Never expose stack traces in production
  const response: any = {
    error: err.name || "Internal Server Error",
    message,
    traceId: authReq.traceId,
  };

  // Only include stack in development
  if (config.nodeEnv === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

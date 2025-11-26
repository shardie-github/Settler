import { Router, Request, Response } from "express";
import { query } from "../db";
import { pool } from "../db";
import { logError } from "../utils/logger";

const router = Router();

interface HealthCheck {
  status: 'healthy' | 'unhealthy' | 'degraded';
  latency?: number;
  error?: string;
}

async function checkDatabase(): Promise<HealthCheck> {
  const start = Date.now();
  try {
    await query('SELECT 1');
    const latency = Date.now() - start;
    return { status: 'healthy', latency };
  } catch (error: any) {
    return { status: 'unhealthy', error: error.message };
  }
}

async function checkConnectionPool(): Promise<HealthCheck> {
  try {
    const totalConnections = pool.totalCount;
    const idleConnections = pool.idleCount;
    const waitingCount = pool.waitingCount;
    
    const utilization = (totalConnections - idleConnections) / pool.options.max!;
    
    if (utilization > 0.9) {
      return {
        status: 'degraded',
        error: `High connection pool utilization: ${(utilization * 100).toFixed(1)}%`,
      };
    }
    
    if (waitingCount > 0) {
      return {
        status: 'degraded',
        error: `${waitingCount} connections waiting`,
      };
    }
    
    return { status: 'healthy' };
  } catch (error: any) {
    return { status: 'unhealthy', error: error.message };
  }
}

// Basic health check
router.get("/", async (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "settler-api",
    version: "1.0.0",
  });
});

// Detailed health check with dependency checks
router.get("/detailed", async (req: Request, res: Response) => {
  const checks = {
    database: await checkDatabase(),
    connectionPool: await checkConnectionPool(),
  };

  const allHealthy = Object.values(checks).every(c => c.status === 'healthy');
  const anyUnhealthy = Object.values(checks).some(c => c.status === 'unhealthy');
  
  const overallStatus = anyUnhealthy ? 'unhealthy' : (allHealthy ? 'healthy' : 'degraded');

  res.status(overallStatus === 'healthy' ? 200 : 503).json({
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString(),
    service: "settler-api",
    version: "1.0.0",
  });
});

export { router as healthRouter };

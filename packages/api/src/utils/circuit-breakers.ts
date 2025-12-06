/**
 * Circuit Breaker Utilities
 * Prevents cascading failures from external service calls
 */

import CircuitBreaker from "opossum";
import { logWarn, logError } from "./logger";

export interface CircuitBreakerOptions {
  timeout?: number;
  errorThresholdPercentage?: number;
  resetTimeout?: number;
  name?: string;
}

/**
 * Create a circuit breaker for external calls
 */
export function createCircuitBreaker<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: CircuitBreakerOptions = {}
): CircuitBreaker<T> {
  const {
    timeout = 10000,
    errorThresholdPercentage = 50,
    resetTimeout = 30000,
    name = "circuit-breaker",
  } = options;

  const breaker = new CircuitBreaker(fn, {
    timeout,
    errorThresholdPercentage,
    resetTimeout,
    name,
  });

  breaker.on("open", () => {
    logWarn("Circuit breaker opened", {
      name,
      timeout,
      errorThresholdPercentage,
    });
  });

  breaker.on("halfOpen", () => {
    logWarn("Circuit breaker half-open", { name });
  });

  breaker.on("close", () => {
    logWarn("Circuit breaker closed", { name });
  });

  breaker.on("failure", (error) => {
    logError("Circuit breaker failure", error, { name });
  });

  return breaker;
}

/**
 * Circuit breaker for adapter API calls
 */
export function createAdapterCircuitBreaker<T extends (...args: any[]) => Promise<any>>(
  adapterName: string,
  fn: T
): CircuitBreaker<T> {
  return createCircuitBreaker(fn, {
    name: `adapter-${adapterName}`,
    timeout: 30000, // 30s timeout for adapters
    errorThresholdPercentage: 50,
    resetTimeout: 60000, // 1 minute reset
  });
}

/**
 * Circuit breaker for webhook deliveries
 */
export function createWebhookCircuitBreaker<T extends (...args: any[]) => Promise<any>>(
  fn: T
): CircuitBreaker<T> {
  return createCircuitBreaker(fn, {
    name: "webhook-delivery",
    timeout: 10000, // 10s timeout for webhooks
    errorThresholdPercentage: 50,
    resetTimeout: 30000, // 30s reset
  });
}

/**
 * Circuit breaker for FX rate provider calls
 */
export function createFXRateCircuitBreaker<T extends (...args: any[]) => Promise<any>>(
  fn: T
): CircuitBreaker<T> {
  return createCircuitBreaker(fn, {
    name: "fx-rate-provider",
    timeout: 5000, // 5s timeout for FX rates
    errorThresholdPercentage: 50,
    resetTimeout: 60000, // 1 minute reset
  });
}

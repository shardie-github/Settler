interface RetryOptions {
  retries?: number;
  minTimeout?: number;
  maxTimeout?: number;
  factor?: number;
  onRetry?: (error: Error, attempt: number) => void;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    minTimeout = 1000,
    maxTimeout = 10000,
    factor = 2,
    onRetry,
  } = options;

  let lastError: Error;
  let timeout = minTimeout;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      if (attempt < retries) {
        if (onRetry) {
          onRetry(error, attempt + 1);
        }

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, timeout));
        timeout = Math.min(timeout * factor, maxTimeout);
      }
    }
  }

  throw lastError!;
}

export function isRetryableError(error: any): boolean {
  if (!error) return false;

  // Network errors
  if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
    return true;
  }

  // HTTP 5xx errors
  if (error.statusCode >= 500 && error.statusCode < 600) {
    return true;
  }

  // HTTP 429 (rate limit) - retryable
  if (error.statusCode === 429) {
    return true;
  }

  // HTTP 408 (timeout) - retryable
  if (error.statusCode === 408) {
    return true;
  }

  return false;
}

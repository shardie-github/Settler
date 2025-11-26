interface CircuitBreakerOptions {
  timeout: number;
  errorThresholdPercentage: number;
  resetTimeout: number;
  monitoringPeriod: number;
}

interface CircuitState {
  state: 'closed' | 'open' | 'half-open';
  failures: number;
  successes: number;
  lastFailureTime: number;
  nextAttempt: number;
}

export class CircuitBreaker {
  private state: CircuitState;
  private options: CircuitBreakerOptions;

  constructor(options: Partial<CircuitBreakerOptions> = {}) {
    this.options = {
      timeout: options.timeout || 30000,
      errorThresholdPercentage: options.errorThresholdPercentage || 50,
      resetTimeout: options.resetTimeout || 60000,
      monitoringPeriod: options.monitoringPeriod || 60000,
    };

    this.state = {
      state: 'closed',
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      nextAttempt: 0,
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    const now = Date.now();

    // Check if circuit should transition from open to half-open
    if (this.state.state === 'open') {
      if (now < this.state.nextAttempt) {
        throw new Error('Circuit breaker is open');
      }
      this.state.state = 'half-open';
      this.state.successes = 0;
      this.state.failures = 0;
    }

    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Operation timeout')), this.options.timeout)
        ),
      ]);

      // Success
      this.onSuccess();
      return result;
    } catch (error) {
      // Failure
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state.state === 'half-open') {
      this.state.successes++;
      if (this.state.successes >= 3) {
        // Reset to closed after 3 successes
        this.state.state = 'closed';
        this.state.failures = 0;
        this.state.successes = 0;
      }
    } else {
      // Reset failure count on success
      this.state.failures = Math.max(0, this.state.failures - 1);
    }
  }

  private onFailure(): void {
    this.state.failures++;
    this.state.lastFailureTime = Date.now();

    const total = this.state.failures + this.state.successes;
    const failureRate = total > 0 ? (this.state.failures / total) * 100 : 0;

    if (
      this.state.state === 'half-open' ||
      failureRate >= this.options.errorThresholdPercentage
    ) {
      // Open circuit
      this.state.state = 'open';
      this.state.nextAttempt = Date.now() + this.options.resetTimeout;
    }
  }

  getState(): CircuitState {
    return { ...this.state };
  }

  reset(): void {
    this.state = {
      state: 'closed',
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      nextAttempt: 0,
    };
  }
}

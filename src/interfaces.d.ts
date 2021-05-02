export interface CircuitBreakerOptions {
	enabled?: boolean,
	threshold?: number;
	windowTime?: number;
	minRequestCount?: number;
	halfOpenTime?: number;
	check?: CheckRetryable;
}

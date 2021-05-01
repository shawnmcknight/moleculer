export class MoleculerError extends Error {
	public code: number;
	public type: string;
	public data: any;
	public retryable: boolean;

	constructor(message: string, code: number, type: string, data: any);
	constructor(message: string, code: number, type: string);
	constructor(message: string, code: number);
	constructor(message: string);
}

export class MoleculerRetryableError extends MoleculerError {}

export class MoleculerServerError extends MoleculerRetryableError {}

export class MoleculerClientError extends MoleculerError {}

export class ServiceNotFoundError extends MoleculerRetryableError {
	constructor(data: any);
}

export class ServiceNotAvailableError extends MoleculerRetryableError {
	constructor(data: any);
}

export class RequestTimeoutError extends MoleculerRetryableError {
	constructor(data: any);
}

export class RequestSkippedError extends MoleculerError {
	constructor(data: any);
}

export class RequestRejectedError extends MoleculerRetryableError {
	constructor(data: any);
}

export class QueueIsFullError extends MoleculerRetryableError {
	constructor(data: any);
}

export class ValidationError extends MoleculerClientError {
	constructor(message: string, type: string, data: Record<string, any>);
	constructor(message: string, type: string);
	constructor(message: string);
}

export class MaxCallLevelError extends MoleculerError {
	constructor(data: any);
}

export class ServiceSchemaError extends MoleculerError {
	constructor(message: string, data: any);
}

export class BrokerOptionsError extends MoleculerError {
	constructor(message: string, data: any);
}

export class GracefulStopTimeoutError extends MoleculerError {
	constructor(data: any);
}

export class ProtocolVersionMismatchError extends MoleculerError {
	constructor(data: any);
}

export class InvalidPacketDataError extends MoleculerError {
	constructor(data: any);
}

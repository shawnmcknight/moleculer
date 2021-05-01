export function isFunction(func: unknown): func is Function;

export function isString(str: unknown): str is string;

export function isObject(obj: unknown): obj is object;

export function isPlainObject(obj: unknown): obj is object;

export function isDate(date: unknown): date is Date;

export function flatten<T>(arr: readonly T[] | readonly T[][]): T[];

export function humanize(millis?: number | null): string;

export function generateToken(): string;

export function removeFromArray<T>(arr: T[], item: T): T[];

export function getNodeID(): string;

export function getIpList(): string[];

export function isPromise<T>(promise: unknown): promise is Promise<T>;

export function polyfillPromise(P: typeof Promise): void;

export function clearRequireCache(filename: string): void;

export function match(text: string, pattern: string): boolean;

export function deprecate(prop: unknown, msg?: string): void;

export function safetyObject(obj: unknown, options?: { maxSafeObjectSize?: number }): any;

export function dotSet<T extends object>(obj: T, path: string, value: unknown): T;

export function makeDirs(path: string): void;

export function parseByteString(value: string): number;

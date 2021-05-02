import os from "os";

export interface NodeClientInfo {
	type: "nodejs";
	version: string;
	langVersion: NodeJS.Process["version"];
}

export interface NodeCpuInfo {
	load1: number;
	load5: number;
	load15: number;
	cores: number;
	utilization: number;
}

export interface NodeMemoryInfo {
	free: number;
	total: number;
	percent: number;
}

export interface NodeOsInfo {
	uptime: number;
	type: string;
	release: string;
	hostname: string;
	arch: string;
	platform: NodeJS.Platform;
	user: os.UserInfo<string>;
}

export interface NodeProcessInfo {
	pid: NodeJS.Process["pid"];
	memory: NodeJS.MemoryUsage;
	uptime: number;
	argv: string[];
}

export interface NodeNetworkInfo {
	ip: string[];
}

export interface NodeDateTimeInfo {
	now: number;
	iso: string;
	utc: string;
}

export interface NodeHealthStatus {
	client: NodeClientInfo;
	cpu: NodeCpuInfo;
	mem: NodeMemoryInfo;
	os: NodeOsInfo;
	process: NodeProcessInfo;
	net: NodeNetworkInfo;
	time: NodeDateTimeInfo;
}

export function getHealthStatus(): NodeHealthStatus;
export function getCpuInfo(): NodeCpuInfo;
export function getMemoryInfo(): NodeMemoryInfo;
export function getOsInfo(): NodeOsInfo;
export function getProcessInfo(): NodeProcessInfo;
export function getClientInfo(): NodeClientInfo;
export function getNetworkInterfacesInfo(): NodeNetworkInfo;
export function getDateTimeInfo(): NodeDateTimeInfo;


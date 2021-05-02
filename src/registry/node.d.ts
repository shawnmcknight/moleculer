declare class Node {
	id: string;
	instanceID: string | null;
	available: boolean;
	local: boolean;
	lastHeartbeatTime: number;
	config: Record<string, any>;
	client: Record<string, any>;
	metadata: Record<string, any>;

	ipList: Array<string>;
	port: number| null;
	hostname: string | null;
	udpAddress: string | null;

	rawInfo: Record<string, any>;
	services: [Record<string, any>];

	cpu: number | null;
	cpuSeq: number | null;

	seq: number;
	offlineSince: number | null;

	heartbeat(payload: Record<string, any>): void;
	disconnected(): void;
}
export default Node;

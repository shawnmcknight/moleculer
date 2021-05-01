export const PACKET_UNKNOWN = "???";
export const PACKET_EVENT = "EVENT";
export const PACKET_REQUEST = "REQ";
export const PACKET_RESPONSE = "RES";
export const PACKET_DISCOVER = "DISCOVER";
export const PACKET_INFO = "INFO";
export const PACKET_DISCONNECT = "DISCONNECT";
export const PACKET_HEARTBEAT = "HEARTBEAT";
export const PACKET_PING = "PING";
export const PACKET_PONG = "PONG";
export const PACKET_GOSSIP_REQ = "GOSSIP_REQ";
export const PACKET_GOSSIP_RES = "GOSSIP_RES";
export const PACKET_GOSSIP_HELLO = "GOSSIP_HELLO";

export const DATATYPE_UNDEFINED = 0;
export const DATATYPE_NULL = 1;
export const DATATYPE_JSON = 2;
export const DATATYPE_BUFFER = 3;

export type PacketType =
	| typeof PACKET_UNKNOWN
	| typeof PACKET_EVENT
	| typeof PACKET_DISCONNECT
	| typeof PACKET_DISCOVER
	| typeof PACKET_INFO
	| typeof PACKET_HEARTBEAT
	| typeof PACKET_REQUEST
	| typeof PACKET_PING
	| typeof PACKET_PONG
	| typeof PACKET_RESPONSE
	| typeof PACKET_GOSSIP_REQ
	| typeof PACKET_GOSSIP_RES
	| typeof PACKET_GOSSIP_HELLO;

export interface PacketPayload {
	ver: typeof PROTOCOL_VERSION;
	sender: string | null;
}

export class Packet {
	constructor(type: string, target: string, payload?: any);
	type: PacketType;
	target?: string;
	payload: PacketPayload;
}

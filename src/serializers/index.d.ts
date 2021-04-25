export { default as Avro } from "./avro";
export { default as Base } from "./base";
export { default as CBOR } from "./cbor";
export { default as JSON } from "./json";
export { default as MsgPack } from "./msgpack";
export { default as Notepack } from "./notepack";
export { default as ProtoBuf } from "./protobuf";
export { default as Thrift } from "./thrift";

export function resolve(type: string | Record<string, any> | Base): Base;

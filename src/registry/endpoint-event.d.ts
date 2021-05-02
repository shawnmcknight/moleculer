import Service from "../service";
import Endpoint from "./endpoint";

declare class EventEndpoint extends Endpoint {
	service: Service;
	event: EventSchema;
}
export default EventEndpoint;

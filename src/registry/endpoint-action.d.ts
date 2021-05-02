import Service from "../service";
import Endpoint from "./endpoint";

declare class ActionEndpoint extends Endpoint {
	service: Service;
	action: ActionSchema;
}
export default ActionEndpoint;

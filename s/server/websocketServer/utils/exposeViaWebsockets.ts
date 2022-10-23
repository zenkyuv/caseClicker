import { userAction } from "../roomMechanics/userActions.js";
import { serverside } from "./serverside.js";
import WebSocket from "ws";
import { Data } from "../websocketModels/clientModel.js";

export const exposeViaWebsockets = (websocketConnection: WebSocket) => {
			websocketConnection.on("message", async (data, isBinary) => {
				const userData: Data = JSON.parse(data.toString())
				const serversideFunction = serverside[userData.action]
				if (serversideFunction) {
					try {
					await serversideFunction(userData.data, websocketConnection)
				} catch (err) {
					console.log(err)
				}
				}
			});
			websocketConnection.onclose = (event) => {
				try {
					userAction.removeUser(websocketConnection)
				} catch (err) {
					console.log(err)
				}
			}
			websocketConnection.onerror = (err) => {
				console.log(err)
			}
}
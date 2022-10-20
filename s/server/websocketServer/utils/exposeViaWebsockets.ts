import WebSocket from "ws";
import { userAction } from "../roomMechanics/userActions.js";
import { AddItem, Client, Data, RemoveItem } from "../websocketModels/clientModel.js";
import { serverside } from "./serverside.js";

export const exposeViaWebsockets = (websocketConnection: WebSocket) => {
			websocketConnection.on("message", async (data, isBinary) => {
				const userData = JSON.parse(data.toString())
				console.log(userData)
				console.log(userData.action)
			
					const serversideFunction = serverside[userData.action]
				console.log(serversideFunction)
				try {
					await serversideFunction(userData, websocketConnection)
				} catch (err) {
					console.log(err)
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
import { publicRoomCreators } from "./publicRoomCreators.js"
import { usersInLobby } from "./usersInLobby.js"
import { removeRoomCreator, removeRoomJoiner, roomCreatorAcceptedOffer, roomCreatorAddedItem, roomCreatorRemovedItem, roomJoinerAddedItem, roomJoinerAcceptedOffer, roomJoinerRemovedItem } from "./utils/userActionsUtils.js"
import WebSocket from "ws";
import { Item } from "../../../interfaces/sharedInterfaces.js";
class UserActions {
	removeItem(clientID: string, indexToRemove: number, userType: string) {
		if (userType == 'roomCreator') {
			roomCreatorRemovedItem(clientID, indexToRemove)
		}
		if (userType == 'roomJoiner') {
			roomJoinerRemovedItem(clientID, indexToRemove)
		}
	}
	addItem(clientID: string, selectedItem: Item, userType: string) {
		if (userType == 'roomCreator') {
			roomCreatorAddedItem(clientID, selectedItem)
		}
		if (userType == 'roomJoiner') {
			roomJoinerAddedItem(clientID, selectedItem)
		}
	}
	userAcceptedOffer(userType: string, clientID: string, websocketConnection: WebSocket) {
		if (userType == 'roomCreator') {
			roomCreatorAcceptedOffer(clientID, websocketConnection)
		}
		if (userType == 'roomJoiner') {
			roomJoinerAcceptedOffer(clientID, websocketConnection)
		}
	}
	removeUser(websocketConnection: WebSocket) {
		// find whether its room joiner or room creator to be removed based on websocket conenction
		const roomJoiner = [...usersInLobby.getType().values()].find(({ connection }) => connection == websocketConnection)
		const roomCreator = [...publicRoomCreators.getType().values()].find(({ clientConnection }) => clientConnection == websocketConnection)
		if (roomJoiner) {
			removeRoomJoiner(roomJoiner)
		} 
		if (roomCreator) {
			removeRoomCreator(roomCreator)
		}
	}
}

export const userAction = new UserActions()
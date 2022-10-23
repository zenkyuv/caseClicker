// as a user in lobby you only receive events that lobby creators do, until you joins one
// of public room, then you broadcast to that crator
import { UserInLobby } from "../websocketModels/roomMehanicsModel.js"
import { publicRoomCreators } from "./publicRoomCreators.js"
import WebSocket from "ws";
class UsersInLobby {
	#usersInLobby = new Map<string, UserInLobby>()
	addUserToLobby(clientID: string, userConnection: WebSocket) {
		this.#usersInLobby.set(clientID, {
			clientID: clientID,
			connection: userConnection,
			roomYouConnectedTo: undefined,
			connectedToRoom: false,
			selectedInventoryItems: [],
			offerAccepted: false
		})
		const data = { data: publicRoomCreators.getEmptyRooms(), action: 'refreshWithNewData' }
		userConnection.send(JSON.stringify(data))
	}
	getType() {
		return this.#usersInLobby
	}
	getUser(clientID: string) {
		return this.#usersInLobby.get(clientID)
	}
	youAreInRoom(clientID: string) {
		return this.#usersInLobby.get(clientID).connectedToRoom
	}
	isOfferAccepted(clientID: string) {
		return this.#usersInLobby.get(clientID).offerAccepted
	}
	setRoomUserConnectedTo(clientID: string, roomID: string) {
		const roomConnection = publicRoomCreators.roomConnection(roomID)
		this.#usersInLobby.set(clientID, {
			...this.#usersInLobby.get(clientID),
			roomYouConnectedTo: roomConnection,
			connectedToRoom: true
		})
	}
	joinPublicRoom(roomID: string, clientID: string, clientConnection: WebSocket) {
		publicRoomCreators.setUserWhoJoinedRoom(roomID, clientConnection)
		this.setRoomUserConnectedTo(clientID, roomID)
		publicRoomCreators.roomConnection(roomID).send(JSON.stringify({ action: 'userJoinedYourRoom' }))
		publicRoomCreators.broadcastMessageToEveryone(clientID, 'refreshWithNewData')
		publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
	}

	getAllUsers() {
		return [...this.#usersInLobby.values()].filter(({connectedToRoom}) => !connectedToRoom)
	}
	broadcastMessage(clientID: string, action: string) {
		const client = this.#usersInLobby.get(clientID)
		const data = { data: [...this.#usersInLobby.values()].find((client) => client.clientID == clientID), action: action }
		client.roomYouConnectedTo.send(JSON.stringify(data))
	}
}

export const usersInLobby = new UsersInLobby()
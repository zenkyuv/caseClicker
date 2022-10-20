// as a user in lobby you only receive changes that lobby creators do, until you joins one

import { publicRoomCreators } from "./publicRoomCreators.js"

// of public room, then you broadcast to that crator
class UsersInLobby {
	#usersInLobby = new Map<string, {
		clientID: string,
		connection: WebSocket,
		roomYouConnectedTo: WebSocket,
		connectedToRoom: boolean,
		inventory: any
	}>()
	addUserToLobby(clientID: string, userConnection: WebSocket) {
		this.#usersInLobby.set(clientID, {
			clientID: clientID,
			connection: userConnection,
			roomYouConnectedTo: undefined,
			connectedToRoom: false,
			inventory: []
		})
	}
	getType() {
		return this.#usersInLobby
	}
	getUser(clientID) {
		return this.#usersInLobby.get(clientID)
	}
	youAreInRoom(clientID) {
		return this.#usersInLobby.get(clientID).connectedToRoom
	}
	setRoomUserConnectedTo(clientID, roomID) {
		const roomConnection = publicRoomCreators.getYourRoom(roomID).clientConnection
		this.#usersInLobby.set(clientID, {
			...this.#usersInLobby.get(clientID),
			roomYouConnectedTo: roomConnection,
			connectedToRoom: true
		})
	}
	joinPublicRoom(roomID, clientID, clientConnection) {
		publicRoomCreators.setUserWhoJoinedRoom(roomID, clientConnection)
		this.setRoomUserConnectedTo(clientID, roomID)
		publicRoomCreators.getYourRoom(roomID).clientConnection.send(JSON.stringify({ action: 'userJoinedYourRoom' }))
		publicRoomCreators.broadcastMessageToEveryone(clientID, 'refreshWithNewData')
	}

	getAllUsers() {
		return [...this.#usersInLobby.values()].filter(({connectedToRoom}) => !connectedToRoom)
	}
	broadcastMessage(clientID) {
		const client = this.#usersInLobby.get(clientID)
		const data = { data: [...this.#usersInLobby.values()].find((client) => client.clientID == clientID), action: 'refreshWithNewData' }
		client.roomYouConnectedTo.send(JSON.stringify(data))
	}
}

export const usersInLobby = new UsersInLobby()
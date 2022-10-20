import { usersInLobby } from "./usersInLobby.js"

class PublicRoomCreators {
	#publicRoomCreators = new Map<string, {
		roomID: string,
		userWhoJoinedRoom: WebSocket,
		inventory: any,
		clientConnection: WebSocket,
		username: string,
		roomEmpty: boolean,
	}>()
	makeRoomEmpty(roomID) {
		this.#publicRoomCreators.set(roomID, {
			...this.#publicRoomCreators.get(roomID),
			userWhoJoinedRoom: undefined,
			roomEmpty: true
		})
	}
	getType() {
		return this.#publicRoomCreators
	}
	getAllRooms() {
		return this.#publicRoomCreators
	}
	getYourRoom(roomID: string) {
		return [...this.getAllRooms().values()].find((room) => room.roomID == roomID)
	}
	getRoomCreator(clientID) {
		return this.#publicRoomCreators.get(clientID)
	}
	getEmptyRooms() {
		return [...publicRoomCreators.getAllRooms().values()].filter(({roomEmpty}) => roomEmpty).map(({clientConnection, ...rest}) => rest)
	}
	userHasJoinedYourRoom(client) {
		return client?.userWhoJoinedRoom ? true : false
	}
	setUserWhoJoinedRoom(roomID, clientConnection) {
		this.#publicRoomCreators.set(roomID, {
			...this.#publicRoomCreators.get(roomID),
			userWhoJoinedRoom: clientConnection,
			roomEmpty: false
		})
	}
	addRoomCreator(roomID, clientConnection, username) {
		this.#publicRoomCreators.set(roomID, {
			roomID: roomID,
			userWhoJoinedRoom: undefined,
			inventory: [],
			clientConnection: clientConnection,
			username: username,
			roomEmpty: true,
		})
	}
	broadcastMessage(roomID, action) {
		let client = this.#publicRoomCreators.get(roomID)
		// if no user has joined your room then broadcast all things you do to users in lobby
		if (this.userHasJoinedYourRoom(client)) {
			// get only your room data instead all rooms
			const data = {data: this.getYourRoom(roomID), action: action}
			client.userWhoJoinedRoom.send(JSON.stringify(data))
		} else
		{
			const data = { data: this.getEmptyRooms(), action: action }
			usersInLobby.getAllUsers().forEach((client) => {
				client.connection.send(JSON.stringify(data))
			})
		}
	}
		broadcastMessageToEveryone(clientID, action) {
			const data = { data: this.getEmptyRooms(), action: action }
			usersInLobby.getAllUsers().forEach((client) => {
				client.connection.send(JSON.stringify(data))
			})
	}
}

export const publicRoomCreators = new PublicRoomCreators()
import { PublicRoomCreator } from "../websocketModels/roomMehanicsModel.js"
import { usersInLobby } from "./usersInLobby.js"
import WebSocket from "ws"
class PublicRoomCreators {
	#publicRoomCreators = new Map<string, PublicRoomCreator>()
	makeRoomEmpty(roomID: string) {
		this.#publicRoomCreators.set(roomID, {
			...this.#publicRoomCreators.get(roomID),
			userWhoJoinedRoom: undefined,
			roomEmpty: true,
			offerAccepted: false
		})
	}
	getType() {
		return this.#publicRoomCreators
	}
	getAllRooms() {
		return this.#publicRoomCreators
	}
	getYourRoomData(roomID: string) {
		return [...this.getAllRooms().values()].map(({clientConnection, userWhoJoinedRoom, ...rest}) => rest).find((room) => room.roomID == roomID)
	}
	clientConnection(roomID: string) {
		return this.#publicRoomCreators.get(roomID).userWhoJoinedRoom
	}
	roomConnection(roomID: string) {
		return this.#publicRoomCreators.get(roomID).clientConnection
	}
	getRoomCreator(roomID: string) {
		return this.#publicRoomCreators.get(roomID)
	}
	getEmptyRooms() {
		return [...publicRoomCreators.getAllRooms().values()].filter(({roomEmpty}) => roomEmpty).map(({clientConnection, ...rest}) => rest)
	}
	userHasJoinedYourRoom(client: PublicRoomCreator) {
		return client?.userWhoJoinedRoom ? true : false
	}
	isOfferAccepted(roomID: string) {
		return this.#publicRoomCreators.get(roomID).offerAccepted
	}
	setUserWhoJoinedRoom(roomID: string, clientConnection: WebSocket) {
		this.#publicRoomCreators.set(roomID, {
			...this.#publicRoomCreators.get(roomID),
			userWhoJoinedRoom: clientConnection,
			roomEmpty: false
		})
	}
	addRoomCreator(roomID: string, clientConnection: WebSocket, username: string) {
		this.#publicRoomCreators.set(roomID, {
			roomID: roomID,
			userWhoJoinedRoom: undefined,
			selectedInventoryItems: [],
			clientConnection: clientConnection,
			username: username,
			roomEmpty: true,
			offerAccepted: false
		})
		publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
	}
	broadcastMessage(roomID: string, action: string) {
		let client = this.#publicRoomCreators.get(roomID)
		if (this.userHasJoinedYourRoom(client)) {
			// get only room data from the room user joined in instead all rooms
			const data = {data: this.getYourRoomData(roomID), action: action}
			client.userWhoJoinedRoom.send(JSON.stringify(data))
		} else
		{
			// if no user has joined room then broadcast all events from this room to users in lobby
			this.broadcastMessageToEveryone(roomID, action)
		}
	}
		broadcastMessageToEveryone(clientID: string, action: string) {
			const data = { data: this.getEmptyRooms(), action: action }
			usersInLobby.getAllUsers().forEach((client) => {
				client.connection.send(JSON.stringify(data))
		})
	}
}

export const publicRoomCreators = new PublicRoomCreators()
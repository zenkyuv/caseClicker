import { publicRoomCreators } from "./publicRoomCreators.js"
import { usersInLobby } from "./usersInLobby.js"

class UserActions {
	removeItem(clientID, indexToRemove, type) {
		let client = type.get(clientID)
		const clientInventory = [...client.inventory]
		clientInventory.splice(indexToRemove, 1)
		type.set(clientID, {
			...type.get(clientID),
			inventory: clientInventory,
		})
	}

	addItem(clientID, selectedItem, type) {
		const client = type.get(clientID)
		const clientInventory = [...client.inventory]
		clientInventory.push(selectedItem)
		type.set(clientID, {
			...type.get(clientID),
			inventory: clientInventory,
		})
	}

	removeUser(websocketConnection) {
		const lobbyUser = [...usersInLobby.getType().values()].find(({ connection }) => connection == websocketConnection)
		const roomCreator = [...publicRoomCreators.getType().values()].find(({ clientConnection }) => clientConnection == websocketConnection)
		if (lobbyUser) {
			const clientID = lobbyUser.clientID
			const roomID = [...publicRoomCreators.getType().values()].find(({ clientConnection }) => clientConnection == lobbyUser.roomYouConnectedTo).roomID
			lobbyUser.roomYouConnectedTo.send(JSON.stringify({ action: "userLeftRoom" }))
			usersInLobby.getType().delete(clientID)
			publicRoomCreators.makeRoomEmpty(roomID)
			publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
		} 
		if (roomCreator) {
			const roomID = roomCreator.roomID
			const data = { data: publicRoomCreators.getEmptyRooms(), action: "userLeftRoom" }
			if (roomCreator.roomEmpty) {
				publicRoomCreators.getType().delete(roomID)
				publicRoomCreators.broadcastMessage(roomID, 'userLeftRoom')
			}
			if (!roomCreator.roomEmpty) {
				const userWhoJoinedRoom = publicRoomCreators.getYourRoom(roomID).userWhoJoinedRoom
				publicRoomCreators.getType().delete(roomID)
				userWhoJoinedRoom.send(JSON.stringify(data))
			}
		}
	}
}

export const userAction = new UserActions()
import { User } from "../../../mongoose/mongooseModels.js"
import { publicRoomCreators } from "../publicRoomCreators.js"
import { usersInLobby } from "../usersInLobby.js"

export const exchangeItems = (roomJoiner, roomCreator) => {
	User.findByIdAndUpdate(roomJoiner.clientID, {
		$push: {
		inventory: roomJoiner.receivedItems
			}
		}).exec((err, res) => console.log(err, res))
	User.findByIdAndUpdate(roomCreator.clientID, {
		$push: {
		inventory: roomCreator.receivedItems
		}
	}).exec((err, res) => console.log(err, res))
}


export const roomCreatorAcceptedOffer = (roomID, websocketConnection) => {
	const type = publicRoomCreators.getType()
	const userIsInRoom = !publicRoomCreators.getRoomCreator(roomID).roomEmpty
	const userID = [...usersInLobby.getType().values()].find(({ roomYouConnectedTo }) => roomYouConnectedTo == websocketConnection).clientID
	if (userIsInRoom) {
		type.set(roomID, {
			...type.get(roomID),
			offerAccepted: true
		})
		publicRoomCreators.broadcastMessage(roomID, 'userAcceptedOffer')
	}
	// every request check if both of the users offer are accepted, if yes then send items to these users, close room
	if (usersInLobby.isOfferAccepted(userID) && publicRoomCreators.isOfferAccepted(roomID)) {
		const roomJoiner = {
			clientID: userID,
			receivedItems: publicRoomCreators.getYourRoomData(roomID).selectedInventoryItems
		}
		const roomCreator = {
			clientID: roomID,
			receivedItems:usersInLobby.getUser(userID).selectedInventoryItems
		}
		exchangeItems(roomJoiner, roomCreator)
	}
}

export const roomJoinerAcceptedOffer = (clientID, websocketConnection) => {
	const type = usersInLobby.getType()
	const userIsInRoom = usersInLobby.getUser(clientID).connectedToRoom
	const roomID = [...publicRoomCreators.getType().values()].find(({ userWhoJoinedRoom }) => userWhoJoinedRoom == websocketConnection).roomID
	if (userIsInRoom) {
		type.set(clientID, {
			...type.get(clientID),
			offerAccepted: true
		})
		usersInLobby.broadcastMessage(clientID, "userAcceptedOffer")
	}
	// every request check if both of the users offer are accepted, if yes then send items to these users, close room
	if (usersInLobby.isOfferAccepted(clientID) && publicRoomCreators.isOfferAccepted(roomID)) {
		const roomJoiner = {
			clientID: clientID,
			receivedItems: publicRoomCreators.getYourRoomData(roomID).selectedInventoryItems
		}
		const roomCreator = {
			clientID: roomID,
			receivedItems:usersInLobby.getUser(clientID).selectedInventoryItems
		}
		exchangeItems(roomJoiner, roomCreator)
	}
}

export const removeRoomJoiner = (roomJoiner) => {
	const clientID = roomJoiner.clientID
	const roomID = [...publicRoomCreators.getType().values()].find(({ clientConnection }) => clientConnection == roomJoiner.roomYouConnectedTo).roomID
	roomJoiner.roomYouConnectedTo.send(JSON.stringify({ action: "userLeftRoom" }))
	usersInLobby.getType().delete(clientID)
	publicRoomCreators.makeRoomEmpty(roomID)
	publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
}

export const removeRoomCreator = (roomCreator) => {
	const roomID = roomCreator.roomID
	const data = { data: publicRoomCreators.getEmptyRooms(), action: "userLeftRoom" }
	if (roomCreator.roomEmpty) {
		publicRoomCreators.getType().delete(roomID)
		publicRoomCreators.broadcastMessage(roomID, 'userLeftRoom')
	}
	if (!roomCreator.roomEmpty) {
		const userWhoJoinedRoom = publicRoomCreators.clientConnection(roomID)
		publicRoomCreators.getType().delete(roomID)
		userWhoJoinedRoom.send(JSON.stringify(data))
	}
}

export const roomJoinerRemovedItem = (clientID, indexToRemove) => {
	const type = usersInLobby.getType()
	const client = type.get(clientID)
	const clientInventory = [...client.selectedInventoryItems]
	clientInventory.splice(indexToRemove, 1)
	type.set(clientID, {
		...client,
		selectedInventoryItems: clientInventory,
	})
	usersInLobby.broadcastMessage(clientID, 'refreshWithNewData')
}

export const roomJoinerAddedItem = (clientID, selectedItem) => {
	const type = usersInLobby.getType()
	const client = type.get(clientID)
	const clientInventory = [...client.selectedInventoryItems]
	clientInventory.push(selectedItem)
	type.set(clientID, {
		...type.get(clientID),
		selectedInventoryItems: clientInventory,
	})
	usersInLobby.broadcastMessage(clientID, 'refreshWithNewData')
}

export const roomCreatorRemovedItem = (roomID, indexToRemove) => {
	const type = publicRoomCreators.getType()
	const client = type.get(roomID)
	const clientInventory = [...client.selectedInventoryItems]
	clientInventory.splice(indexToRemove, 1)
	type.set(roomID, {
		...client,
		selectedInventoryItems: clientInventory,
	})
	publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
}

export const roomCreatorAddedItem = (roomID, selectedItem) => {
	const type = publicRoomCreators.getType()
	const client = type.get(roomID)
	const clientInventory = [...client.selectedInventoryItems]
	clientInventory.push(selectedItem)
	type.set(roomID, {
	...type.get(roomID),
		selectedInventoryItems: clientInventory,
	})
	publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
}
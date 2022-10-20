import { publicRoomCreators } from "../roomMechanics/publicRoomCreators.js"
import { userAction } from "../roomMechanics/userActions.js"
import { usersInLobby } from "../roomMechanics/usersInLobby.js"

export const serverside = {

	async userCreatedPublicTradeRoom({ roomID, username }, clientConnection) {
		publicRoomCreators.addRoomCreator(roomID, clientConnection, username)
		publicRoomCreators.broadcastMessage(roomID, 'refreshWithNewData')
  },

  async userAddedItemToTrade({selectedItem, clientID, userType}) {
		if (userType == 'roomCreator') {
			console.log('room creator')
			userAction.addItem(clientID, selectedItem, publicRoomCreators.getType())
			publicRoomCreators.broadcastMessage(clientID, 'refreshWithNewData')
		}
		if (userType == 'userFromLobby') {
			console.log('lobby user')
			userAction.addItem(clientID, selectedItem, usersInLobby.getType())
			usersInLobby.broadcastMessage(clientID)
		}
  },

	async userRemovedItemFromTrade({ indexToRemove, clientID, userType }) {
		if (userType == 'roomCreator') {
			userAction.removeItem(clientID, indexToRemove, publicRoomCreators.getType())
			publicRoomCreators.broadcastMessage(clientID, 'refreshWithNewData')
		}
		if (userType == 'userFromLobby') {
			userAction.removeItem(clientID, indexToRemove, usersInLobby.getType())
			usersInLobby.broadcastMessage(clientID)
		}
	},
	
	async createPrivateTradeLobby() {

	},

	async userJoinedPublicTradeLobby({clientID}, clientConnection) {
		const data = { data: publicRoomCreators.getEmptyRooms(), action: 'refreshWithNewData' }
		usersInLobby.addUserToLobby(clientID, clientConnection)
		clientConnection.send(JSON.stringify(data))
	},

	async joinPrivateTradeLobby() {

	},

	async userJoinedPublicTradeRoom({roomToConnectTo, clientID}, clientConnection) {
		usersInLobby.joinPublicRoom(roomToConnectTo, clientID, clientConnection)
	}
}
import { publicRoomCreators } from "../roomMechanics/publicRoomCreators.js"
import { userAction } from "../roomMechanics/userActions.js"
import { usersInLobby } from "../roomMechanics/usersInLobby.js"
import WebSocket from "ws";
import { UserAcceptedOffer, UserAddedItemToTrade, UserCreatedPublicTradeRoom, UserRemovedItemFromTrade, UserJoinedPublicTradeRoom, UserJoinedPublicTradeLobby } from "../websocketModels/clientModel.js";

export const serverside = {

	async userCreatedPublicTradeRoom({ roomID, username }: UserCreatedPublicTradeRoom, clientConnection: WebSocket) {
		publicRoomCreators.addRoomCreator(roomID, clientConnection, username)
  },

  async userAddedItemToTrade({selectedItem, clientID, userType}: UserAddedItemToTrade) {
		userAction.addItem(clientID, selectedItem, userType)
  },

	async userRemovedItemFromTrade({ indexToRemove, clientID, userType }: UserRemovedItemFromTrade) {
		userAction.removeItem(clientID, indexToRemove, userType)
	},
	
	async userAcceptedOffer({ userType, clientID }: UserAcceptedOffer, clientConnection: WebSocket) {
		userAction.userAcceptedOffer(userType, clientID, clientConnection)
	},

	async userJoinedPublicTradeLobby({clientID}: UserJoinedPublicTradeLobby, clientConnection: WebSocket) {
		usersInLobby.addUserToLobby(clientID, clientConnection)
	},

	async userJoinedPublicTradeRoom({roomToConnectTo, clientID}: UserJoinedPublicTradeRoom, clientConnection: WebSocket) {
		usersInLobby.joinPublicRoom(roomToConnectTo, clientID, clientConnection)
	}

	// async createPrivateTradeLobby() {

	// },

	// async joinPrivateTradeLobby() {

	// },

}
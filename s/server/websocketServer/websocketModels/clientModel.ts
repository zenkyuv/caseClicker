import { Item } from "../../../interfaces/sharedInterfaces"

export interface UserCreatedPublicTradeRoom {
	roomID: string,
	username: string
}

export interface UserAddedItemToTrade {
	selectedItem: Item,
	clientID: string,
	userType: "roomJoiner" | "roomCreator"
}

export interface UserRemovedItemFromTrade {
	indexToRemove: number,
	clientID: string,
	userType: "roomJoiner" | "roomCreator"
}

export interface CreatePrivateTradeLobby {

}

export interface UserAcceptedOffer {
	clientID: string,
	userType: string
}

export interface UserJoinedPublicTradeLobby {
	clientID: string,
}

export interface JoinPrivateTradeLobby {

}

export interface UserJoinedPublicTradeRoom {
	roomToConnectTo: string,
	clientID: string
}
export interface Data {
	data: UserCreatedPublicTradeRoom | UserJoinedPublicTradeLobby | UserJoinedPublicTradeLobby |
	UserAcceptedOffer | UserRemovedItemFromTrade | UserAddedItemToTrade,
	action?: "userCreatedPublicTradeRoom" | "userAddedItemToTrade" | "userRemovedItemFromTrade" 
	| "createPrivateTradeLobby" | "userAcceptedOffer" | "userJoinedPublicTradeLobby" 
	| "joinPrivateTradeLobby" | "userJoinedPublicTradeRoom"
}

import WebSocket from "ws";
import { Item } from "../../../interfaces/sharedInterfaces";

export interface UserInLobby {
	clientID: string,
	connection: WebSocket,
	roomYouConnectedTo: WebSocket,
	connectedToRoom: boolean,
	selectedInventoryItems: Item[],
	offerAccepted: boolean
}

export interface PublicRoomCreator {
	roomID: string,
	userWhoJoinedRoom: WebSocket,
	selectedInventoryItems: Item[],
	clientConnection: WebSocket,
	username: string,
	roomEmpty: boolean,
	offerAccepted: boolean
}
import WebSocket from "ws"

export interface Inventory {
	skin: string
}

export interface Client {
	clientID?: string,
	inventory?: Inventory[],
	room: 'publicRoom' | 'privateRoom' | 'publicLobby',
	clientConnection?: WebSocket,
	username?: string,
	roomEmpty?: boolean
}

export interface RemoveItem {
		indexToRemove: number,
		clientID: string
}

export interface AddItem {
	selectedItem: any,
	clientID: string
}

export interface Data {
		data: Client[],
		action?: 'refreshWithNewData'
}

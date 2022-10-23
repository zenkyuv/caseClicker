import { UserStore } from "../states-store/states/userStore"
import { Item} from "./sharedInterfaces"

export interface UserMoney {
	money: number
}

export interface UserData {
	email: string,
	password: string,
	username: string
}

export interface signUserInfo {
	userData: UserData,
	userStore: UserStore,
	setLoadingIndicator?: any
}

export interface skin {
	weapon: string,
	skinName: string,
	quality: string,
	image: any
}

export interface caseData {
	name: string,
	image: any,
	skins: skin[]
}

export interface coinFlipData {
	data: "You Lost!" | "You Won!",
	drawnCoin: number
}
	
export interface PublicRoomData {
	selectedInventoryItems: Item[]
	offerAccepted: boolean,
	roomEmpty: boolean,
	roomID: string,
	username: string
}

export interface ConnectedUserData {
	clientID: string,
	connectedToRoom: boolean,
	selectedInventoryItems: Item[],
	offerAccepted: boolean,
}

export interface RenderPanelArgs {
	onOpenHandler: any,
	userJoined: boolean,
	userType: 'roomCreator' | 'roomJoiner',
	data: ConnectedUserData | PublicRoomData,
	offerAccepted: any,
	setOfferAccepted: any
}
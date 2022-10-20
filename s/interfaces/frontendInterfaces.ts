import { ImageProps } from "react-native"
import { UserStore } from "../states-store/states/userStore"

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

interface skin {
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
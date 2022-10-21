import { BlurView } from "expo-blur"
import { useContext, useEffect, useState } from "react"
import { View, ScrollView, Text, Image, Pressable } from "react-native"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { getLocalStorageData } from "../../../helperFunctions/localStorageFunctions"
import UserStore from "../../../states-store/states/userStore"
import {styles} from "../../../styles/tradeLobbyStyles"
import { renderConnectedUserInventory } from "./renderConnectedUserInventory"
import { renderSelectedInventoryItems } from "./renderSelectedInventoryItems"
import { renderYourInventory } from "./renderYourInventory"
import { addItemToTrade, removeItremFromTrade } from "./utils"

const RenderTradePanel = (
	{onOpenHandler,
		userJoined,
		userType,
		connectedUserSelectedInventoryItems
	}
) => {
	console.log(onOpenHandler, userJoined)
	const userStore = useContext(UserStore)
	const [inventoryItems, setInventoryItems] = useState([])
	const [selectedInventoryItems, setSelectedInventoryItems] = useState([])
	// if userType is roomCreator then get data from the user that connected to your Lobby
	// if userType is userFromLobby then get data from room that you connected to
		useEffect(() => {
		const localStorageData = async () => {
			const data = await getLocalStorageData()
			if(data) setInventoryItems(data)
		}
		localStorageData()
	}, [])
	return(
		<View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				{renderYourInventory(
						inventoryItems,
						setInventoryItems,
						selectedInventoryItems,
						setSelectedInventoryItems,
						userStore.userUID,
						onOpenHandler,
						userType
			)}
				{
					renderSelectedInventoryItems(
						selectedInventoryItems,
						setSelectedInventoryItems,
						setInventoryItems,
						userStore.userUID,
						onOpenHandler,
						userJoined,
						connectedUserSelectedInventoryItems,
						userType,
					)}
		</View>)
}

export default RenderTradePanel
import { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import { getLocalStorageData } from "../../../helperFunctions/localStorageFunctions"
import { RenderPanelArgs } from "../../../interfaces/frontendInterfaces"
import { Item } from "../../../interfaces/sharedInterfaces"
import UserStore from "../../../states-store/states/userStore"
import { renderSelectedInventoryItems } from "./renderSelectedInventoryItems"
import { renderYourInventory } from "./renderYourInventory"

const RenderTradePanel = (
	{...args}: RenderPanelArgs
) => {
	const userStore = useContext(UserStore)
	const [inventoryItems, setInventoryItems] = useState<Item[]>([])
	const [selectedInventoryItems, setSelectedInventoryItems] = useState<Item[]>([])
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
					args
			)}
				{
					renderSelectedInventoryItems(
						selectedInventoryItems,
						setSelectedInventoryItems,
						setInventoryItems,
						userStore.userUID,
						args
					)}
		</View>)
}

export default RenderTradePanel
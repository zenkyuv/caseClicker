import { Dispatch, SetStateAction } from "react"
import { RenderPanelArgs } from "../../../interfaces/frontendInterfaces"
import { Item } from "../../../interfaces/sharedInterfaces"

export const addItemToTrade = (
	i: number,
	setInventoryItems: Dispatch<SetStateAction<Item[]>>,
	inventoryItems: Item[],
	setSelectedInventoryItems: Dispatch<SetStateAction<Item[]>>,
	selectedInventoryItems: Item[],
	onOpenHandler: (arg0: { action: string; clientID: any; selectedItem: any; userType: any }) => void,
	userUID: string,
	userType: string
) => {
		const inventoryItemsCopy = [...inventoryItems]
		const removedItem = inventoryItemsCopy.splice(i, 1)
		setInventoryItems(inventoryItemsCopy)
		const selectedItems = [...selectedInventoryItems]
		selectedItems.push(removedItem[0])
		setSelectedInventoryItems(selectedItems)
		const selectedItem = selectedItems?.[selectedItems.length - 1]
		onOpenHandler({ action: "userAddedItemToTrade", clientID: userUID, selectedItem: selectedItem, userType: userType})
}

export const removeItremFromTrade = (
	item: Item,
	i: number,
	selectedInventoryItems: Item[],
	setSelectedInventoryItems: Dispatch<SetStateAction<Item[]>>,
	setInventoryItems: Dispatch<SetStateAction<Item[]>>,
	userUID: string,
	{...args}: RenderPanelArgs
) => {
		const selectedInventoryItemsCopy = [...selectedInventoryItems]
		const removedItem = selectedInventoryItemsCopy.splice(i, 1)
		setInventoryItems((items) => [...items, removedItem[0]])
		setSelectedInventoryItems(selectedInventoryItemsCopy)
		args.onOpenHandler({ action: "userRemovedItemFromTrade", clientID: userUID, indexToRemove: i, userType: args.userType})
}

export const userAcceptedOffer = (userUID, {...args}: RenderPanelArgs) => {
	args.onOpenHandler({ action: "userAcceptedOffer", clientID: userUID, userType: args.userType})
}
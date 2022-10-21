export const addItemToTrade = (i: number,
	setInventoryItems,
	inventoryItems,
	setSelectedInventoryItems,
	selectedInventoryItems,
	onOpenHandler,
	userUID,
	userType
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
	item: any,
	i: number,
	selectedInventoryItems,
	setSelectedInventoryItems,
	setInventoryItems,
	userUID,
	onOpenHandler,
	userType
) => {
		if (item?.name) {
			const selectedInventoryItemsCopy = [...selectedInventoryItems]
			const removedItem = selectedInventoryItemsCopy.splice(i, 1)
			setInventoryItems((items) => [...items, removedItem[0]])
			setSelectedInventoryItems(selectedInventoryItemsCopy)
			onOpenHandler({ action: "userRemovedItemFromTrade", clientID: userUID, indexToRemove: i, userType: userType})
		}
}
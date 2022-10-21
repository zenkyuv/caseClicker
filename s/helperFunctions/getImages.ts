import { cases } from "../components/caseShop/cases"

export const getSkinsImagesFromAllConnectedUsers = (publicLobbies: any, firstIndex: number, secondIndex: number) => {
	if (publicLobbies?.length > 0) {
		const items = cases.map(({ skins }) => {
			return skins.filter(({ skinName }) => {
			return publicLobbies?.[firstIndex]?.inventory?.[secondIndex]?.name?.includes(skinName)
			
			})
		}).filter(arr => arr.length > 0).flat(5)
		return items[0]?.image
	} else return undefined
}

export const getYourSkinsImages = (inventoryItems: any, i: number) => {
	if (inventoryItems.length > 0) {
		const items = cases.map(({ skins }) => {
			return skins.filter(({ skinName }) => {
				return inventoryItems?.[i]?.name?.includes(skinName)
			})
		}).filter(arr => arr.length > 0).flat(5)
		return items[0]?.image
	} else return undefined
}
import { cases } from "../components/caseShop/cases"
import { PublicRoomData } from "../interfaces/frontendInterfaces"

export const getSkinsImagesFromAllConnectedUsers = (publicRooms: PublicRoomData[], firstIndex: number, secondIndex: number) => {
	if (publicRooms?.length > 0) {
		const items = cases.map(({ skins }) => {
			return skins.filter(({ skinName }) => {
			return publicRooms?.[firstIndex]?.selectedInventoryItems?.[secondIndex]?.name?.includes(skinName)
			
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
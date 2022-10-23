import { View, ScrollView, Text, Image, Pressable } from "react-native"
import {BlurView} from "expo-blur"
import {styles} from "../../../styles/tradeLobbyStyles"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { addItemToTrade } from "./utils"
import { RenderPanelArgs } from "../../../interfaces/frontendInterfaces"
import { Dispatch, SetStateAction } from "react"
import { Item } from "../../../interfaces/sharedInterfaces"

export const renderYourInventory = (
	inventoryItems: Item[],
	setInventoryItems: Dispatch<SetStateAction<Item[]>>,
	selectedInventoryItems: Item[],
	setSelectedInventoryItems: Dispatch<SetStateAction<Item[]>>,
	userUID: string,
	{...args}: RenderPanelArgs
) => {
	return(
	<>
		<BlurView tint="dark" style={{ flex: 1, height: '90%', margin: 5 }}>
		<Text>Your inventory:</Text>
		<ScrollView>
			<View style={styles.itemsContainer}>
				{inventoryItems?.map((item, i) => <Pressable style={styles.item} onPress={() => addItemToTrade(
					i, setInventoryItems, inventoryItems, setSelectedInventoryItems,
					selectedInventoryItems, args.onOpenHandler, userUID, args.userType)}>
					<BlurView style={styles.iconContainer} intensity={100}>
						<Image style={styles.icon} source={getYourSkinsImages(inventoryItems, i)} />
					</BlurView>
					<Text style={styles.itemText}>{item.name}</Text>
				</Pressable>)}
			</View>
				</ScrollView>
	</BlurView>
	</>)
}
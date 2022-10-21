import { View, ScrollView, Text, Image, Pressable } from "react-native"
import {BlurView} from "expo-blur"
import {styles} from "../../../styles/tradeLobbyStyles"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { addItemToTrade } from "./utils"

export const renderYourInventory = (
	inventoryItems,
	setInventoryItems,
	selectedInventoryItems,
	setSelectedInventoryItems,
	userUID,
	onOpenHandler,
	userType
) => {
	return(
	<>
		<BlurView tint="dark" style={{ flex: 1, height: '90%', margin: 5 }}>
		<Text>Your inventory:</Text>
		<ScrollView>
			<View style={styles.itemsContainer}>
				{inventoryItems?.map((item, i) => <Pressable style={styles.item} onPress={() => addItemToTrade(
					i, setInventoryItems, inventoryItems, setSelectedInventoryItems,
					selectedInventoryItems, onOpenHandler, userUID, userType)}>
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
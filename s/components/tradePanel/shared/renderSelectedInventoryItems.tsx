import { BlurView } from "expo-blur"
import { View, ScrollView, Text, Image, Pressable } from "react-native"
import { styles } from "../../../styles/tradeLobbyStyles"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { removeItremFromTrade } from "./utils"
import { renderConnectedUserInventory } from "./renderConnectedUserInventory"

export const renderSelectedInventoryItems = (
	selectedInventoryItems,
	setSelectedInventoryItems,
	setInventoryItems,
	userUID,
	onOpenHandler,
	userJoined,
	connectedUserSelectedInventoryItems,
	userType,
) => {
	return (
		<BlurView tint="dark" style={{ flex: 1, backgroundColor: 'red', height: '90%', margin: 5 }}>
	<Text>Selected items:</Text>
	<ScrollView>
		<View style={styles.itemsContainer}>
			{selectedInventoryItems?.map((item, i) => <Pressable style={styles.item} onPress={() => removeItremFromTrade(
				item, i, selectedInventoryItems, setSelectedInventoryItems, setInventoryItems, userUID, onOpenHandler, userType)}>
				<BlurView style={styles.iconContainer} intensity={100}>
					<Image style={styles.icon} source={getYourSkinsImages(selectedInventoryItems, i)} />
				</BlurView>
				<Text style={styles.itemText}>{item.name}</Text>
			</Pressable>)}
		</View>
			</ScrollView>
				{renderConnectedUserInventory(
						userJoined,
					connectedUserSelectedInventoryItems
				)}
	<View style={{ height: '20%', justifyContent: 'center', alignItems: 'center' }}>
		<Pressable style={{ height: '40%', width: '40%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
			<Text>Make Offer</Text>
		</Pressable>
	</View>
	</BlurView>)
}
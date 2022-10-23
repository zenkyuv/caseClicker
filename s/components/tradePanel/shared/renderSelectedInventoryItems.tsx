import { BlurView } from "expo-blur"
import { View, ScrollView, Text, Image, Pressable } from "react-native"
import { styles } from "../../../styles/tradeLobbyStyles"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { removeItremFromTrade, userAcceptedOffer } from "./utils"
import { renderConnectedUserInventory } from "./renderConnectedUserInventory"
import { RenderPanelArgs } from "../../../interfaces/frontendInterfaces"
import { Dispatch, SetStateAction } from "react"
import { Item } from "../../../interfaces/sharedInterfaces"

export const renderSelectedInventoryItems = (
	selectedInventoryItems: Item[],
	setSelectedInventoryItems: Dispatch<SetStateAction<Item[]>>,
	setInventoryItems: Dispatch<SetStateAction<Item[]>>,
	userUID: string,
	{...args}: RenderPanelArgs
) => {
	return (
		<BlurView tint="dark" style={{ flex: 1, backgroundColor: 'red', height: '90%', margin: 5 }}>
	<Text>Selected items:</Text>
	<ScrollView>
		<View style={styles.itemsContainer}>
			{selectedInventoryItems?.map((item, i) => <Pressable style={styles.item} onPress={() => removeItremFromTrade(
				item, i, selectedInventoryItems, setSelectedInventoryItems, setInventoryItems, userUID, args)}>
				<BlurView style={styles.iconContainer} intensity={100}>
					<Image style={styles.icon} source={getYourSkinsImages(selectedInventoryItems, i)} />
				</BlurView>
				<Text style={styles.itemText}>{item.name}</Text>
			</Pressable>)}
		</View>
			</ScrollView>
				{renderConnectedUserInventory(
						args,
				)}
	<View style={{ height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
				<Pressable disabled={args.userJoined && selectedInventoryItems?.length > 0 || args.data?.selectedInventoryItems?.length > 0 ? false : true} onPress={() => {
					args.userJoined ? userAcceptedOffer(userUID, args) : null, args.setOfferAccepted(prev => ({
						byYou: true,
						byConnectedUser: prev.byConnectedUser
		}))}} style={{ height: '40%', width: '40%', backgroundColor: args.userJoined && selectedInventoryItems?.length > 0 || args.data?.selectedInventoryItems?.length > 0 ? 'green' : 'gray', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
			<Text>Make Offer</Text>
		</Pressable>
		<View>
			<View style={{ width: 10, height: 10, borderWidth: 1, borderColor: 'green', borderRadius: 5, margin: 3, backgroundColor: args.offerAccepted.byYou ? 'green' : "red"}}></View>
			<View style={{width: 10, height: 10, borderWidth: 1, borderColor: 'green', borderRadius: 5, margin: 3, backgroundColor: args.offerAccepted.byConnectedUser ? 'green' : "red"}}></View>
		</View>
	</View>
	</BlurView>)
}
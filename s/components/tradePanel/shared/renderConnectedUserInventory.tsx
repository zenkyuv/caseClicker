import { BlurView } from "expo-blur"
import { View, ScrollView, Text, Image } from "react-native"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { styles } from "../../../styles/tradeLobbyStyles"

export const renderConnectedUserInventory = (userJoined, connectedUserSelectedInventoryItems) => {
	return(<>
		{userJoined ? <ScrollView>
			<Text>Connected user selected items:</Text>
					<View style={styles.itemsContainer}>
						{connectedUserSelectedInventoryItems.inventory?.map(({ name, price }, i) => <View style={styles.item}>
							<BlurView style={styles.iconContainer} intensity={100}>
								<Image style={styles.icon} source={getYourSkinsImages(connectedUserSelectedInventoryItems.inventory, i)} />
							</BlurView>
							<Text style={styles.itemText}>{name}</Text>
						</View>)}
					</View>
		</ScrollView>
			: <View style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}><Text>Waiting for user to join ...</Text></View>
		}
	</>)
}
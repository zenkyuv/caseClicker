import { BlurView } from "expo-blur"
import { View, ScrollView, Text, Image } from "react-native"
import { getYourSkinsImages } from "../../../helperFunctions/getImages"
import { RenderPanelArgs } from "../../../interfaces/frontendInterfaces"
import { styles } from "../../../styles/tradeLobbyStyles"

export const renderConnectedUserInventory = ({...args}: RenderPanelArgs) => {
	return(<>
		{args?.userJoined ? <ScrollView>
			<Text>Connected user selected items:</Text>
					<View style={styles.itemsContainer}>
						{args?.data?.selectedInventoryItems?.map(({ name, price }, i) => <View style={styles.item}>
							<BlurView style={styles.iconContainer} intensity={100}>
								<Image style={styles.icon} source={getYourSkinsImages(args?.data?.selectedInventoryItems, i)} />
							</BlurView>
							<Text style={styles.itemText}>{name}</Text>
						</View>)}
					</View>
		</ScrollView>
			: <View style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}><Text>Waiting for user to join ...</Text></View>
		}
	</>)
}
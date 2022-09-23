import { ScrollView } from "react-native";
import BlurView from "expo-blur/build/BlurView";
import {styles} from "../styles/inventoryStyles"
import { cases } from "../components/chestShop/cases"
import { useContext, useEffect, useState } from "react";
import UserStore from "../states-store/states/userStore";
import { Text, View, Image, Pressable } from "react-native"
import { sellItem } from "../userApiActions/userApiActions";
import { getLocalStorageData, removeAndGetLocalStorageData } from "../helperFunctions/getLocalStorageData";

const Inventory = () => {
const userStore = useContext(UserStore);
const [inventoryItems, setInventoryItems] = useState([])

	const getSkinImage = (i: number) => {
		if (inventoryItems.length > 0) {
			const items = cases.map(({ skins }) => {
				return skins.filter(({ skinName }) => {
					return inventoryItems?.[i]?.name?.includes(skinName)
				})
			}).filter(arr => arr.length > 0).flat(5)
			return items[0]
		} else return undefined
	}

	async function removeItemFromLocalStorage(index: number) {
		if (inventoryItems.length > 0) {
			const inventoryData = await removeAndGetLocalStorageData(index)
			setInventoryItems([...inventoryData])
		}
	}

	useEffect(() => {
		const localStorageData = async () => {
			const data = await getLocalStorageData()
			if(data) setInventoryItems(data)
		}
		localStorageData()
	}, [])

	return (
		<BlurView tint="dark" style={styles.container}>
		{<>
			<Text style={styles.text}>Inventory</Text>
			<ScrollView>
				<View style={styles.itemsContainer}>
					{inventoryItems?.map(({name, price}, i) =>
					<View style={styles.item}>
						<BlurView style={styles.iconContainer} intensity={100}>
							<Image style={styles.icon} source={getSkinImage(i)?.image} />
						</BlurView>
						<Text style={styles.itemText}>{name}</Text>
						<Pressable onPress={async () => {sellItem(userStore, name), await removeItemFromLocalStorage(i)}}>
							<Text style={styles.textSell}>Sell {price?.['24_hours'].average}$</Text>
						</Pressable>
					</View>)}
				</View>
			</ScrollView>
			</>}
		</BlurView>
)
}

export default Inventory
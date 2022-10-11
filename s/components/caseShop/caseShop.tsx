import { View, Text, Image, Pressable, ScrollView } from "react-native"
import { cases } from "./cases"
import { styles } from "../../styles/caseShopStyles"
import { useState } from "react"
import CaseOpener from "../caseOpener/caseOpener"
import { caseData } from "../../interfaces/frontendInterfaces"
import data from "./itemlist.json"

const caseShop = () => {
	const [caseOpener, setCaseOpener] = useState<{
		showCaseOpener: boolean,
		caseData: caseData
	}>({
		showCaseOpener: false,
		caseData: undefined
	})
	 

	function renderCases() {
		return cases.map(({ _id, image, skins }, i) =>
			<View key={i} style={styles.itemContainer}>
				<Image style={styles.image} source={image}></Image>
				<Text style={styles.caseText}>{_id?.split('_').join(' ')}</Text>
				<Pressable onPress={() =>
					setCaseOpener({
						showCaseOpener: true,
						caseData: { name: _id, image: image, skins: skins }
					})}>
					<Text style={styles.buyText}>Buy</Text>
				</Pressable>
		</View>)
	}
	return (
		caseOpener.showCaseOpener ? <CaseOpener {...caseOpener.caseData} />
			: <ScrollView>
			 	<View style={styles.container}>
					{renderCases()}
				</View>
			 </ScrollView>
	)
}

export default caseShop
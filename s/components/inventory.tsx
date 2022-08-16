import { Text, View, Image, Pressable } from "react-native"
import {styles} from "../styles/inventoryStyles"
import BlurView from "expo-blur/build/BlurView";
// import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from "react-native";
import { useState } from "react";
import CaseOpener from "./caseOpener";
const Inventory = () => {

const [showCaseOpener, setCaseOpener] = useState(false)

	const knife = {
		co: "knife",
		skin: "tooth",
		rzadkosc: "red",
		img: require("../images/knife.png")
	}
	const cases = {
		co: "case",
		skin: "tooth",
		rzadkosc: "red",
		img: require("../images/briefcase4.png")
	}

	function openCase(e:any) {
console.log(e)
	}

	const inven = [knife,knife,knife, knife, knife, knife, knife, knife, knife, knife, knife, cases]

	return(
		<BlurView style={styles.container}>
			{showCaseOpener ? <CaseOpener /> :
				<><Text style={styles.text}>Inventory</Text><ScrollView>
				<View style={styles.itemsContainer}>
						{inven.map(i => i.co == "case" ?
							<Pressable style={styles.item} onPress={(e) => setCaseOpener(true)}><View>
						<BlurView style={styles.iconContainer} intensity={100}><Image style={styles.icon} source={i.img} /></BlurView>
						<Text style={styles.itemText}>{i.co}</Text>
						<Text style={styles.itemText1}>{i.skin}</Text>
					</View></Pressable> :
						<View style={styles.item}>
							<BlurView style={styles.iconContainer} intensity={100}><Image style={styles.icon} source={i.img} /></BlurView>
							<Text style={styles.itemText}>{i.co}</Text>
							<Text style={styles.itemText1}>{i.skin}</Text>
						</View>)}
				</View>
			</ScrollView></>}
		
	</BlurView>
)
}

export default Inventory
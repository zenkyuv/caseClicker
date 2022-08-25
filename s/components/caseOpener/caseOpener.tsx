import { useEffect, useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import MarqueeView from "react-native-marquee-view"
import { styles } from "../../styles/caseOpenerStyles"
import openCase from "./openCase"
// import { Keyframe } from 'react-native-reanimated';
const CaseOpener = () => {
	const [showContainer, setContainer] = useState(false)
	interface Data  {
		name: string,
		age: number | null
	}
	const [data, setData] = useState<Data>({
		name: "",
		age: null
	})
const knife = {
		co: "knife",
		skin: "tooth",
		rzadkosc: "red",
		img: require("../../images/knife.png")
	}
	const cases = {
		co: "case",
		skin: "tooth",
		rzadkosc: "red",
		// img: require("../images/briefcase4.png")
	}

	function getData() {
		fetch("http://192.168.1.104:3000/home")
			.then(res => res.json())
			.then(data => { setData({ name: data.name, age: data.age }), console.log(data, "srala") })
			.catch(e => console.log(e))
	}
	function getOpenedCase() {
console.log("tui")
		//141.94.85.161
		fetch("http://192.168.1.106:3000/openCase", {
		// fetch("http://141.94.85.161:3000/openCase", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
		})
	}
const e = false
	const randomSkins = [knife, knife, knife, knife, knife, knife, knife, knife, knife, knife, knife]
	const renderCaseSkins = () => {
		return (
			<MarqueeView speed={0.5} delay={1000} style={styles.hideContainer}>
				<View style={styles.imagesContainer}>
					{randomSkins.map(s => <View style={styles.imageContainer}>
						<Image style={styles.image} source={s.img} />
					</View>)}
				</View>
			</MarqueeView>
		)
	}

	const renderCases = () => {
		<div style={styles.roulette}>
  <div style={styles["roulette-container"]}>
    <div style={styles.wrap}>
      <div style={styles.controller}></div>
    </div>
  </div>
</div>
	}

	return (
		<View>
			<Text>elo</Text>
			{showContainer ? renderCases() : null}
			<Pressable onPress={() => { setContainer(true), openCase() }}>
				<Text>Unlock Container</Text>
				{data.name ? <Text>{data.name}</Text> : null}
			</Pressable>
		</View>
)
}

export default CaseOpener
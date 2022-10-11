import { BlurView } from "expo-blur"
import { cases } from "../caseShop/cases"
import { useEffect, useRef, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "../../styles/caseOpenerStyles"
import { caseOpenerAnimation } from "./caseOpenerAnimation"
import { openCase } from "../../userApiActions/userApiActions"
import { caseData } from "../../interfaces/frontendInterfaces"
import { useComponentSize } from "../../customHooks/useComponentSize"
import { getSkinRarityFrontend } from "../../helperFunctions/getSkinRarity"
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native"

const CaseOpener = ({name, image, skins}: caseData) => {
	const [drawnSkin, setDrawnSkin] = useState(undefined)
	const [size, onLayout] = useComponentSize();
	const [imageSize, setImageSize] = useComponentSize()
	const [randomSkinsArray, setRandomSkinsArray] = useState([])
	const [animationFinished, setAnimationFinished] = useState(false)
	let openAnimationFirstView = useRef(new Animated.Value(500)).current

	useEffect(() => {
		if (drawnSkin) {
			setRandomSkinsArray(getRandomSkins(drawnSkin))
		}	
	}, [drawnSkin])

	const thisCase = cases.filter(({ _id }) => _id == name)[0]

	const getRandomSkins = (drawnSkin: any) => {
		const randomSkinsArray = [...thisCase.skins].sort(() => 0.5 - Math.random())
		for (let i = randomSkinsArray.length; i <= 34; i++) {
			const skinQuality = getSkinRarityFrontend()
			const shuffled = [...thisCase.skins].filter(({quality}) => quality == skinQuality).sort(() => 0.5 - Math.random()).slice(0, 1)
			randomSkinsArray.push(...shuffled)
		}
		randomSkinsArray[2] = drawnSkin
		const itemIndex = randomSkinsArray.indexOf(drawnSkin)
		return randomSkinsArray
	}

	const getDrawnSkinImage = () => {
		if (drawnSkin) {
				return skins.find(({skinName}) => drawnSkin.name.includes(skinName)).image
			}
	}

	const renderDrawnSkin = () => {
			return (
			<View style={styles[`drawnSkin_${drawnSkin.rarity}`]}>
				<Image style={styles.drawnSkinImage} source={getDrawnSkinImage()} />
				<Text>{drawnSkin.name}</Text>
					<Text style={styles.textContinue} onPress={() =>
						(setDrawnSkin(undefined), setAnimationFinished(false))}>
						Continue
					</Text>
			</View>
		)
	}

	const renderSkinOpener = () => {
			if (imageSize?.width && size?.width) {
				openAnimationFirstView.setValue(-Math.abs(size?.width) * 8)
				caseOpenerAnimation(openAnimationFirstView, imageSize?.width, setAnimationFinished)
			}

		return (
		<BlurView intensity={80} tint={'dark'} style={styles.blurView}>
				<View onLayout={onLayout} style={styles.openerContainer}>
					<View style={styles.middleLineContainer}>
								<View style={styles.middleLine}></View>
						</View>
					<Animated.View style={[{transform: [{translateX: openAnimationFirstView}]}, styles.animatedView]}>
						{randomSkinsArray?.map((item, index) => item?.image ?
							<LinearGradient
								colors={['#808080', '#808080', styles[`${item.quality}`].backgroundColor]}
								style={[styles.openerSkinImageContainer, styles[`skinImage_${item.quality}`]]}>
								<Image style={[styles.openerSkinImage]} source={item?.image} />
							</LinearGradient>
							: <LinearGradient
								colors={['#808080', '#808080', styles[`${item.rarity}`].backgroundColor]}
								style={[styles.openerSkinImageContainer, styles[`skinImage_${item.rarity}`]]}>
								<Image onLayout={setImageSize} style={[styles.openerSkinImage]} source={getDrawnSkinImage()} />
							</LinearGradient>)}
					</Animated.View>
				</View>
		</BlurView>
		)
	}

	return (
		<View style={styles.container}>
			{drawnSkin && !animationFinished
				? renderSkinOpener()
				: drawnSkin && animationFinished
					? renderDrawnSkin()
					: null}
			<Image style={styles.caseImage} source={image}></Image>
			<Pressable disabled={drawnSkin ? true : false} onPress={() => {openCase(name, setDrawnSkin)}}>
				<Text style={[styles.text, drawnSkin ? { backgroundColor: 'gray', color: 'white' } : null]}>
					Unlock Container
				</Text>
				</Pressable>
			<ScrollView>
					<View style={styles.skinsContainer}>
						{skins.map(({ skinName, image, quality }, i) =>
							<View key={i} style={styles.skinContainer}>
								<View style={styles.skinImageContainer}>
									<Image style={styles.skinImage} source={image} />
								</View>
							<View style={[styles.skinNameContainer, styles[`${quality}`]]}>
									<Text style={styles.skinName}>
										{skinName.split('|')[0]}
									</Text>
									<Text style={styles.skinName}>
										{skinName.split('|')[1]?.trim()}
									</Text>
							</View>
						</View>)}
					</View>
			</ScrollView>
		</View>
)
}

export default CaseOpener
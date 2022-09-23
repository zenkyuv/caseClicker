import { useCallback, useEffect, useRef, useState } from "react"
import { Animated, Easing, Image, Pressable, ScrollView, Text, View } from "react-native"
import { styles } from "../../styles/caseOpenerStyles"
import { getAuth } from "firebase/auth"
import { caseData } from "../../interfaces/frontendInterfaces"
import { BlurView } from "expo-blur"
import { cases } from "../chestShop/cases"
import { setLocalStorageData } from "../../helperFunctions/getLocalStorageData"
import { LinearGradient } from "expo-linear-gradient"
const CaseOpener = ({name, image, skins}: caseData) => {
	const [drawnSkin, setDrawnSkin] = useState(undefined)
	const [size, onLayout] = useComponentSize();
	let openAnimationFirstView = useRef(new Animated.Value(500)).current
	const [imageSize, setImageSize] = useComponentSize()
	const [randomSkinsArray, setRandomSkinsArray] = useState([])
	const [animationFinished, setAnimationFinished] = useState(false)
	const auth = getAuth();
	const firstViewAnimate = () => {
				function getRandomInt(min, max) {
    		min = Math.ceil(min);
    		max = Math.floor(max);
    		return Math.floor(Math.random() * (max - min + 1)) + min;
}

	Animated.sequence([
		Animated.timing(openAnimationFirstView, {
			toValue: 0 - getRandomInt(0, imageSize?.width),
			duration: 5000,
			easing:Easing.out(Easing.ease),
			useNativeDriver: true
			}),
		
		]).start(({finished}) => {
			if (finished) {
				setTimeout(() => {
						setAnimationFinished(true)
				}, 500)
					
			}
			
		})
	}
	useEffect(() => {
		if (drawnSkin) {
			setRandomSkinsArray(getRandomSkins(drawnSkin))
		}	
	}, [drawnSkin])

function useComponentSize() {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};


	const thisCase = cases.filter(({ _id }) => _id == name)[0]
	function addItemToLocalStorage(skin: string) {
		setLocalStorageData(skin, false)
}
	function openCase(caseName) {
		//141.94.85.161
		auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
  // Send token to your backend via HTTPS
					fetch(`http://141.94.85.161:3000/openCase?idToken=${idToken}&caseName=${caseName}`, {
		// fetch("http://141.94.85.161:3000/openCase", {
						method: "GET",
						headers: {
				"Content-type": "application/json"
			},
					}).then(res => res.json()).then(data => {
						setDrawnSkin(data), addItemToLocalStorage(data), console.log(data, "TUTAAAAAAAAAAAa")
					})
}).catch((error) => {
  console.log(error)
});
	}
	const getRandomSkins = (drawnSkin: any) => {
		function getSkinRarity() {
			function getRandomArbitrary() {
    return Math.round(Math.random() * (10000 - 0) + 0)
}
	//losuje liczbe od 0 do 1000 i na tej podstawie daje kolor skina
	const randomNumber = getRandomArbitrary()
	if (randomNumber < 7992) {
		return "Mil-Spec"
	} else if (randomNumber > 7992 && randomNumber < 9590) {
		return "Restricted"
	} else if (randomNumber > 9590 && randomNumber < 9910) {
		return "Classified"
	} else if (randomNumber > 9910 && randomNumber < 9974) {
		return "Covert"
	} else if (randomNumber > 9974 && randomNumber < 10000) { 
		return "Covert"
	}
	}
		const randomSkinsArray = [...thisCase.skins].sort(() => 0.5 - Math.random())
		for (let i = randomSkinsArray.length; i <= 34; i++) {
			const skinQuality = getSkinRarity()
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
				<Text style={styles.textContinue} onPress={() => (setDrawnSkin(undefined), setAnimationFinished(false))}>Continue</Text>
			</View>
		)
	}
	const renderSkinOpener = () => {
			if (imageSize?.width && size?.width) {
				openAnimationFirstView.setValue(-Math.abs(size?.width) * 8)
				firstViewAnimate()
			}

		return (
		<BlurView intensity={80} tint={'dark'} style={{height: '100%', width: '100%', position: 'absolute', zIndex: 2, alignItems: 'center'}}>
				<View onLayout={onLayout} style={styles.openerContainer}>
					<View style={{ position: 'absolute', height: '100%', width: '100%', alignSelf: 'center', borderWidth: 1 , zIndex: 5, justifyContent: 'center', alignItems: 'center' }}>
								<View style={{backgroundColor: 'red', width: 1, height: '100%'}}></View>
						</View>
					<Animated.View style={{transform: [{translateX: openAnimationFirstView}], height: 70,width: '100%', zIndex: 3, borderColor: 'red', borderWidth: 1, flexDirection: 'row', position: 'absolute'}}>
						{randomSkinsArray?.map((item, index) => item?.image ?
							<LinearGradient colors={['#808080', '#808080', styles[`${item.quality}`].backgroundColor]} style={[styles.openerSkinImageContainer, styles[`skinImage_${item.quality}`]]}>
								<Image style={[styles.openerSkinImage]} source={item?.image} />
							</LinearGradient>
							: <LinearGradient colors={['#808080', '#808080', styles[`${item.rarity}`].backgroundColor]} style={[styles.openerSkinImageContainer, styles[`skinImage_${item.rarity}`]]}>
								<Image onLayout={setImageSize} style={[styles.openerSkinImage]} source={getDrawnSkinImage()} />
							</LinearGradient>)}
					</Animated.View>
				</View>
		</BlurView>
		)
	}

	return (
		<View style={styles.container}>
			{drawnSkin && !animationFinished ? renderSkinOpener() : drawnSkin && animationFinished ? renderDrawnSkin(): null}
			<Image style={styles.caseImage} source={image}></Image>
			<Pressable disabled={drawnSkin ? true : false} onPress={() => {openCase(name)}}>
				<Text style={[styles.text, drawnSkin ? { backgroundColor: 'gray', color: 'white'} : null]}>Unlock Container</Text>
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
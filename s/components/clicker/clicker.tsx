	import { useEffect, useRef, useState } from "react";
	import { View, Image, Animated, Pressable, Text} from "react-native"
	import {styles} from "../../../styles/clickerStyles"
import MoneyAnimation from "./moneyAnimation";

const Clicker = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const shakeAnim = useRef(new Animated.Value(0)).current
	const [moneyArray, setMoneyArray] = useState([])
	const [earnedMoney, setEarnedMoney] = useState(0)
	const barFill = useRef(0)

	const animateCoin = (e) => {
		if (e == 'press') {
			Animated.timing(fadeAnim, {
				toValue: 0.9,
				duration: 200,
				useNativeDriver: true
			}).start(({ finished }) => {
				fadeAnim.setValue(1)
			
			});
		}
		else if (e == "longpress") {
			renderMoneyPopup()
			renderMoneyPopup()
			renderMoneyPopup()
			Animated.sequence([
			Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
			]).start((o) => {
				if (e == 'longpress' && o.finished) {
					animateCoin(e)
				}
			
		});
		}
		
	}
	
	useEffect(() => {
	// 	if (moneyArray.length > 30) {
	// 		setMoneyArray([])
	// }
		if (moneyArray.length > 0) {
			let timer = setTimeout(() => {
				setMoneyArray([])
			
			}, 400)
			return () => {
				console.log('sra')
			clearTimeout(timer)
		}
		} 
	
	}, [moneyArray])

	const stopShake = () => {
		shakeAnim.stopAnimation()
		}

	const renderMoneyPopup = () => {
		barFill.current += 1
		if (barFill.current == 100) {
			setMoneyArray([])
			barFill.current = 0
		}
		setMoneyArray((old) => [...old,
		<MoneyAnimation setEarnedMoney={setEarnedMoney} setMoneyArray={setMoneyArray} delay={moneyArray.length} />])
	}

	const an1 = {
		transform: [{ scale: fadeAnim }, { translateX: shakeAnim }],
		}

	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<Pressable onLongPress={() => {animateCoin("longpress"), renderMoneyPopup()}} onPressOut={stopShake}
					onPress={() => {animateCoin("press"),renderMoneyPopup()}}>
					<Animated.Image style={
						[styles.icon, an1]
					} source={require("../../../images/coin.png")} />
					{/* <Animated.Text style={[styles.moneyText, moneyAnimStyle]}>d</Animated.Text> */}
					
						{moneyArray.map((e,i) => e)}
					
				</Pressable>
				<View>
					<View style={styles.bar}>
						<Text style={styles.barText}>{earnedMoney.toFixed(1)}$</Text>
						<View style={[styles.filledBar, {width: barFill.current * 2}]}></View>
					</View>
				</View>
			</View>
		</View>
	)
	}

	export default Clicker
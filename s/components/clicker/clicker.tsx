import MoneyAnimation from "./moneyAnimation";
import { animateCoin } from "./animateCoin";
import {styles} from "../../styles/clickerStyles"
import UserStore from "../../states-store/states/userStore";
import { View, Animated, Pressable, Text} from "react-native"
import { addMoney } from "../../userApiActions/userApiActions";
import { useContext, useEffect, useRef, useState } from "react";

const Clicker = () => {
	const userStore = useContext(UserStore);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const shakeAnim = useRef(new Animated.Value(0)).current
	const [moneyArray, setMoneyArray] = useState([])
	const [earnedMoney, setEarnedMoney] = useState(0)
	const barFill = useRef(0)
	
	useEffect(() => {
		if (barFill.current == 100) {
			addMoney(userStore)
		}
	}, [barFill.current])
	
	useEffect(() => {
		if (moneyArray.length > 0) {
			let timer = setTimeout(() => {
				setMoneyArray([])}, 400)
			return () => {
			clearTimeout(timer)
			}
		} 
	
	}, [moneyArray])

	const stopShake = () => {
		shakeAnim.stopAnimation()
	}

	const renderMoneyPopup = () => {
		barFill.current += 1
		if (barFill.current == 101) {
			setMoneyArray([])
			barFill.current = 0
		}
		setMoneyArray((old) => [...old,
		<MoneyAnimation delay={moneyArray.length} />])
	}

	const animationStyle = {
		transform: [{ scale: fadeAnim }, { translateX: shakeAnim }],
		}

	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<Pressable onLongPress={() => { animateCoin("longpress", fadeAnim, shakeAnim, renderMoneyPopup), renderMoneyPopup() }}
					onPressOut={stopShake} onPress={() => {animateCoin("press", fadeAnim, shakeAnim, renderMoneyPopup),renderMoneyPopup()}}>
					<Animated.Image style={[styles.icon, animationStyle]} source={require("../../images/coin.png")} />
						{moneyArray.map((MoneyAnimation, i) => MoneyAnimation)}
				</Pressable>
			</View>
			<View>
				<View style={styles.bar}>
					<Text style={styles.barText}>{earnedMoney.toFixed(1)}$</Text>
					<View style={[styles.filledBar, {width: barFill.current * 2}]}></View>
				</View>
			</View>
		</View>
	)
	}

	export default Clicker
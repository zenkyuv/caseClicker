import { useEffect, useRef, useState } from "react"
import { Animated } from "react-native"
	import {styles} from "../../../styles/clickerStyles"


	//moze cos zrobic z promise ze jezeli jest fuiifilled to filtruje moneyarray i usuwa te zfulfillowane a reszte zostawia itd
const MoneyAnimation = ({setEarnedMoney, setMoneyArray, timeout, delay }: {setEarnedMoney?: any,setMoneyArray:any, delay?: any, timeout?: any }) => {
	console.log(delay)
	setEarnedMoney((money) => money += 0.56)
	const [visible, setVisible] = useState(true)
	const moneyAnim = useRef(new Animated.Value(0)).current
	const opacityAnim = useRef(new Animated.Value(1)).current
	const positionAnim = useRef(new Animated.Value(0)).current
		const [moneyPerClick, setMoneyPerClick] = useState(0.56)
			console.log(delay)
	console.log('started')
	Animated.parallel([
		Animated.timing(moneyAnim, {
		delay: 100 * delay,
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}),
		// Animated.sequence([
		// 	Animated.timing(opacityAnim, {delay: 100 * delay,toValue: 1, duration: 100, useNativeDriver: true }),
		// 	Animated.timing(opacityAnim, {delay: 100 * delay,toValue: 0, duration: 400, useNativeDriver: true }),
		// 	// Animated.timing(opacityAnim, {delay: 100 * delay, toValue: 0, duration: 100, useNativeDriver: true }),
		// 	// Animated.timing(moneyAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
		// 	// Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
		// 	])
		// Animated.timing(positionAnim, {
		// // delay: 100,
		// 	toValue: 10,
		// 	duration: 500,
		// 	useNativeDriver: true
		// })
	]).start(({ finished }) => {
		if (finished) {
				console.log('finished')
			moneyAnim.setValue(0)
			opacityAnim.setValue(0)
			// positionAnim.setValue(0)
			}

	})
	useEffect(() => {
		// setTimeout(() => setMoneyArray((arr) => arr.splice([])), 400)
		setTimeout(() => setVisible(false), 500)
	}, [])
	return <Animated.Text data-visible={visible} style={[styles.moneyText, { opacity: moneyAnim },
		{
			transform: [
				{translateY: moneyAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [150, 20]
				})},
				// {translateX: moneyAnim.interpolate({
				// 	inputRange: [0, 1],
				// 	outputRange: [Math.floor(Math.random() * 200) + 1, Math.floor(Math.random() * 200) + 1]
				// })}
			{translateX: Math.floor(Math.random() * 200) + 1}
			]
		}]}>0.56$</Animated.Text>
}

export default MoneyAnimation
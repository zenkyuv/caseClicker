import { useEffect, useRef, useState } from "react"
import { Animated } from "react-native"
import {styles} from "../../styles/clickerStyles"



const MoneyAnimation = ({timeout, delay }: {delay?: number, timeout?: any }) => {
	const [visible, setVisible] = useState(true)
	const moneyAnim = useRef(new Animated.Value(0)).current
	const opacityAnim = useRef(new Animated.Value(1)).current
	const [moneyPerClick, setMoneyPerClick] = useState(0.56)

	Animated.parallel([
		Animated.timing(moneyAnim, {
		delay: 100 * delay,
		toValue: 1,
		duration: 500,
		useNativeDriver: true
		}),
	]).start(({ finished }) => {
		if (finished) {
			moneyAnim.setValue(0)
			opacityAnim.setValue(0)
		}

	})
	useEffect(() => {
		setTimeout(() => setVisible(false), 500)
	}, [])

	return (
		<Animated.Text data-visible={visible} style={[styles.moneyText, { opacity: moneyAnim },
		{transform: [{translateY: moneyAnim.interpolate({inputRange: [0, 1], outputRange: [150, 20]})},
		{translateX: Math.floor(Math.random() * 120) + 1}]}]}>
			0.56$
		</Animated.Text>)
}

export default MoneyAnimation
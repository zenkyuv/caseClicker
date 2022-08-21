	import { useRef } from "react";
	import { View, Image, Animated, Pressable} from "react-native"
	import {styles} from "../styles/clickerStyles"

	const Clicker = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const shakeAnim = useRef(new Animated.Value(0)).current

	const Animation = (e) => {
		if (e == 'press') {
			Animated.timing(fadeAnim, {
				toValue: 0.95,
				duration: 200,
				useNativeDriver: true
			}).start(({ finished }) => {
				fadeAnim.setValue(1)
			
			});
		}
		else if(e == "longpress") {
			Animated.sequence([
			Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
			]).start((o) => {
				if (o.finished) {
					Animation(e)
				}
			
		});
		}
		
	}
	const stopShake = () => {
		shakeAnim.stopAnimation()
	}

	const an1 = {
		transform: [{ scale: fadeAnim}, { translateX: shakeAnim }],
	}

	return (
		<View style={styles.container}>
			<Pressable onLongPress={() => Animation("longpress")} onPressOut={stopShake}
				onPress={() => Animation("press")}>
				<Animated.Image style={
					[styles.icon, an1]
				} source={require("../images/coin.png")} />
			</Pressable>
		</View>
	)
	}

	export default Clicker
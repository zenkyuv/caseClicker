import { Animated } from "react-native";

export const animateCoin = (e: string, fadeAnim: Animated.Value | Animated.ValueXY | any, shakeAnim: Animated.Value | Animated.ValueXY, renderMoneyPopup: { (): void; (): void; (): void; }) => {
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
		]).start(({finished}) => {
			if (e == 'longpress' && finished) {
				animateCoin(e, fadeAnim, shakeAnim, renderMoneyPopup)
			}});
	}
}
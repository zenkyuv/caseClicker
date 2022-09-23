import { SetStateAction } from "react";
import { Animated, Easing } from "react-native";
import { getRandomInt } from "../../helperFunctions/getRandomInt";

export const caseOpenerAnimation = (openAnimationFirstView: Animated.Value | Animated.ValueXY, imageWidth: number, setAnimationFinished: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
	Animated.sequence([
		Animated.timing(openAnimationFirstView, {
			toValue: 0 - getRandomInt(0, imageWidth),
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
import { StyleSheet } from "react-native";
import { Animated } from "react-native";

export const styles = StyleSheet.create({
	hideContainer: {
		borderColor: "red",
		borderWidth: 1,
		width: 300,
		alignSelf: "center"
	},
	imagesContainer: {
		zIndex: 0,
		flexDirection: "row",
		justifyContent: "center",
		// overflow: "hidden"
	},
	imageContainer: {
		borderColor: 'black',
		borderWidth: 1,
		padding: 3
	},
	image: {
		width: 50,
		height: 50,
	},
	rouletteContainer: {
		height: 80,
		width: '100%',
	},
	roulette: {
		maxWidth: 1280,
		marginTop: 260,
	},
	controller: {},
	wrap: {}
})
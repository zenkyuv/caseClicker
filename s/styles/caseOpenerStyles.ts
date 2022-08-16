import { StyleSheet } from "react-native";

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
	}
})
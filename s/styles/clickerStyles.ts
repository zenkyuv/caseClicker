import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: 'center',
		flex: 1
	},
	icon: {
		height: 220,
		width: 220,
	},
	imgContainer: {
		// borderWidth: 1,
		// borderColor: 'red',
	},
	moneyText: {
		opacity: 0,
		position: 'absolute',
		// translateX: Math.floor(Math.random() * 10) + 1
	},
	cos: {
		flexDirection: 'column'
	},
	bar: {
		width: 202,
		height: 20,
		borderWidth: 1,
		borderRadius: 5,
		alignItems: 'flex-start'
	},
	filledBar: {
		width: 0,
		height: 18,
		backgroundColor: 'rgb(255, 167, 0)',
		borderRadius: 5
	},
	barText: {
		position: 'absolute',
		zIndex: 1,
		textAlign: "center",
		width: 202
	}
})
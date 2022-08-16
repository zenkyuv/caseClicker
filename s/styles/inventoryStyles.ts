import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 7,
		margin: 20,
		width: "70%",
	},
	text: {
		margin: 10,
		color: "white",
		fontWeight: "bold",
		position: "relative"
	},
	itemsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		
	},
	iconContainer: {
		borderLeftWidth: 3,
		borderColor: "red"
	},
	icon: {
		width: 80,
		height: 60,
		// borderColor: "red"
	},
	item: {
		flexBasis: "18%",
		margin: "1%",
		padding: "2%",
		alignItems: "flex-start"
		
	},
	textContainer: {
		height: 40,
		width: 100,
		position: "absolute"
	},
	itemText: {
		alignSelf: "flex-start",
		color: "white"
	},
	itemText1: {
		alignSelf: "flex-start",
		color: "rgba(255,255,255,.6)"
	}
});

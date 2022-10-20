import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
		container: {
		flex: 1,
		margin: 10,
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
		width: '90%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: '80%',
		height: 45,
	},
	item: {
		width: "25%",
		alignItems: 'center',
		justifyContent: 'space-between'
		
	},
	textContainer: {
		height: 40,
		width: 100,
		position: "absolute"
	},
	itemText: {
		color: "white",
		fontSize: 8,
		textAlign: 'center',
		height: 20
	},
	textSell: {
		color: 'yellow',
		fontSize: 8,
		padding: 4,
		borderRadius: 8,
		backgroundColor: '#ffff0082',
		margin: 5,
	}
})
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
		width: '80%',
		height: 50,
		borderLeftWidth: 3,
		borderColor: "red",
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: '80%',
		height: 40,
		// borderColor: "red"
	},
	item: {
		width: "20%",
		// margin: "1%",
		// padding: "2%",
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
		textAlign: 'center'
	},
	textSell: {
		color: 'yellow',
		fontSize: 8,
		padding: 4,
		borderRadius: 8,
		backgroundColor: '#ffff0082',
		margin: 5,
	}
});

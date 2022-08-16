import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: 'red',
		maxWidth: "10%",
		alignItems: "center",
	},
		image: {
			width: "80%",
			height: "10%",
			margin: 10
	},
	rank: {
		margin: 5,
		height: 30,
		width: 60
	},
	friends: {
		position: "absolute",
		justifyContent: "center",
		flex: 1,
		height: "100%"
	},
	info: {
		textAlign: "center",
		fontSize: 20,
		backgroundColor: "rgba(255,255,255,.6)",
		color: "gray",
		width: 30,
		height: 30,
		borderRadius: 20,
	}
});

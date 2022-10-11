import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: 'blue',
		maxWidth: "10%",
		minWidth: 50,
		alignItems: "center",
	},
	imageContainer: {
		height: 30,
		backgroundColor: 'rgb(24, 34, 57)',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
		image: {
			width: '60%',
			height: '70%',
			margin: 10
	},
	rank: {
		margin: 5,
		width: '63%',
		height: '5%',
	},
	infoContainer: {
		position: "absolute",
		justifyContent: "center",
		alignItems: 'center',
		textAlign: 'center',
		flex: 1,
		height: "100%"
	},
	info: {
		fontSize: 12,
		backgroundColor: "rgba(185, 185, 185, 0.6)",
		color: 'rgb(66, 66, 66)',
		width: 20,
		padding: 3,
		borderRadius: 20,
		alignSelf: 'center',
		textAlign: 'center'
	}
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: 'red',
		maxWidth: "12%",
		alignItems: "center"
	},
	elContainer: {
		width: "100%",
		alignItems: "center",
		height: 30,
		justifyContent: "center",
		backgroundColor: '#182239',
		// borderBottomWidth: 1,
		// borderBottomColor: "rgba(255,255,255,.5)"
},
	iconMain: {
		width: 60,
		height: 30,
	},
	icon: {
		width: 25,
		height: 25,
		marginTop: 20,
		marginBottom: 20,
		// filter: invert(80 %) sepia(50%) hue-rotate(120deg),
			
	},
	navTextCnt: {
		width: '100%',
		textAlign: 'center'
	},
	navText: {
		textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 12,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(90, 143, 210, 0.37)",
		width: '100%',
		color: '#5a8fd2'
	},
	text: {
		color: "rgba(255,255,255,.9)",
		fontWeight: "500",
		fontSize: 8
	},
	cnt: {
		width: '100%'
	}
});

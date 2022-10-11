import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	itemContainer: {
		width: '33%',
		alignItems: 'center',
		marginTop: 5,
		fontSize: 5,
		marginBottom: 10
	},
	image: {
		width: 100,
		height: 70,
	},
	caseText: {
		fontSize: 11,
		textAlign: 'center',
		color: 'white'
	},
	buyText: {
		color: 'yellow',
		paddingRight: 5,
		paddingLeft: 5,
		borderRadius: 10,
		backgroundColor: '#ffff0082',
	}
})
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	coinImage: {
		width: '23%',
		height: '40%'
	},
	selectBetContainer: {
		height: '15%',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	selectBetInputContainer: {
		flexDirection: 'row',
		alignItems: 'center' 
	},
	selecteBetInput: {
		width: '10%', 
		height: 15,
		backgroundColor: 'blue',
		borderRadius: 3,
		marginLeft: 5 
	},
	flipTextContainer: {
		borderRadius: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 3,
		paddingTop: 3,
		margin: 10
	},
	coinButtonsContainer: {
		width: '100%',
		height: '40%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	coinButtonContainerLeft: {
		flex: 1,
		alignItems: 'flex-end'
	},
	coinButtonContainerRight: {
		flex: 1,
		alignItems: 'flex-start'
	},
	coinButtonContainerImage: {
		width: '50%',
		height: '70%'
	},
	buttonBlurContainerLeft: {
		width: '40%',
		height: '60%',
		backgroundColor: 'blue',
		borderTopLeftRadius: 40,
		borderBottomLeftRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 5,
		borderColor: 'rgba(255,255,128, 0.3)'
	},
	buttonBlurContainerRight: {
		width: '40%',
		height: '60%',
		backgroundColor: 'yellow',
		borderTopRightRadius: 40,
		borderBottomRightRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 5,
		borderColor: 'rgba(255,128,55, 0.4)'
	}
})
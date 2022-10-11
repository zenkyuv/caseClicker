import { StyleSheet } from "react-native";
import { Animated } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	text: {
		color: 'yellow',
		padding: 4,
		borderRadius: 10,
		backgroundColor: '#ffff0082',
		margin: 10
	},
	textContinue: {
		color: 'yellow',
		padding: 4,
		borderRadius: 10,
		backgroundColor: '#ffff0082',
		margin: 10
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
	},
	blurView: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		zIndex: 2,
		alignItems: 'center'
	},
	openerContainer: {
		position: 'absolute',
		top: '20%',
		flex: 1,
		width: '80%',
		height: '100%',
		flexDirection: 'row',
		zIndex: 2,
		alignItems: 'flex-start',
		overflow: 'hidden',
		maxHeight: 70,
	},
	middleLineContainer: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		alignSelf: 'center',
		borderWidth: 1,
		zIndex: 5,
		justifyContent: 'center',
		alignItems: 'center' 
	},
	middleLine: {
		backgroundColor: 'red',
		width: 1,
		height: '100%'
	},
	animatedView: {
		height: 70,
		width: '100%',
		zIndex: 3,
		borderColor: 'red',
		borderWidth: 1,
		flexDirection: 'row',
		position: 'absolute'
	},
	caseImage: {
		width: 170,
		height: 140
	},
	skinsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 5,
		height: 450,
		// width: '100%'
	},
	skinContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%',
		height: '25%',
	},
	skinImageContainer: {
		width: '90%',
		height: '60%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(128, 128, 128, 0.2)'
	},
	skinImage: {
		width: '70%',
		height: '60%'
	},
	drawnSkinImage: {
		height: 100,
		width: 150
	},
	skinNameContainer: {
		height: 20,
		width: '90%',
		justifyContent: 'flex-end',
	},
	openerSkinImageContainer: {
		width: '25%',
		maxHeight: 70
	},
	openerSkinImage: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
	},
	skinName: {
		fontSize: 6,
		textAlign: 'left',
	},
	'skinImage_Mil-Spec': {
		borderBottomWidth: 5,
		borderBottomColor: '#4b69ff',
		borderTopWidth: 1,
		borderTopColor: '#808080'
	},
	'skinImage_Restricted': {
		borderBottomWidth: 5,
		borderBottomColor: 'rgb(136, 71, 255)',
		borderTopWidth: 1,
		borderTopColor: '#808080'
	},
	'skinImage_Covert': {
		borderBottomWidth: 5,
		borderBottomColor: 'rgb(235, 75, 75)',
		borderTopWidth: 1,
		borderTopColor: '#808080'
	},
	'skinImage_Classified': {
		borderBottomWidth: 5,
		borderBottomColor: 'rgb(211, 44, 230)',
		borderTopWidth: 1,
		borderTopColor: '#808080'
	},
	Restricted: {
		backgroundColor: '#8847ff',
	},
	Covert: {
		backgroundColor: '#eb4b4b'
	},
	Classified: {
		backgroundColor: '#d32ce6'
	},
	'Mil-Spec': {
		backgroundColor: '#4b69ff'
	},
		'Mil-Spec Grade': {
		backgroundColor: '#4b69ff',
	},
	'drawnSkin_Mil-Spec Grade': {
		top: '10%',
		position: 'absolute',
		backgroundColor: 'rgba(75, 105, 255, 0.9)',
		zIndex: 10,
		height: '50%',
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	'drawnSkin_Restricted': {
		top: '10%',
		position: 'absolute',
		backgroundColor: 'rgba(136, 71, 255, 0.9)',
		zIndex: 1,
		height: '50%',
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	'drawnSkin_Covert': {
		top: '10%',
		position: 'absolute',
		backgroundColor: 'rgba(235, 75, 75, 0.9)',
		zIndex: 1,
		height: '50%',
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	'drawnSkin_Classified': {
		top: '10%',
		position: 'absolute',
		backgroundColor: 'rgba(211, 44, 230, 0.9)',
		zIndex: 1,
		height: '50%',
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center'
	}
})
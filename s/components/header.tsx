import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { View, Text } from "react-native"
import UserStore from "../states-store/states/userStore";
import { second, styles } from "../styles/headerStyles"
import AnimatedNumbers from 'react-native-animated-numbers';
import AnimateNumber from 'react-native-animate-number'

const Header = observer(() => {
	const userStore = useContext(UserStore);
	const [onAnimation, setOnAnimation] = useState(false)
	return (
		<View style={styles.container}>
			<AnimateNumber
				onProgress={() => setOnAnimation(true)}
				onFinish={() => setTimeout(() => {
					setOnAnimation(false)
					second(500)
				}, 0)}
				timing="easeOut"
				style={onAnimation ? { ...styles.textGreen, opacity: '' } : styles.text}
				value={userStore?.money?.toFixed(2)}
				formatter={(val) => {
				return '$ ' + parseFloat(val).toFixed(2)
			}} />
		</View>
	)
})

export default Header
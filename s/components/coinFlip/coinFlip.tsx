import { useContext, useState } from "react"
import { View, Text, Pressable, Image, TextInput } from "react-native"
import { BlurView } from "expo-blur";
import { getIdToken, getMoney } from "../../userApiActions/userApiActions";
import UserStore from "../../states-store/states/userStore";
import { coinFlipData } from "../../interfaces/frontendInterfaces";
import { styles } from "../../styles/coinFlipStyles";

const CoinFlip = () => {
	const [winnerCoin, setWinnerCoin] = useState<null | coinFlipData>(null)
	const [selectedCoin, setSelectedCoin] = useState(1)
	const [number, onChangeNumber] = useState(null)
	const [gameStarted, setGameStarted] = useState(false)
	const userStore = useContext(UserStore);
	const flip = () => {
		if (number) {
			setGameStarted(true)
			setTimeout(() => {
getIdToken().then((idToken: string) => {
				fetch(`http://141.94.85.161:3000/coinFlip?idToken=${idToken}&selectedCoin=${selectedCoin}&betAmount=${number}`, {
					method: "GET",
					headers: {
				"Content-type": "application/json"
			}
				}).then(res => res.json()).then((data:coinFlipData) => { setWinnerCoin(data), getMoney(userStore), setSelectedCoin(data.drawnCoin), setGameStarted(false) })
			})
			}, 3000)
		}
	}
	return (
		<View style={styles.container}>
				{gameStarted
					? <Image style={styles.coinImage} source={require("../../images/coinflip.webp")} />
					: <Image style={styles.coinImage} source={selectedCoin == 1 ? require("../../images/coinflip-ct.webp") : selectedCoin == 0 ? require("../../images/coinflip-tt.webp") : require("../../images/coinflip-ct.webp")} />}
			<View style={styles.selectBetContainer}>
				<View style={styles.selectBetInputContainer}>
					<Text>Select your bet:</Text>
					<TextInput style={styles.selecteBetInput} onChangeText={onChangeNumber} value={number} keyboardType="numeric" />
				</View>
				{winnerCoin
					? <Text style={{ color: winnerCoin.data == "You Lost!" ? 'red' : 'green' }}>
					{winnerCoin.data}
					</Text>
					: null}
				<Pressable onPress={() => flip()} style={[{ backgroundColor: number ? 'green' : 'gray' }, styles.flipTextContainer]}>
					<Text>Flip</Text>
				</Pressable>
			</View>
			<View style={styles.coinButtonsContainer}>
			<Pressable style={styles.coinButtonContainerLeft} onPress={() => setSelectedCoin(1)}>
					<BlurView intensity={30} tint={selectedCoin == 1 ? 'dark' : 'light'} style={styles.buttonBlurContainerLeft}>
						<Image style={styles.coinButtonContainerImage} source={require("../../images/coinflip-ct.webp")} />
					</BlurView>
			</Pressable>
				<Pressable style={styles.coinButtonContainerRight} onPress={() => setSelectedCoin(0)}>
					<BlurView intensity={30} tint={selectedCoin == 0 ? 'dark' : 'light'} style={styles.buttonBlurContainerRight}>
						<Image style={styles.coinButtonContainerImage} source={require("../../images/coinflip-tt.webp")} />
					</BlurView>
				</Pressable>
			</View>
			{/* <Image style={{ width: '28%', height: '50%' }} source={require("../../images/coinflip-tt.webp")} />
			<Image style={{width: '28%', height: '50%'}} source={require("../../images/coinflip-ct.webp")} /> */}
			
</View>
	)
}

export default CoinFlip
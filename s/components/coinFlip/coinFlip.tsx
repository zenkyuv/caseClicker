import { useContext, useEffect, useRef, useState } from "react"
import { View, Text, Dimensions, Pressable, Image, TextInput } from "react-native"
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { LineChart, ProgressChart, ContributionGraph } from "react-native-chart-kit"
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import AnimateNumber from 'react-native-animate-number'
import { BlurView } from "expo-blur";
import { getIdToken, getMoney } from "../../userApiActions/userApiActions";
import UserStore from "../../states-store/states/userStore";
import { coinFlipData } from "../../interfaces/frontendInterfaces";


export function getCrashPoint() {
	const e = 2**32
	const h = crypto.getRandomValues(new Uint32Array(1))[0]
	return Math.floor((100*e-h) / (e-h)) / 100
}


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
				}).then(res => res.json()).then((data:coinFlipData) => { console.log(data), setWinnerCoin(data), getMoney(userStore), setSelectedCoin(data.drawnCoin), setGameStarted(false) })
			})
			}, 3000)
		}
		console.log(Math.floor(Math.random()*2))
	}
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
				{gameStarted
					? <Image style={{ width: '23%', height: '40%' }} source={require("../../images/coinflip.webp")} />
					: <Image style={{ width: '23%', height: '40%' }} source={selectedCoin == 1 ? require("../../images/coinflip-ct.webp") : selectedCoin == 0 ? require("../../images/coinflip-tt.webp") : require("../../images/coinflip-ct.webp")} />}
			<View style={{height: '15%', alignItems: 'center', justifyContent: 'space-between'}}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}><Text>Select your bet:</Text><TextInput style={{ width: '10%', height: 15, backgroundColor: 'blue', borderRadius: 3, marginLeft: 5 }} onChangeText={onChangeNumber} value={number} keyboardType="numeric" /></View>
				{winnerCoin ? <Text style={{color: winnerCoin.data == "You Lost!" ? 'red' : 'green'}}>{winnerCoin.data}</Text> : null}
				<Pressable onPress={() => flip()} style={{backgroundColor: number ? 'green' : 'gray', borderRadius: 5, paddingLeft: 15, paddingRight: 15, paddingBottom: 3, paddingTop: 3, margin: 10}}><Text>Flip</Text></Pressable>
			</View>
			<View style={{width: '100%', height: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
			<Pressable style={{flex: 1, alignItems: 'flex-end',}} onPress={() => setSelectedCoin(1)}>
					<BlurView intensity={30} tint={selectedCoin == 1 ? 'dark' : 'light'} style={{ width: '40%', height: '60%', backgroundColor: 'blue', borderTopLeftRadius: 40, borderBottomLeftRadius: 40, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 5, borderColor: 'rgba(255,255,128, 0.3)' }}>
						<Image style={{width: '50%', height: '70%'}} source={require("../../images/coinflip-ct.webp")} />
					</BlurView>
			</Pressable>
				<Pressable style={{flex: 1, alignItems: 'flex-start'}} onPress={() => setSelectedCoin(0)}>
					<BlurView intensity={30} tint={selectedCoin == 0 ? 'dark' : 'light'} style={{ width: '40%', height: '60%', backgroundColor: 'yellow', borderTopRightRadius: 40, borderBottomRightRadius: 40, alignItems: 'center', justifyContent: 'center',borderRightWidth: 5, borderColor: 'rgba(255,128,55, 0.4)'}}>
						<Image style={{width: '50%', height: '70%'}} source={require("../../images/coinflip-tt.webp")} />
					</BlurView>
				</Pressable>
			</View>
			{/* <Image style={{ width: '28%', height: '50%' }} source={require("../../images/coinflip-tt.webp")} />
			<Image style={{width: '28%', height: '50%'}} source={require("../../images/coinflip-ct.webp")} /> */}
			
</View>
	)
}

export default CoinFlip
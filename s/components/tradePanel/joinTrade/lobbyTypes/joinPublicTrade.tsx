import { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native"
import UserStore from "../../../../states-store/states/userStore";
import { useSession } from "../../../../customHooks/websocketUtils";
import { cases } from "../../../caseShop/cases"
import { getUsername } from "../../../../helperFunctions/localStorageFunctions";
import { BlurView } from "expo-blur";
import { joinPublicTradeRoom, onclose, onmessage, onopen } from "../utils/utils";
import { getSkinsImagesFromAllConnectedUsers } from "../../../../helperFunctions/getImages";
import TradePanel from "../../tradePanel";
import RenderTradePanel from "../../shared/renderTradePanel";
const JoinPublicTrade = () => {
	const userStore = useContext(UserStore)
	const [publicLobbies, setPublicLobbies] = useState<any>([])
	const [connectedUserSelectedInventoryItems, setConnectedUserSelectedInventoryItems] = useState([])
	const onOpenHandler = (data) => {onopen(data, sendMessage)}
	const onMessageHandler = (event: MessageEvent) => {onmessage(event, setPublicLobbies, setConnectedUserSelectedInventoryItems, setUserJoined)}
	const onCloseHandler = () => {onclose()}
	const [connect, sendMessage, closeConn] = useSession(
		onOpenHandler,onMessageHandler, onCloseHandler, userStore.userUID
	)
	const [userJoined, setUserJoined] = useState(false)
	useEffect(() => {
		connect({ action: "userJoinedPublicTradeLobby", clientID: userStore.userUID, userType: 'userFromLobby' })
	}, [])
	console.log(publicLobbies)
	return (
		<>
			{userJoined ? <RenderTradePanel connectedUserSelectedInventoryItems={connectedUserSelectedInventoryItems} userType={"userFromLobby"} userJoined={userJoined} onOpenHandler={onOpenHandler} /> : <View style={{flex: 1, margin: 10, overflow: 'hidden'}}>
				{publicLobbies?.map(({ roomID, inventory, username }, firstIndex) =>
					<BlurView tint="dark" style={{ flexDirection: 'row', height: '20%', marginBottom: 10, zIndex: 2}} key={firstIndex}>
						<View style={{alignItems: 'center', flex: 2}}>
							<Image style={{width: '100%', height: '70%'}} source={require("../../../../images/profile-img.jpg")} />
							<Text style={{color: 'white', width: '100%', height: '100%', backgroundColor: 'black', textAlign: 'center'}}>{username}</Text>
						</View>
						<View style={{flexDirection: 'row', flex: 5, height: '100%', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
							{inventory.map((_cos, secondIndex) => (
								<View style={{width: '20%', height: '70%', justifyContent: 'center', alignItems: 'center'}} key={secondIndex}>
									<Image resizeMode="center" style={{width: '100%', height: '100%'}} source={getSkinsImagesFromAllConnectedUsers(publicLobbies, firstIndex, secondIndex)} />
								</View>
							))}
						</View>
						<Pressable onPress={() => {joinPublicTradeRoom(roomID, userStore.userUID, sendMessage), setUserJoined(true)}} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
							<Text>Join</Text>
						</Pressable>
					</BlurView>)}
			</View>}
		</>
	)
}

export default JoinPublicTrade
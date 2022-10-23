import { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native"
import UserStore from "../../../../states-store/states/userStore";
import { useSession } from "../../../../customHooks/websocketUtils";
import { BlurView } from "expo-blur";
import { joinPublicTradeRoom, onclose, onmessage, onopen } from "../utils/utils";
import { getSkinsImagesFromAllConnectedUsers } from "../../../../helperFunctions/getImages";
import RenderTradePanel from "../../shared/renderTradePanel";
import { PublicRoomData } from "../../../../interfaces/frontendInterfaces";
const JoinPublicTrade = () => {
	const userStore = useContext(UserStore)
	const [publicRooms, setPublicRooms] = useState<PublicRoomData[]>()
	const [connectedRoomData, setConnectedRoomData] = useState<PublicRoomData>()
	const [offerAccepted, setOfferAccepted] = useState({
		byYou: false,
		byConnectedUser: false
	})
	const onOpenHandler = (data) => {onopen(data, sendMessage)}
	const onMessageHandler = (event: MessageEvent) => {onmessage(event, setPublicRooms, setConnectedRoomData, setUserJoined, setOfferAccepted)}
	const onCloseHandler = () => {onclose()}
	const [connect, sendMessage, closeConn] = useSession(
		onOpenHandler,onMessageHandler, onCloseHandler, userStore.userUID
	)
	const [userJoined, setUserJoined] = useState(false)
	useEffect(() => {
		connect({ action: "userJoinedPublicTradeLobby", clientID: userStore.userUID })
	}, [])

	return (
		<>
			{userJoined
				? <RenderTradePanel
					offerAccepted={offerAccepted}
					setOfferAccepted={setOfferAccepted}
					data={connectedRoomData}
					userType={"roomJoiner"}
					userJoined={userJoined}
					onOpenHandler={onOpenHandler} />
				: <View style={{ flex: 1, margin: 10, overflow: 'hidden' }}>
				{publicRooms?.map(({ roomID, selectedInventoryItems, username }, firstIndex) =>
					<BlurView tint="dark" style={{ flexDirection: 'row', height: '20%', marginBottom: 10, zIndex: 2}} key={firstIndex}>
						<View style={{alignItems: 'center', flex: 2}}>
							<Image style={{width: '100%', height: '70%'}} source={require("../../../../images/profile-img.jpg")} />
							<Text style={{color: 'white', width: '100%', height: '100%', backgroundColor: 'black', textAlign: 'center'}}>{username}</Text>
						</View>
						<View style={{flexDirection: 'row', flex: 5, height: '100%', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
							{selectedInventoryItems.map((_cos, secondIndex) => (
								<View style={{width: '20%', height: '70%', justifyContent: 'center', alignItems: 'center'}} key={secondIndex}>
									<Image resizeMode="center" style={{width: '100%', height: '100%'}} source={getSkinsImagesFromAllConnectedUsers(publicRooms, firstIndex, secondIndex)} />
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
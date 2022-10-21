import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image } from "react-native"
import UserStore from "../../../../states-store/states/userStore";
import { BlurView } from "expo-blur";
import  {onopen, onmessage, onclose}  from "../utils/utils"
import {styles} from "../../../../styles/tradeLobbyStyles"
import { getLocalStorageData, getUsername } from "../../../../helperFunctions/localStorageFunctions";
import { useSession } from "../../../../customHooks/websocketUtils";
import { getYourSkinsImages } from "../../../../helperFunctions/getImages";
import RenderTradePanel from "../../shared/renderTradePanel";

const CreatePublicTrade = () => {
	const userStore = useContext(UserStore)
	const [userJoined, setUserJoined] = useState(false)
	const [connectedUserSelectedInventoryItems, setConnectedUserSelectedInventoryItems] = useState([])
	const onOpenHandler = (data) => {onopen(data, sendMessage)}
	const onCloseHandler = () => { onclose() }
	const onMessageHandler = (data) => {
		onmessage(data, setUserJoined, setConnectedUserSelectedInventoryItems)
	}
	const [connect, sendMessage, closeConn] = useSession(
		onOpenHandler,onMessageHandler, onCloseHandler, userStore.userUID
	)
	useEffect(() => {
		connect({
			action: 'userCreatedPublicTradeRoom',
			roomID: userStore.userUID,
			username: userStore.username,
			userType: 'roomCreator'
		})
		}, [])
	useEffect(() => {
		return () => {
			console.log('unmounted')
			// closeConn()
		}
	}, [])

	return (
		<>
			<RenderTradePanel connectedUserSelectedInventoryItems={connectedUserSelectedInventoryItems} userType={"roomCreator"} userJoined={userJoined} onOpenHandler={onOpenHandler} />
		</>
	)
}

export default CreatePublicTrade
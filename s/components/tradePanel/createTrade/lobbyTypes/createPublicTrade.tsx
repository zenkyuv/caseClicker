import { useContext, useEffect, useState } from "react";
import UserStore from "../../../../states-store/states/userStore";
import  {onopen, onmessage, onclose}  from "../utils/utils"
import { useSession } from "../../../../customHooks/websocketUtils";
import RenderTradePanel from "../../shared/renderTradePanel";
import { ConnectedUserData } from "../../../../interfaces/frontendInterfaces";

const CreatePublicTrade = () => {
	const userStore = useContext(UserStore)
	const [userJoined, setUserJoined] = useState(false)
	const [connectedUserData, setConnectedUserData] = useState<ConnectedUserData>()
	const [offerAccepted, setOfferAccepted] = useState({
		byYou: false,
		byConnectedUser: false
	})
	const onOpenHandler = (data) => {onopen(data, sendMessage)}
	const onCloseHandler = () => { onclose() }
	const onMessageHandler = (data) => {
		onmessage(data, setUserJoined, setConnectedUserData, setOfferAccepted)
	}
	const [connect, sendMessage, closeConn] = useSession(
		onOpenHandler,onMessageHandler, onCloseHandler, userStore.userUID
	)
	useEffect(() => {
		connect({
			action: 'userCreatedPublicTradeRoom',
			roomID: userStore.userUID,
			username: userStore.username,
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
			<RenderTradePanel
				offerAccepted={offerAccepted}
				setOfferAccepted={setOfferAccepted}
				data={connectedUserData}
				userType={"roomCreator"}
				userJoined={userJoined}
				onOpenHandler={onOpenHandler} />
		</>
	)
}

export default CreatePublicTrade
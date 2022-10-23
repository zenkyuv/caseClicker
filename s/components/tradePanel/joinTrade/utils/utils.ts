import { Dispatch, SetStateAction } from "react"
import { PublicRoomData } from "../../../../interfaces/frontendInterfaces"

export const onopen = (data: any, sendMessage: any) => {
	if (data) {
		sendMessage(data)
	}
	}
export const onmessage = (
	event: MessageEvent,
	setPublicRooms: Dispatch<SetStateAction<PublicRoomData[] | []>>,
	setConnectedRoomData: Dispatch<SetStateAction<PublicRoomData | []>>,
	setUserJoined: Dispatch<SetStateAction<boolean>>,
	setOfferAccepted: Dispatch<SetStateAction<{
		byYou: boolean,
		byConnectedUser: boolean
	}>>
) => {
		try {
			const eventData = JSON.parse(event.data.replace('\n', ''))
			const action = eventData.action
			const data = eventData.data
			if (action == 'refreshWithNewData') {
			setPublicRooms(data)
			setConnectedRoomData(data)
		}
			if (action == "userLeftRoom") {
				setConnectedRoomData([])
				setPublicRooms(data)
				setUserJoined(false)
					setOfferAccepted({
					byYou: false,
					byConnectedUser: false
				})
			}
			if (action == "userAcceptedOffer") {
				setOfferAccepted(prev => ({
					byYou: prev.byYou,
					byConnectedUser: true
				}))
			}
		} catch(err) {
			console.log(err)
		}
	}
export const onclose = () => {
		console.log('closed')
}
	
export const joinPublicTradeRoom = (roomID: string, clientID: string, sendMessage) => {
		sendMessage({roomToConnectTo: roomID, clientID: clientID, action: 'userJoinedPublicTradeRoom'})
	}
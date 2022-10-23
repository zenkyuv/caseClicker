import { Dispatch, SetStateAction } from "react"
import { ConnectedUserData } from "../../../../interfaces/frontendInterfaces"

export const onopen = (data, sendMessage) => {
	if (data) {
		sendMessage(data)
	}
	}
export const onmessage = (
	event: MessageEvent,
	setUserJoined: Dispatch<SetStateAction<boolean>>,
	setConnectedUserData: Dispatch<SetStateAction<ConnectedUserData | []>>,
	setOfferAccepted: Dispatch<SetStateAction<{
		byYou: boolean,
		byConnectedUser: boolean
	}>>
) => {
	const eventData = JSON.parse(event.data.replace('\n', ''))
	const action = eventData.action
	const data = eventData.data
	if (action == 'userJoinedYourRoom') {
		setUserJoined(true)
	}
	if (action == 'refreshWithNewData') {
			// setPublicLobbies(data)
			setConnectedUserData(data)
		}
	if (action == 'userLeftRoom') {
		setUserJoined(false)
		setConnectedUserData([])
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
	}
export const onclose = () => {
		console.log('closed')
	}

	
	//index of first empty array element in which selected item can be placed
	// const index = selectedInventoryItems.map((el, i) => {
	// 	if (el.length == 0) {
	// 		return i
	// 	}
	// 	else return 'selected'
	// }).filter(el => el != 'selected')[0]
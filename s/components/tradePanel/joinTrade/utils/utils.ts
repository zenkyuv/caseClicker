export const onopen = (data: any, sendMessage: any) => {
	if (data) {
		sendMessage(data)
	}
	}
export const onmessage = (event: MessageEvent, setPublicLobbies: any, setConnectedUserSelectedInventoryItems, setUserJoined) => {
		try {
			const eventData = JSON.parse(event.data.replace('\n', ''))
			const action = eventData.action
			const data = eventData.data
		if (action == 'refreshWithNewData') {
			setPublicLobbies(data)
			setConnectedUserSelectedInventoryItems(data)
		}
			if (action == "userLeftRoom") {
				setConnectedUserSelectedInventoryItems([])
				setUserJoined(false)
				setPublicLobbies(data)
			}
		} catch(err) {
			console.log(err)
		}
	}
export const onclose = () => {
		console.log('closed')
}
	
export const joinPublicTradeRoom = (roomID: any, clientID, sendMessage) => {
		sendMessage({roomToConnectTo: roomID, clientID: clientID, action: 'userJoinedPublicTradeRoom'})
	}
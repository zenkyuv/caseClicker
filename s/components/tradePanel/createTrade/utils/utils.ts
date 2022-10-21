export const onopen = (data, sendMessage) => {
	if (data) {
		sendMessage(data)
	}
	}
export const onmessage = (event, setUserJoined, setConnectedUserSelectedInventoryItems) => {
		const eventData = JSON.parse(event.data.replace('\n', ''))
		const action = eventData.action
		const data = eventData.data
	if (action == 'userJoinedYourRoom') {
		setUserJoined(true)
	}

		if (action == 'refreshWithNewData') {
			// setPublicLobbies(data)
			setConnectedUserSelectedInventoryItems(data)
		}
	if (action == 'userLeftRoom') {
		setUserJoined(false)
		setConnectedUserSelectedInventoryItems([])
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
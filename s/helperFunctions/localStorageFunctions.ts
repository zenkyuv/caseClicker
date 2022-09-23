import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalStorageData = async () => {
		try {
			const value = await AsyncStorage.getItem('@inventory')
			if (value !== null) {
				return JSON.parse(value)
			} else {
				return null
			}
		} catch(e) {console.log(e)}
}
	
export const setLocalStorageData = async (data, clearAll: boolean) => {
	const storageData = await getLocalStorageData()
	let items = []
	if (storageData && !clearAll) {
		items = storageData
		items.push(data)
	} else if (storageData && clearAll) {
		items = data
	} else items.push(data)
	try {
		await AsyncStorage.setItem('@inventory', JSON.stringify(items))
	} catch (e) { console.log(e) }
}

export const removeAndGetLocalStorageData = async (index: number) => {
	const data = await getLocalStorageData()
	if (data) {
		data.splice(index, 1)
		setLocalStorageData(data, true)
		return data
	} else return null
}
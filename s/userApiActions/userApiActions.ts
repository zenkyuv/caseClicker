import { getAuth } from "firebase/auth";
import { setLocalStorageData } from "../helperFunctions/localStorageFunctions";
import { UserMoney } from "../interfaces/frontendInterfaces"
import { UserStore } from "../states-store/states/userStore"
export const addMoney = (userStore: UserStore) => {
	return getIdToken().then((idToken: string) => {
		//192.168.109.129:3000
		fetch("http://141.94.85.161:3000/addMoney", {
					body: JSON.stringify({idToken: idToken}),
						method: "PUT",
						headers: {
				"Content-type": "application/json"
			},
					}).then(response => {
						if (response.status == 200) {
							getMoney(userStore)
						}
					})
	})
	}
export const getMoney = (userStore: UserStore) => {
	let data: any;
	getIdToken().then((idToken: string) => {
		fetch(`http://141.94.85.161:3000/getMoney?idToken=${idToken}`, {
			method: "GET"
		}).then(res => res.json()).then((data: UserMoney) => { userStore.setUserMoney(data.money), console.log(data), data = data })
	})
	return data
}
	
export const sellItem = (userStore: UserStore, item: string) => {
	console.log(item)
	return getIdToken().then((idToken: string) => {
		fetch("http://141.94.85.161:3000/sellItem", {
					body: JSON.stringify({idToken: idToken, item: item}),
						method: "PUT",
						headers: {
				"Content-type": "application/json"
			},
					}).then(response => {
						if (response.status == 200) {
							getMoney(userStore)
						}
					})
	})
}

export const getInventory = () => {
	return getIdToken().then((idToken: string) => {
		fetch(`http://141.94.85.161:3000/getInventory?idToken=${idToken}`, {
			method: "GET"
		}).then(res => res.json()).then(async data => await setLocalStorageData(data, true))
	})
}

export const getIdToken =  () => {
	const auth = getAuth();
	return auth.currentUser.getIdToken(true).then((idToken) => {
				return idToken
		}).catch((error) => {
  		console.log(error)
			})
}

export const openCase = (caseName: string, setDrawnSkin: { (value: any): void; (arg0: any): any; }) => {
		getIdToken().then((idToken) => {
					fetch(`http://141.94.85.161:3000/openCase?idToken=${idToken}&caseName=${caseName}`, {
						method: "GET",
						headers: {
				"Content-type": "application/json"
			}}).then(res => res.json()).then(async data => {
						setDrawnSkin(data), await setLocalStorageData(data, false)
					})
}).catch((error) => {
  console.log(error)
});
	}
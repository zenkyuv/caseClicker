import app, { initializeApp } from "firebase/app";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut}from 'firebase/auth';
import { UserStore } from "../states-store/states/userStore";
import { signUserInfo, UserMoney } from "../interfaces/frontendInterfaces";
import { getInventory, getMoney } from "../userApiActions/userApiActions";
import { getUsername, saveUsername } from "../helperFunctions/localStorageFunctions";

const firebaseConfig = {
  apiKey: "AIzaSyAqW5tht_dhCf7Bgbl--4dVXefLpN6E978",
  authDomain: "csgocases-85eab.firebaseapp.com",
  projectId: "csgocases-85eab",
  storageBucket: "csgocases-85eab.appspot.com",
  messagingSenderId: "434988569004",
  appId: "1:434988569004:web:c08a65dade8d932b62aa09",
	measurementId: "G-KRM2SHZJNW",
	databaseURL: ''
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


function createUser({ userData, userStore }: signUserInfo) {
	const email:string = userData.email
	const password: string = userData.password
	const username: string = userData.username
  createUserWithEmailAndPassword(auth, email, password).then(
    (cred: any) => {
      const user = cred.user;
      if (user) {
        userStore.loginUser();
				userStore.setUserUID(user.uid);
				saveUsername(username)
					auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
  // Send token to your backend via HTTPS
					fetch("http://141.94.85.161:3000/createUser", {
					body: JSON.stringify({idToken: idToken, uid: user.uid, username: username}),
						method: "POST",
						headers: {
				"Content-type": "application/json"
			},
		})
}).catch((error) => {
  console.log(error)
});
			}
    }
  );
}

function signUser (
		{userData,
    userStore,
    setLoadingIndicator}: signUserInfo
) {
	const email:string = userData.email
	const password:string = userData.password
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
			if (user) {
				await getInventory()
				const username = await getUsername()
				console.log('logged')
        userStore.loginUser();
				userStore.setUserUID(user.uid);
				userStore.setUsername(username)
				getMoney(userStore)
        // setLoadingIndicator(false);
        // SetPr(email.value, password.value);
        // databaseData(userStore);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorMessage) {
        console.log('wrong credentials');
      }
    });
}

function logout(userStore: UserStore, pageStore: any) {
  signOut(auth)
    .then(() => {
      pageStore.makeDashboardNotVisible();
      userStore.logoutUser();
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

const checkIfUserLogged = (userStore: UserStore) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			console.log("logged")
			userStore.loginUser()
			userStore.setUserUID(user.uid)
			await getInventory()
			const uid = user.uid
		} else {
			console.log('not logged, error')
		}
	})
}


export { signUser, createUser, logout, checkIfUserLogged };
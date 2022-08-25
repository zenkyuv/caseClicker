import app from "@react-native-firebase/app";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserStore } from "../states-store/states/userStore";
import AppCheck from '@react-native-firebase/app-check';

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

app.initializeApp(firebaseConfig);
const db = getFirestore();
// const auth = getAuth();


interface UserData {
	email: string,
	password: string
}

interface signUserInfo {
	userData: UserData
	userStore: any,
	setLoadingIndicator?: any
}

function createUser({ userData, userStore }: signUserInfo) {
	const email:string = userData.email
	const password: string = userData.password
  auth().createUserWithEmailAndPassword(email, password).then(
    (cred: any) => {
      const user = cred.user;
      if (user) {
        userStore.loginUser();
        userStore.setUserUID(user.uid);
			}
		
      return 	setDoc(doc(db,`users/${cred.user.uid}`), {
				 first: 'Ada',
        last: 'Lovelace',
			})
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
console.log(email,password)
  auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
			if (user) {
				console.log('zalogowany')
        userStore.loginUser();
				userStore.setUserUID(user.uid);
				console.log(user.uid)
				AppCheck().activate('SHA256key',true).then((res)=>{
					console.log(res)
}).catch((err)=>{ console.log("err");

})
				auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  // Send token to your backend via HTTPS
					fetch("http://192.168.1.106:3000/createUser", {
		// fetch("http://141.94.85.161:3000/openCase", {
					body: JSON.stringify({idToken: idToken}),
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
		})
  // ...
}).catch(function(error) {
  // Handle error
});
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

function logout(userStore: any, pageStore: any) {
  auth().signOut()
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
	auth().onAuthStateChanged((user) => {
		if (user) {
			console.log("zalogowany")
			userStore.loginUser()
			userStore.setUserUID(user.uid)
			const uid = user.uid
		} else {
			console.log('nie zalogowany')
		}
	})
}


export { signUser, createUser, logout, checkIfUserLogged };
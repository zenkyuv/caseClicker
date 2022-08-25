const express = require("express")
const bodyParser = require("body-parser")
const { applicationDefault, initializeApp } = require('firebase-admin/app')
const { auth, credential } = require("firebase-admin")
const serviceAccount = require("../../serviceAccountKey.json");
const mongoose = require("mongoose");
// import {getAuth} from "firebase/auth"
const app = express()
require("dotenv").config(); 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// app.use(express.json({ strict: false }))
// strict
// Enables or disables only accepting arrays and objects; when disabled will accept anything JSON.parse accepts.
	initializeApp({
		credential: credential.cert(serviceAccount)
	})
	console.log(require("dotenv").config())
console.log(process.env.MONGODB_URL)
const connection = mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
	function getRandomArbitrary() {
    return Math.round(Math.random() * (10000 - 0) + 0)
}
function getSkin() {
	//losuje liczbe od 0 do 1000 i na tej podstawie daje kolor skina
	const randomNumber = getRandomArbitrary()
	if (randomNumber < 7992) {
		return "Mil-spec"
	} else if (randomNumber > 7992 && randomNumber < 9590) {
		return "Restricted"
	} else if (randomNumber > 9590 && randomNumber < 9910) {
		return "Classified"
	} else if (randomNumber > 9910 && randomNumber < 9974) {
		return "Covert"
	} else if (randomNumber > 9974 && randomNumber < 10000) { 
		return "Knife/Glove"
	}
	}
app.get("/home", (req, res) => {
	res.json({
		name: "BIll",
		age: 99
	})
})
const userSchema = new mongoose.Schema({ _id: String })
const User = new mongoose.model('users', userSchema)
const createUser = async (uid) => {
	try {
		await	User({_id: uid}).save()
	} catch (err) {
		console.log(err)
	}
}
app.post("/createUser", (req, res) => {
	auth()
  .verifyIdToken(req.body.idToken)
  .then((decodedToken) => {
		const uid = decodedToken.uid
		createUser(uid)
  })
  .catch((error) => {
		console.log(error)
  });
})

app.post("/openCase", (req, res) => {
	console.log(getSkin())
	res.sendStatus(200)
})

app.listen(3000, () => console.log("Server is up"))
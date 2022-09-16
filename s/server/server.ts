import { initializeApp } from 'firebase-admin/app';
import express, { NextFunction, Response } from "express";
import { ExpressRequest } from "../interfaces/backendInterfaces";
import serviceAccount from "../../serviceAccountKey.js";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import openCase from './openCase.js';
import pkg from "firebase-admin";
import * as dotenv from 'dotenv'
import cors from 'cors';
import ip from "ip"
import { User } from './mongooseModels.js';
dotenv.config()
const { auth, credential } = pkg;
const app = express()
console.dir ( ip.address() );
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())
app.use((_req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    return next();
});

async function validateUser(req: ExpressRequest, res: Response, next: NextFunction) {
	try {
		await auth()
			.verifyIdToken(req.method == "GET" ? req.query.idToken : req.body.idToken)
			.then((decodedToken) => {
				console.log(decodedToken.uid)
				req.idToken = decodedToken.uid
				return next()
			})
	} 
	catch (err) {
		console.log(err)
		res.send("no token sent to server")
	}
}

app.use(validateUser)
// app.use(express.json({ strict: false }))
// strict
// Enables or disables only accepting arrays and objects; when disabled will accept anything JSON.parse accepts.
	initializeApp({
		credential: credential.cert(serviceAccount)
	})
const connection = mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions
);

const createUser = async (uid: string) => {
	try {
		await	new User({_id: uid, name: "Przemek", money: "0", inventory: []}).save()
	} catch (err) {
		console.log(err)
	}
}
app.post("/createUser", (req: ExpressRequest, res: Response) => {
	createUser(req.idToken)
})

app.get("/getMoney", (req: ExpressRequest, res: Response) => {
	console.log(req.ip)
			User.findOne({ _id: req.idToken }, 'money', (_err, person) => { 
				res.send({money: person.money})
			})
})

app.put("/addMoney", (req: ExpressRequest, res: Response) => {
	User.findByIdAndUpdate(req.idToken, { $inc: { money: 100 } }, (err, brote) => {
		console.log(err, brote)
	})
	res.sendStatus(200)
})

app.get("/openCase", async (req: ExpressRequest, res: Response) => {
	openCase(req.query.caseName, res, req.idToken)
})

app.put("/sellItem", (req: ExpressRequest, res: Response) => {
	console.log(req.body.item)
	User.findById(req.idToken).select({ 'inventory': { $elemMatch: { name: req.body.item } } }).exec((err, brote) => {
		console.log(err, brote, "here")
		if (brote.inventory.length > 0) {
				User.findByIdAndUpdate(req.idToken, { $inc: { money: brote.inventory[0].price['24_hours'].average } }).exec((err, brote) => {
			console.log(err, brote)
			if (!err) {
				User.updateOne({ _id: req.idToken }, { "$pull": { "inventory": { name: req.body.item } } }).exec((err, brote) => {
					console.log(err,brote)
				})
				res.sendStatus(200)
			}
		})
		}
	
	})
})

app.listen(3000, () => console.log("Server is up"))
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

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
	}),
		console.log("srakada")
})

app.post("/openCase", (req, res) => {
	console.log(getSkin())
	res.sendStatus(200)
})

app.listen(3000, () => console.log("Server is up"))
// import { cases } from "./server";

import { cases, User } from "./mongooseModels.js";

const openCase = (caseName, response: any, id) => {
	"use strict";
	function rand(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function getRandomArbitrary() {
    return Math.round(Math.random() * (10000 - 0) + 0)
}
	function getSkinRarity() {
	//losuje liczbe od 0 do 1000 i na tej podstawie daje kolor skina
	const randomNumber = getRandomArbitrary()
	if (randomNumber < 7992) {
		return "mil_spec"
	} else if (randomNumber > 7992 && randomNumber < 9590) {
		return "restricted"
	} else if (randomNumber > 9590 && randomNumber < 9910) {
		return "classified"
	} else if (randomNumber > 9910 && randomNumber < 9974) {
		return "covert"
	} else if (randomNumber > 9974 && randomNumber < 10000) { 
		return "covert"
	}
	}
			function getRandomInt(min, max) {
    		min = Math.ceil(min);
    		max = Math.floor(max);
    		return Math.floor(Math.random() * (max - min + 1)) + min;
}
	function getSkinWear() {
		const randomNumber = getRandomArbitrary()
		if (randomNumber < 4318) {
		return "field_tested"
	} else if (randomNumber > 4318 && randomNumber < 6786) {
		return "minimal_wear"
	} else if (randomNumber > 6786 && randomNumber < 8257) {
		return "factory_new"
	} else if (randomNumber > 8257 && randomNumber < 9250) {
		return "battle_scarred"
	} else if (randomNumber > 9250 && randomNumber < 10000) { 
		return "well_worn"
	}
	}
	const skinRarity = getSkinRarity()
	const skinWear = getSkinWear()
	console.log(skinRarity, "rarity", skinWear, 'wear')
	cases.findOne({ _id: caseName }).select(
		`skins.${skinRarity}.${skinWear}`).exec(
			(err, res) => { 
				// console.log(res.skins[skinRarity][skinWear])
				console.log(err)
				const arrLength = res.skins[skinRarity][skinWear].length
				console.log(arrLength, 'length')
				const randomIndex = getRandomInt(0, arrLength - 1)
				console.log(randomIndex)
				const choosenSkin = res.skins[skinRarity][skinWear][randomIndex]
				console.log(choosenSkin)
				User.findByIdAndUpdate(id, {
					$push: {
					inventory: choosenSkin
				}}).exec((err,res) => console.log(err,res))
				console.log(id)
				response.send(choosenSkin)
		}		
	)

	let color;
	var wrap, colors;
	// colors = ["red"]
	var pallete = [
		"r18", "b8", "r19", "g2", "r20", "r21", "b9", "r10",
		"g3", "r11", "b4", "r12", "b5", "r13", "b6",
		"r14", "g0", "r15", "b7", "r16", "g1", "r17"
	];

	var bets = {
		"green": [2, 3, 0, 1],
		"red": [18, 19, 20, 21, 10, 11, 12, 13, 14, 15, 16, 17],
		"black": [8, 9, 4, 5, 6, 7,]
	}

	var width = 80;

	// wrap = document.querySelector('.roulette-container .wrap');

	function spin_promise(color, number) {
		console.log("halo1")
		// return new Promise<void>((resolve, reject) => {
			if (
				(color === "green" || color === "g") && (number >= 0 && number <= 3) ||
				(color === "black" || color === "b") && (number >= 4 && number <= 9) ||
				(color === "red" || color === "r") && (number >= 10 && number <= 21)
			) {
				let index, pixels, circles, pixelsStart;

				color = color[0];
				index = pallete.indexOf(color + "" + number);
				pixels = width * (index + 1);
				circles = 1760 * 15; //15 circles

				pixels -= 80;
				pixels = rand(pixels + 2, pixels + 79);
				pixelsStart = pixels;
				pixels += circles;
				pixels *= -1;

				// wrap.style.backgroundPosition = ((pixels + (wrap.offsetWidth / 2)) + "") + "px";
				// setTimeout(() => {
				// 	// wrap.style.transition = "none";
				// 	// let pos = (((pixels * -1) - circles) * -1) + (wrap.offsetWidth / 2);
				// 	// wrap.style.backgroundPosition = String(pos) + "px";
				// 	setTimeout(() => {
				// 		// wrap.style.transition = "background-position 5s";
				// 		resolve();
				// 	}, 510);

				// }, 5000 + 700);
			}
		// });
	}


	var i = 0;

	function play() {
console.log("[Start game]");
		let r = rand(1, 1000);
		if (1 <= r && r < 30) color = "green";
		else if (30 <= r && r < 530) color = "red";
		else if (530 <= r && r < 1000) color = "black";
		let bet = bets[color][rand(0, bets[color].length)];
		console.log(color, bet)
		spin_promise(color, bet)
			console.log("[Ended]");
			
			// let colorBeted = document.createElement("div");
			// colorBeted.setAttribute("class", "color-beted " + color[0]);
			// colorBeted.innerHTML = bet;
			// document.body.appendChild(colorBeted);
			// setTimeout(function () {
			// 	console.log("[Start game]");
			// 	play();
			// }, 2500);
	}

	play()
			// setTimeout(() => {
			// 		// wrap.style.transition = "none";
			// 		// let pos = (((pixels * -1) - circles) * -1) + (wrap.offsetWidth / 2);
			// 		// wrap.style.backgroundPosition = String(pos) + "px";
			// 		setTimeout(() => {
			// 			// wrap.style.transition = "background-position 5s";
			// 			resolve(color);
			// 		}, 510);

			// 	}, 5000 + 700);
	// return color

}

export default openCase
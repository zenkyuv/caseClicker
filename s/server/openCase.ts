import { Response } from "express";
import { getRandomInt } from "../helperFunctions/getRandomInt.js";
import { getSkinRarityBackend } from "./helperFunctions/getSkinRarity.js";
import { getSkinWear } from "./helperFunctions/getSkinWear.js";
import { cases, User } from "./mongooseModels.js";

const openCase = (caseName: string, response: Response, id: string) => {
	"use strict";
	const skinRarity = getSkinRarityBackend()
	const skinWear = getSkinWear()
	cases.findOne({ _id: caseName }).select(
		`skins.${skinRarity}.${skinWear}`).exec(
			(err, res) => { 
				const arrLength = res.skins[skinRarity][skinWear].length
				const randomIndex = getRandomInt(0, arrLength - 1)
				const choosenSkin = res.skins[skinRarity][skinWear][randomIndex]
				User.findByIdAndUpdate(id, {
					$push: {
					inventory: choosenSkin
				}}).exec((err,res) => console.log(err,res))
				response.send(choosenSkin)
		}		
	)
}

export default openCase
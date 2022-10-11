import { getRandomArbitrary } from "../../helperFunctions/getRandomArbitrary.js"

export const getSkinWear = () => {
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
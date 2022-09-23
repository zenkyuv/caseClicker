import { getRandomArbitrary } from "./getRandomArbitrary"

export const getSkinRarityBackend = () => {
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
	
export const getSkinRarityFrontend = () => {
	const randomNumber = getRandomArbitrary()
	if (randomNumber < 7992) {
		return "Mil-Spec"
	} else if (randomNumber > 7992 && randomNumber < 9590) {
		return "Restricted"
	} else if (randomNumber > 9590 && randomNumber < 9910) {
		return "Classified"
	} else if (randomNumber > 9910 && randomNumber < 9974) {
		return "Covert"
	} else if (randomNumber > 9974 && randomNumber < 10000) { 
		return "Covert"
	}
	}
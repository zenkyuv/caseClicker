import { cases } from "../components/caseShop/cases"
import data from "../components/caseShop/itemlist.json"

const getLatestSkinData = () => {

	const obj = data['items_list'] // data from csgobackpack api
	const arr = []
	const b = Object.keys(obj).map(key => arr.push(obj[key]))
	return cases.map(({_id, skins}) => {
		return {
			_id: _id,
			skins: {
				mil_spec: {
					battle_scarred: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Mil-Spec Grade" && el.exterior == "Battle-Scarred")
					}).filter((arr) => arr.length > 0).flat(),
					well_worn: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Mil-Spec Grade" && el.exterior == "Well-Worn")
					}).filter((arr) => arr.length > 0).flat(),
					field_tested: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Mil-Spec Grade" && el.exterior == "Field-Tested")
					}).filter((arr) => arr.length > 0).flat(),
					minimal_wear: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Mil-Spec Grade" && el.exterior == "Minimal Wear")
					}).filter((arr) => arr.length > 0).flat(),
					factory_new: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Mil-Spec Grade" && el.exterior == "Factory New")
					}).filter((arr) => arr.length > 0).flat()
				},
				restricted: {
					battle_scarred: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Restricted" && el.exterior == "Battle-Scarred")
					}).filter((arr) => arr.length > 0).flat(),
					well_worn: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Restricted" && el.exterior == "Well-Worn")
					}).filter((arr) => arr.length > 0).flat(),
					field_tested: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Restricted" && el.exterior == "Field-Tested")
					}).filter((arr) => arr.length > 0).flat(),
					minimal_wear: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Restricted" && el.exterior == "Minimal Wear")
					}).filter((arr) => arr.length > 0).flat(),
					factory_new: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Restricted" && el.exterior == "Factory New")
					}).filter((arr) => arr.length > 0).flat()
				},
				classified: {
					battle_scarred: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Classified" && el.exterior == "Battle-Scarred")
					}).filter((arr) => arr.length > 0).flat(),
					well_worn: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Classified" && el.exterior == "Well-Worn")
					}).filter((arr) => arr.length > 0).flat(),
					field_tested: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Classified" && el.exterior == "Field-Tested")
					}).filter((arr) => arr.length > 0).flat(),
					minimal_wear: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Classified" && el.exterior == "Minimal Wear")
					}).filter((arr) => arr.length > 0).flat(),
					factory_new: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Classified" && el.exterior == "Factory New")
					}).filter((arr) => arr.length > 0).flat()
				},
				covert: {
					battle_scarred: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Covert" && el.exterior == "Battle-Scarred")
					}).filter((arr) => arr.length > 0).flat(),
					well_worn: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Covert" && el.exterior == "Well-Worn")
					}).filter((arr) => arr.length > 0).flat(),
					field_tested: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Covert" && el.exterior == "Field-Tested")
					}).filter((arr) => arr.length > 0).flat(),
					minimal_wear: skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Covert" && el.exterior == "Minimal Wear")
					}).filter((arr) => arr.length > 0).flat(),
					factory_new:skins.map(skin => {
						return arr.filter(el => el.name.includes(skin.skinName) && !el.name.includes("StatTrak") && el.rarity == "Covert" && el.exterior == "Factory New")
					}).filter((arr) => arr.length > 0).flat()
				}
			}
		}
	})
}
export default getLatestSkinData
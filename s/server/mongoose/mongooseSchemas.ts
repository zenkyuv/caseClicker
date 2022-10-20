import mongoose from "mongoose"

export const cellSchema = new mongoose.Schema({
	name: String,
	exterior: String,
	rarity: String,
	rarity_color: String,
	price: {
		'24_hours': {
			average: Number,
			median: Number,
			sold: String,
			standard_deviation: String,
			lowest_price: String,
			highest_price: Number
		}
	}
})

export const userSchema = new mongoose.Schema({ _id: String, name: String, money: Number, inventory: [cellSchema] })
export const casesSchema = new mongoose.Schema({
	_id: String,
	skins: {
		mil_spec: {
			battle_scarred: [cellSchema],
			well_worn: [cellSchema],
			field_tested: [cellSchema],
			minimal_wear: [cellSchema],
			factory_new: [cellSchema]
		},
		restricted: {
			battle_scarred: [cellSchema],
			well_worn: [cellSchema],
			field_tested: [cellSchema],
			minimal_wear: [cellSchema],
			factory_new: [cellSchema]
		},
		classified: {
			battle_scarred: [cellSchema],
			well_worn: [cellSchema],
			field_tested: [cellSchema],
			minimal_wear: [cellSchema],
			factory_new: [cellSchema]
		},
		covert: {
			battle_scarred: [cellSchema],
			well_worn: [cellSchema],
			field_tested: [cellSchema],
			minimal_wear: [cellSchema],
			factory_new: [cellSchema]
		}
	}
})
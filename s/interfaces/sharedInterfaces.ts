export interface ItemPrice {
	['24_hours']: {
		average: number,
		highest_price: number,
		lowest_price: string,
		median: number,
		sold: string,
		standard_deviation: string
	}
}

export interface Item {
	name: string,
	_id: string,
	exterior: string,
	price: ItemPrice,
	rarity: string,
	rarity_color: string
}


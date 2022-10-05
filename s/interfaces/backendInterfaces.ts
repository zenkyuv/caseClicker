import { Request } from "express";

export interface IdToken {
	idToken: string
}

export interface ExpressRequest extends Request {
	idToken: string;
	caseName: string,
	body: {
		caseName: string,
		idToken: string,
		item: string
	},
	query: {
		idToken: string,
		caseName: string,
		selectedCoin: any,
		betAmount: any
	}
}

export interface ExpressResponse extends Response {
	
}
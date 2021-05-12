import { HttpService, SellyServiceResponse } from './core/http'
import { GET, Path, ResponseAdapter } from './core/decorators'

export interface CardResponse {
	id: number
	name: string
	description: string
}

export default class CardService extends HttpService {
	async getCardbyId(id: number): Promise<CardResponse> {
		await null
		return {
			id: NaN,
			name: '',
			description: '',
		}
	}
}

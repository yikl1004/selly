import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'

export interface CardState {
	title: string
}

@Module({ name: 'card', namespaced: true, stateFactory: true })
export class Card extends VuexModule {
	cardList: any[] = []

	@MutationAction({ mutate: ['cardList'] })
	async getCardAll() {
		const cardList = await []
		return {
			cardList,
		}
	}

	@MutationAction({ mutate: ['cardList'] })
	async wow() {
		await 'wow'
		return {
			cardList: [],
		}
	}
}

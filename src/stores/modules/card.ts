import store from '@/stores'
import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import CardService, { CardResponse } from '@/services/card'

export interface CardState {
    title: string
}

@Module({ name: 'card', namespaced: true, stateFactory: true })
export class Card extends VuexModule {
    cardList: CardResponse[] = []

    @MutationAction({ mutate: ['cardList'] })
    async getCardAll() {
        const cardList = await new CardService().getCardAll()
        return {
            cardList,
        }
    }

    @MutationAction({ mutate: ['cardList'] })
    async wow() {
        console.log('@@@@@@', this)
        await 'wow'
        return {
            cardList: [],
        }
    }
}

import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import FinacialService from '@services/financial'

export interface FinancialState {}

@Module({ name: 'finance', namespaced: true, stateFactory: true })
export default class Finance extends VuexModule {
    data: any = ''

    @MutationAction({ mutate: ['data'] })
    async getData() {
        const ciNo = '0U4k05hAwCYT0IwN5kvW5leCyQ6QSZFyV2dH6gaNARlMwUUgHodI4jCOWIaU8ySUbfHpJyEAUP7AXj0w9yU40w=='
        const data = await FinacialService.getData(ciNo)
        return {
            data,
        }
    }
}

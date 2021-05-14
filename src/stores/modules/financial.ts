import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import FinacialService from '@services/financial'

export interface FinancialState {}

@Module({ name: 'financial', namespaced: true, stateFactory: true })
export class Financial extends VuexModule {
    data: any = ''

    @MutationAction({ mutate: ['data'] })
    async getData() {
        const data = await new FinacialService().getData({})
        return {
            data,
        }
    }
}

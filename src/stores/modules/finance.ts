import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import FinacialService from '@services/finance'

export interface FinancialState {
    mainInfo: any
    policy: any
    agree: any
    certPhone: any
    guide: any
}

@Module({ name: 'finance', namespaced: true, stateFactory: true })
export default class Finance extends VuexModule {
    public mainInfo: any = {}
    public policy: any = {}
    public agree: any = {}
    public certPhone: any = {}
    public guide: any = {}

    @MutationAction({ mutate: ['mainInfo'] })
    async getMainInfo() {
        const { data: mainInfo } = await FinacialService.getMainInfo()
        return {
            mainInfo,
        }
    }

    @MutationAction({ mutate: ['policy'] })
    async getPolicy() {
        const { data: policy } = await FinacialService.getPolicy()
        return {
            policy,
        }
    }

    @MutationAction({ mutate: ['agree'] })
    async getAgree() {
        const { data: agree } = await FinacialService.getAgree()
        return {
            agree,
        }
    }

    @MutationAction({ mutate: ['certPhone'] })
    async getCertPhone() {
        const { data: certPhone } = await FinacialService.getCertPhone()
        return {
            certPhone,
        }
    }

    @MutationAction({ mutate: ['guide'] })
    async getGuide() {
        const { data: guide } = await FinacialService.getGuide()
        return {
            guide,
        }
    }
}

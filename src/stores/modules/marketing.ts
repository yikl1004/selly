import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import MarketingService from '@services/marketing'
import type { MarketingParameters, MarketingResponse } from '@services/marketing'

export type PossibleApplyFranchiseListRes = MarketingResponse['possibleApplyFranchiseList']
export type ValidatePossibleApplyFranchiseListRes = MarketingResponse['validatePossibleApplyFranchiseList']

@Module({ name: 'marketing', namespaced: true, dynamic: true, store })
export default class Marketing extends VuexModule {
    public possibleApplyFranchiseList: PossibleApplyFranchiseListRes | null = null
    public validatePossibleApplyFranchiseList: ValidatePossibleApplyFranchiseListRes | null = null

    @MutationAction
    async getPossibleApplyFranchiseList() {
        const { data } = await MarketingService.getPossibleApplyFranchiseList()

        return {
            possibleApplyFranchiseList: data,
        }
    }

    get franchiseList() {
        const origin = this.possibleApplyFranchiseList
        return origin ? origin.data.list : []
    }

    @MutationAction
    async getValidatePossibleApplyFranchiseList(params: MarketingParameters['validatePossibleApplyFranchiseList']) {
        const { data } = await MarketingService.getValidatePossibleApplyFranchiseList(params)

        return {
            validatePossibleApplyFranchiseList: data,
        }
    }
}

export const MarketingModule = getModule(Marketing)

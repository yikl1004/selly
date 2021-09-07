import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import MarketingService from '@services/marketing'
import type { MarketingParameters, MarketingResponse } from '@services/marketing'

export type PossibleApplyFranchiseListRes = MarketingResponse['possibleApplyFranchiseList']
export type ValidatePossibleApplyFranchiseListRes = MarketingResponse['validatePossibleApplyFranchiseList']
export type MarketingTargetRes = MarketingResponse['marketingTarget']

@Module({ name: 'marketing', namespaced: true, dynamic: true, store })
export default class Marketing extends VuexModule {
    public possibleApplyFranchiseList: PossibleApplyFranchiseListRes | null = null
    public validatePossibleApplyFranchiseList: ValidatePossibleApplyFranchiseListRes | null = null
    public marketingTarget: MarketingTargetRes | null = null

    @MutationAction
    async getPossibleApplyUser() {
        const { data } = await MarketingService.getPossibleApplyUser()
        console.log('@@@@@', data)
        return {}
    }

    @MutationAction
    async getPossibleApplyFranchiseList() {
        const { data } = await MarketingService.getPossibleApplyFranchiseList()

        return {
            possibleApplyFranchiseList: data,
        }
    }

    /** 가맹점 리스트 */
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

    /** 마케팅 신청 가능 유효성 검사 */
    get step1ValidateResult() {
        return this.validatePossibleApplyFranchiseList?.data
    }

    @MutationAction
    async getMarketingTarget(params: MarketingParameters['marketingTarget']) {
        // const { data } = await MarketingService.getMarketingTarget(params)
        await console.log(params)
        return {
            marketingTarget: {
                data: {
                    newEvOjpT: '20000',
                    newPushOjpT: '10000',
                    odEvOjpT: '10000',
                    odPushOjpT: '5000',
                },
            },
        }
    }

    /** 마케팅 행사 대상자 조회 결과 값 */
    get marketingTargetData() {
        return this.marketingTarget?.data
    }
}

export const MarketingModule = getModule(Marketing)

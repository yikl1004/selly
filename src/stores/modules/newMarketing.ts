import { Module, VuexModule, MutationAction, getModule, Mutation } from 'vuex-module-decorators'
import store from '@stores/index'
import NewMarketingService from '@services/newMarketing'
import { FranchiseInfoItem, FranchiseInfoSave, Responses } from '@services/newMarketing.interface'

export interface NewMarketingState {
    possibleApply: Responses['possibleApplyUser'] | null
    franchiseInfo: Responses['franchiseInfo'] | null
    franchiseInfoItem: FranchiseInfoItem | null
    franchiseInfoSave: Responses['franchiseInfoSave'] | null
    NewMarketingState: Responses['createCouponDefaultInfo'] | null
}

@Module({ name: 'newMarketing', namespaced: true, dynamic: true, store })
export default class NewMarketing extends VuexModule {
    public possibleApply: NewMarketingState['possibleApply'] = null
    public franchiseInfo: NewMarketingState['franchiseInfo'] = null
    public franchiseInfoItem: NewMarketingState['franchiseInfoItem'] = null
    public franchiseInfoSave: NewMarketingState['franchiseInfoSave'] = null
    public createCouponDefaultInfo: NewMarketingState['NewMarketingState'] = null

    @Mutation
    setFranchiseInfo(value: number) {
        this.franchiseInfoItem = this.franchiseInfo ? this.franchiseInfo.data.list[value] : null
    }

    get franchiseInfoItemData() {
        return this.franchiseInfoItem
    }

    @MutationAction
    async getPossibleApply() {
        const { data } = await NewMarketingService.getPossibleApply()
        return {
            possibleApply: data,
        }
    }

    get possibleApplyData() {
        return this.possibleApply
    }

    @MutationAction
    async getFranchiseInfo() {
        const { data } = await NewMarketingService.getFranchiseInfo()

        return {
            franchiseInfo: data,
        }
    }

    get franchiseInfoListData() {
        return this.franchiseInfo ? this.franchiseInfo.data.list : []
    }

    /** 매장 정보 저장 */
    @MutationAction
    async setFranchiseInfoSave() {
        const typedState = this.state as NewMarketingState
        if (typedState.franchiseInfoItem) {
            const { mcno, bzno } = typedState.franchiseInfoItem
            const params: FranchiseInfoSave['Req'] = { mcno, bzno }
            const { data } = await NewMarketingService.setFranchiseInfoSave(params)

            return {
                franchiseInfoSave: data,
            }
        }
    }

    get franchiseInfoSaveResult() {
        return this.franchiseInfoSave
    }

    /** 쿠폰 기본 정보 조회 */
    @MutationAction
    async getCreateCouponDefaultInfo() {
        const { data } = await NewMarketingService.getCreateCouponDefaultInfo()

        return {
            createCouponDefaultInfo: data,
        }
    }

    /** 쿠폰 리스트 */
    get couponList() {
        return this.createCouponDefaultInfo ? this.createCouponDefaultInfo.data.list : []
    }
}

export const NewMarketingModule = getModule(NewMarketing)

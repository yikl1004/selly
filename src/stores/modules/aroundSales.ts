import { Module, VuexModule, MutationAction, Mutation, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import AroundSalesService from '@services/aroundSales'
import type { InquiryDistrict, Responses } from '@services/aroundSales.interface'

interface AroundSalesState {
    inquiryDistrict: Responses['inquiryDistrict'] | null
}

@Module({ name: 'aroundSales', namespaced: true, dynamic: true, store })
export default class AroundSales extends VuexModule {
    public inquiryDistrict: AroundSalesState['inquiryDistrict'] = null

    @MutationAction
    async getInquiryDistrict(params: InquiryDistrict['Req']) {
        const { data } = await AroundSalesService.getInquiryDistrict(params)

        return {
            inquiryDistrict: data,
        }
    }

    /** 시/도 단위 */
    get stateList() {
        return this.inquiryDistrict ? this.inquiryDistrict.data.list : []
    }

    /** 시/구/군 단위 */
    get guList() {
        return this.inquiryDistrict
            ? (this.inquiryDistrict.data.guDongList || []).filter(item => {
                  return item.zonClsDc === '02'
              })
            : []
    }

    /** 동/읍/리 단위 */
    get dongList() {
        return this.inquiryDistrict
            ? (this.inquiryDistrict.data.guDongList || []).filter(item => {
                  return item.zonClsDc === '01'
              })
            : []
    }
}

export const AroundSalesModule = getModule(AroundSales)

<template>
    <PageBody>
        <div class="select-buisnessman-box">
            <DropdownBox
                id="dropdown-box01"
                label="사업자 선택"
                :hidden-label="true"
                :list="dropdownBoxList"
                default-value="전체"
                :disabled="false"
                @change="onChangeBusinessNumber"
            />
        </div>
        <Tab :list="tabList" type="solid" @change="onChangeTab">
            <div zclass="tab-inner">
                <div class="sales-detail-wrap">
                    <BaseInfo
                        :type="tabStatus"
                        :totalAmount="'1,000,000'"
                        date="6/24(목)"
                        :before="{ value: '3,000,000', increase: 'I' }"
                        :latest="{ value: '20,000', increase: 'I' }"
                    />

                    <div
                        class="chart"
                        style="height: 140px; margin-top: 30px; color: #000; text-align: center; line-height: 140px; background: #ebebeb"
                    >
                        차트영역
                    </div>

                    <AccoItemSingle title="최근 7일 평균">
                        <PriceList />
                    </AccoItemSingle>

                    <DepositHistory />
                </div>
            </div>
        </Tab>
    </PageBody>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import PriceList from '@components/sales/PriceList.vue'
import DepositHistory from '@components/sales/DepositHistory.vue'
import BaseInfo from '@components/sales/BaseInfo.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import type {
    SalesDailyParams,
    SalesWeeklyParams,
    SalesDayOfWeekParams,
    SalesDailyRes,
    SalesWeeklyRes,
    SalesDayOfWeekRes,
} from '@stores/modules/sales'

type TabStatus = 'daily' | 'weekly' | 'dayOfWeek'

const { Action, State } = namespace('sales')

@Component({
    components: {
        PriceList,
        DepositHistory,
        BaseInfo,
    },
})
export default class SalesHistory extends Vue {
    /** @Stores */
    @Action('getSalesDaily') readonly getSalesDaily!: (params?: SalesDailyParams) => Promise<void>
    @Action('getSalesWeekly') readonly getSalesWeekly!: (params?: SalesWeeklyParams) => Promise<void>
    @Action('getSalesDayOfWeek') readonly getSalesDayOfWeek!: (params?: SalesDayOfWeekParams) => Promise<void>
    @State('salesDaily') readonly salesDaily!: SalesDailyRes
    @State('salesWeekly') readonly salesWeekly!: SalesWeeklyRes
    @State('salesDayOfWeek') readonly salesDayOfWeek!: SalesDayOfWeekRes

    /** @Data */

    /** 현제 선택된 탭 */
    private tabStatus: TabStatus = 'daily'

    /** 탭 리스트 */
    private tabList = [{ name: '일간' }, { name: '주간' }, { name: '요일별' }]

    /** 선택된 사업자 번호, 공백은 '전체' */
    private businessNumber = ''

    /** 현재 선택된 데이터(일간, 주간, 요일별) */
    get currentData() {
        const data = {
            daily: this.salesDaily,
            weekly: this.salesWeekly,
            dayOfWeek: this.salesDayOfWeek,
        }

        return data[this.tabStatus]
    }

    /**
     * 사업자 번호 변경 시
     * @param {string} businessNumber 사업자 번호
     */
    onChangeBusinessNumber(businessNumber: string) {
        const dispatch = this.dispatch(this.tabStatus)
        dispatch({ bzno: businessNumber })
        this.businessNumber = businessNumber
    }

    /** 탭 전환 시 */
    onChangeTab(value: number) {
        const tabStatusList: TabStatus[] = ['daily', 'weekly', 'dayOfWeek']
        const tabStatus = tabStatusList[value]
        const dispatch = this.dispatch(tabStatus)
        dispatch({ bzno: this.businessNumber })
        this.tabStatus = tabStatus
    }

    dispatch(status: TabStatus) {
        const dispatches = {
            daily: this.getSalesDaily,
            weekly: this.getSalesWeekly,
            dayOfWeek: this.getSalesDayOfWeek,
        }
        return dispatches[status]
    }

    /** @Lifecycle */

    async mounted() {
        await this.getSalesDaily()
    }

    /**
     * ===============================================================================
     * 개발 전 소스
     */

    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: '전체', value: 'all', selected: true },
        {
            displayName: '이층집 강남점 222-20-2222',
            value: 'LOCA MONEY:BIZ 7*3*',
        },
        {
            displayName: '이층집 강남점 222-20-2222',
            value: '가장최근에 받은 카드가 디폴트로 노출',
        },
    ]
}
</script>

<style lang="scss" scoped src="./SalesHistory.scss"></style>

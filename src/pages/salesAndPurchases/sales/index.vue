<template>
    <PageBody>
        <div class="select-buisnessman-box">
            <DropdownBox
                v-if="!!merchantList"
                id="dropdown-box01"
                :list="merchantList"
                :disabled="false"
                label="사업자 선택"
                hidden-label
                default-value=""
                @select="onChangeBusinessNumber"
            />
        </div>
        <Tab :list="tabList" type="solid" @change="onChangeTab">
            <div class="tab-inner">
                <div class="sales-detail-wrap">
                    <BaseInfo
                        :type="status"
                        :totalAmount="salesTotalAmount"
                        :date="salesBaseDate"
                        :before="salesBefore"
                        :latest="salesLatest"
                    />

                    <div
                        class="chart"
                        style="height: 140px; margin-top: 30px; color: #000; text-align: center; line-height: 140px; background: #ebebeb"
                    >
                        차트영역
                    </div>

                    <AccoItemSingle :title="salesLatestAverageTitle" :expanded.sync="salesListOfPeridoExpanded">
                        <PriceList
                            :list="salesListOfPerido"
                            :status="status"
                            :average="salesLatestAverage"
                            :standard-date="salesBaseDatePerDay"
                            @change-dayofweek="changeDayOfWeek"
                        />
                    </AccoItemSingle>

                    <DepositHistory :list="salesList" />
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
import type {
    Status,
    IncreaseValue,
    SalesFourWeeksPerDayParams,
    DepositDayOfWeekParams,
    DepositWeeklyParams,
    DepositDailyParams,
} from '@stores/modules/sales'
import type { BottomSheetOptionItem } from '@components/common/BottomSheet.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

const { Action, State, Mutation, Getter } = namespace('sales')

@Component({
    components: {
        PriceList,
        DepositHistory,
        BaseInfo,
    },
})
export default class SalesHistory extends Vue {
    /** @Stores */

    /** 사업장 정보 */
    @Getter('workingPlaceList') readonly workingPlaceList!: DropdownBoxList

    /** 매출 일간 요청 */
    @Action('getSalesDaily')
    readonly getSalesDaily!: (params?: DepositDailyParams) => Promise<void>

    /** 매출 주간 요청 */
    @Action('getSalesWeekly')
    readonly getSalesWeekly!: (params?: DepositWeeklyParams) => Promise<void>

    /** 매출 요일별 요청 */
    @Action('getSalesDayOfWeek')
    readonly getSalesDayOfWeek!: (params?: DepositDayOfWeekParams) => Promise<void>

    /** 매출내역>요일별최근4주매출 */
    @Action('getSalesFourWeeksPerDay')
    readonly getSalesFourWeeksPerDay!: (params: SalesFourWeeksPerDayParams) => Promise<void>

    /** 현재 탭상태 변경 */
    @Mutation('changeStatus')
    readonly changeStatus!: (status: Status) => void

    /** 현재 탭 산태 */
    @State('status')
    readonly status!: Status

    /** 총 매출 */
    @Getter('salesTotalAmount')
    readonly salesTotalAmount!: string

    /** 기준 기간 또는 날짜 */
    @Getter('salesBaseDate')
    readonly salesBaseDate!: string

    /** 이전 대비 */
    @Getter('salesBefore')
    readonly salesBefore!: IncreaseValue

    /** 최근 대비 */
    @Getter('salesLatest')
    readonly salesLatest!: IncreaseValue

    /** 매출 리스트 */
    @Getter('salesListOfPerido')
    readonly salesListOfPerido!: { date: string; amount: string }[]

    /** 최근 평균 매출 */
    @Getter('salesLatestAverage')
    readonly salesLatestAverage!: string

    /** 매출 내역 */
    @Getter('salesList')
    readonly salesList!: {
        card: string
        cashReceipt: string
        delivery: string
    }

    /** 요일별 기준 날짜 */
    @Getter('salesBaseDatePerDay')
    readonly salesBaseDatePerDay!: string

    /** @Data */

    /** 탭 리스트 */
    private tabList = [{ name: '일간' }, { name: '주간' }, { name: '요일별' }]

    /** 선택된 사업자 번호, 공백은 '전체' */
    private businessNumber = ''

    /** 가맹점 리스트 */
    private merchantList: BottomSheetOptionItem[] = [{ displayName: '전체', value: '', selected: true }]

    /** 기간별 매출 리스트 노출 확장 여부 */
    private salesListOfPeridoExpanded = false

    /** 현재 상태가 요일별 인지 */
    get isDayOfWeek(): boolean {
        return this.status === 'dayOfWeek'
    }

    /** 최근 평균 매출 리스트 타이틀 */
    get salesLatestAverageTitle(): string {
        const cases = {
            daily: '최근 7일 평균',
            weekly: '최근 4주 평균',
            dayOfWeek: '최근 요일별 평균',
        }
        return cases[this.status]
    }

    /**
     * 사업자 번호 변경 시
     * @param {string} businessNumber 사업자 번호
     */
    onChangeBusinessNumber(businessNumber: string) {
        const dispatch = this.dispatch(this.status)
        dispatch({ bzno: businessNumber })
        this.businessNumber = businessNumber
    }

    /** 탭 전환 시 */
    onChangeTab(value: number) {
        const tabStatusList: Status[] = ['daily', 'weekly', 'dayOfWeek']
        const tabStatus = tabStatusList[value]
        const dispatch = this.dispatch(tabStatus)
        dispatch({ bzno: this.businessNumber })
        this.changeStatus(tabStatus)
    }

    /** 상태 별 액션 */
    dispatch(status: Status) {
        const dispatches = {
            daily: this.getSalesDaily,
            weekly: this.getSalesWeekly,
            dayOfWeek: this.getSalesDayOfWeek,
        }
        return dispatches[status]
    }

    /**
     * 요일 변경
     * @param {string} stdt 선택한 기준일
     */
    async changeDayOfWeek(stdt: string) {
        await this.getSalesFourWeeksPerDay({
            bzno: this.businessNumber,
            stdt,
        })
    }

    /** @Lifecycle */

    async mounted() {
        // 사업자 정보 세팅
        this.merchantList = this.merchantList.concat(this.workingPlaceList)
        // 매출 일간 정보 요청
        await this.getSalesDaily()
    }
}
</script>

<style lang="scss" scoped src="../SalesHistory.scss"></style>

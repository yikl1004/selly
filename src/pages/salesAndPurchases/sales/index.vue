<template>
    <PageBody>
        <div class="select-buisnessman-box">
            <DropdownBox
                v-if="!!merchantList"
                id="dropdown-box01"
                type="large"
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
                        :parentType="parentType"
                        :type="status"
                        :totalAmount="salesTotalAmount"
                        :date="salesBaseDate"
                        :before="salesBefore"
                        :latest="salesLatest"
                    />

                    <div
                        class="chart"
                        style="
                            height: 100%;
                            width:95%;
                            margin-top: 30px;
                            color: #000;
                            text-align: center;
                            <!-- line-height: 140px; -->
                            background: #ebebeb;
                        "
                    >
                        <LineChart
                            :chartData="datacollection"
                            :options="chartOption"
                            :width="320"
                            :height="200"
                        />
                    </div>

                    <AccoItemSingle
                        :title="salesLatestAverageTitle"
                        :expanded.sync="salesListOfPeridoExpanded"
                    >
                        <PriceList
                            :list="salesListOfPerido"
                            :status="status"
                            :title="salesLatestAverageTitle"
                            :average="salesLatestAverage"
                            :standard-date="salesBaseDatePerDay"
                            @change-dayofweek="changeDayOfWeek"
                        />
                    </AccoItemSingle>

                    <BannerAffiliate :list="dailyBannerList" />

                    <DepositHistory :list="salesList" />
                </div>
            </div>
        </Tab>
    </PageBody>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PriceList from '@components/sales/PriceList.vue'
import LineChart from '@components/common/LineChart.vue'
import DepositHistory from '@components/sales/DepositHistory.vue'
import BaseInfo from '@components/sales/BaseInfo.vue'
import { Status, SalesModule } from '@stores/modules/sales'
import Chart from 'chart.js'

@Component({
    components: {
        LineChart,
        PriceList,
        DepositHistory,
        BaseInfo,
    },
})
export default class SalesHistory extends Vue {
    /** @Stores */

    /** 사업장 정보 */
    get workingPlaceList() {
        return SalesModule.workingPlaceList
    }

    /** 현재 탭 산태 */
    get status() {
        return SalesModule.currentStatus
    }

    /** 총 매출 */
    get salesTotalAmount() {
        return SalesModule.salesTotalAmount
    }

    /** 기준 기간 또는 날짜 */
    get salesBaseDate() {
        return SalesModule.salesBaseDate
    }

    /** 이전 대비 */
    get salesBefore() {
        return SalesModule.salesBefore
    }

    /** 최근 대비 */
    get salesLatest() {
        return SalesModule.salesLatest
    }

    /** 매출 리스트 */
    get salesListOfPerido() {
        return SalesModule.salesListOfPerido
    }

    /** 최근 평균 매출 */
    get salesLatestAverage() {
        return SalesModule.salesLatestAverage
    }

    /** 매출 내역 */
    get salesList() {
        return SalesModule.salesList
    }

    /** 요일별 기준 날짜 */
    get salesBaseDatePerDay() {
        return SalesModule.salesBaseDatePerDay
    }

    /** 일간 매출 - 배너 정보 */
    get dailyBannerList() {
        return SalesModule.dailyBannerList
    }

    /** @Data */
    /**  현재 메뉴  매츨/ 입금 */
    private parentType = '매출'
    /** 탭 리스트 */
    private datacollection = {}
    private chartOption: Chart.ChartOptions = {}
    private tabList = [{ name: '일간' }, { name: '주간' }, { name: '요일별' }]

    /** 선택된 사업자 번호, 공백은 '전체' */
    private businessNumber = ''

    /** 가맹점 리스트 */
    private merchantList: BottomSheetOptionItem[] = [
        { displayName: '전체', value: '', selected: true },
    ]

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
    /** 차트 타입 bar/line */
    get chartjsType(): string {
        const cases = {
            daily: 'line',
            weekly: 'bar',
            dayOfWeek: 'line',
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
    async onChangeTab(value: number) {
        const tabStatusList: Status[] = ['daily', 'weekly', 'dayOfWeek']
        const tabStatus = tabStatusList[value]
        const dispatch = this.dispatch(tabStatus)
        await dispatch({ bzno: this.businessNumber })
        SalesModule.changeStatus(tabStatus)
        value === 2 ? this.changeDayOfWeek(this.salesBaseDatePerDay) : null
        this.fillData()
    }

    /** 상태 별 액션 */
    dispatch(status: Status) {
        const dispatches = {
            daily: SalesModule.getSalesDaily,
            weekly: SalesModule.getSalesWeekly,
            dayOfWeek: SalesModule.getSalesDayOfWeek,
        }
        return dispatches[status]
    }

    /**
     * 요일 변경
     * @param {string} stdt 선택한 기준일
     */
    async changeDayOfWeek(stdt: string) {
        await SalesModule.getSalesFourWeeksPerDay({
            bzno: this.businessNumber,
            stdt,
        })
    }

    /** @Lifecycle */

    async mounted() {
        // 사업자 정보 세팅
        this.merchantList = this.merchantList.concat(this.workingPlaceList)
        // 매출 일간 정보 요청
        await SalesModule.getSalesDaily()
        this.fillData()
    }
    // SalesModule 데일리 초기화
    beforeDestroy() {
        SalesModule.changeStatus('daily')
    }
    /** @Methods */
    //차트 데이터
    fillData() {
        this.chartOption = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback(value, index, values) {
                                switch (index) {
                                    case values.length - 1:
                                        return '만원'
                                    default:
                                        return (
                                            Number(value) / 10000
                                        ).toLocaleString()
                                }
                            },
                        },
                    },
                ],
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                position: 'bottom',
                align: 'end',
                onClick(e) {
                    e.stopPropagation()
                },
            },
            tooltips: {
                enabled: false,
                // callbacks: {
                //     label(toolTipItem) {
                //         return Number(toolTipItem.value).toLocaleString()
                //     },
                // },
            },
        }
        this.datacollection = {
            labels: SalesModule.salesListOfPerido.map(obj => {
                return obj.date
            }),
            datasets: [
                {
                    label: this.salesLatestAverageTitle,
                    backgroundColor: '#666',
                    borderColor: '#666',
                    fill: false,
                    borderDash: [5, 5],
                    type: 'line',
                    lineTension: 0,
                    data: this.convertSalesLatestAverage(), //,
                },
                {
                    label: '금주',
                    backgroundColor: '#fa4123',
                    borderColor: '#fa4123',
                    fill: false,
                    type: this.chartjsType,
                    lineTension: 0,
                    barPercentage: 0.5,
                    categoryPercentage: 0.55,
                    // offset: false,
                    // borderDash: [5, 5],
                    data: SalesModule.salesListOfPerido.map(obj => {
                        return parseInt(obj.amount.replace(/,/g, ''), 10)
                    }),
                },
            ],
        }
    }
    convertSalesLatestAverage() {
        // 상태가 요일별때 l
        if (this.isDayOfWeek) {
            return SalesModule.salesListOfPerido.map(obj => {
                return parseInt(obj.average.replace(/,/g, ''), 10)
            })
        } else {
            return Array(SalesModule.salesListOfPerido.length).fill(
                parseInt(this.salesLatestAverage.replace(/,/g, ''), 10),
            )
        }
    }
    seperatePrice() {
        return
    }
}
</script>

<style lang="scss" scoped src="../SalesHistory.scss"></style>

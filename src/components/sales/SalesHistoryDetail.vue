<template>
    <div class="sales-detail-wrap">
        <div class="sales-day-info">
            <span class="day">6/24(목) 매출</span>
            <strong class="price">10,200,000원</strong>

            <ul class="compare">
                <li>
                    전일 대비
                    <strong class="compare-price up">
                        6,000,000원
                        <i class="ico"><span class="ir">오름</span></i>
                    </strong>
                </li>
                <li>
                    최근 7일 평균 대비
                    <strong class="compare-price down">
                        6,000,000원
                        <i class="ico"><span class="ir">내림</span></i>
                    </strong>
                </li>

                <li>
                    변화없음 케이스
                    <strong class="compare-price">
                        <i class="ico"><span class="ir">변화없음</span></i>
                    </strong>
                </li>
            </ul>
        </div>

        <div class="chart" style="height:140px;margin-top:30px;color:#000;text-align:center;line-height:140px;background:#ebebeb;">
            차트영역
        </div>

        <AccoItemSingle title="최근 7일 평균">
            <PriceList />
        </AccoItemSingle>

        <DepositHistory />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PriceList from '@components/sales/PriceList.vue'
import DepositHistory from '@components/sales/DepositHistory.vue'

interface Data {
    buttonField: string
    calendarField: string
    checkSingle: boolean
    secretNumber: string
    singleSelection: string
    switchButton: boolean
    textFieldPrimary: string
}

@Component({
    components: {
        PriceList,
        DepositHistory,
    },
})
export default class SalesHistoryDetail extends Vue {}
</script>

<style lang="scss" src="./SalesHistoryDetail.scss"></style>

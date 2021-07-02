<template>
    <div class="sales-detail-wrap">
        <div class="sales-day-info">
            <span class="day">6/24(목) 매출</span>
            <strong class="price">10,200,000원</strong>

            <ul class="compare">
                <li>
                    전일 대비
                    <strong class="compare-price up">6,000,000원</strong>
                </li>

                <li>
                    최근 7일 평균 대비
                    <strong class="compare-price down">6,000,000원</strong>
                </li>
            </ul>
        </div>

        <div class="chart" style="height:140px;margin-top:30px;color:#000;text-align:center;line-height:140px;background:#ebebeb;">
            차트영역
        </div>

        <AccoItem :list="accordionList" type="gray">
            <PriceList />
        </AccoItem>

        <DepositHistory />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccordionListItem } from '@components/common/AccoItem.vue'
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
export default class SalesHistoryDetail extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: '전체', value: 'all', selected: true },
        { displayName: '이층집 강남점 222-20-2222', value: 'LOCA MONEY:BIZ 7*3*' },
        { displayName: '이층집 강남점 222-20-2222', value: '가장최근에 받은 카드가 디폴트로 노출' },
    ]

    private tabList = [{ name: '일간' }, { name: '주간' }, { name: '요일별' }]

    private accordionList: AccordionListItem[] = [
        {
            title: '최근 7일 평균',
            desc: '',
        },
    ]

    private data: { [key: string]: object | number | string | boolean } = {
        dropdownBox: 'kt',
        buttonField: '확인',
        calendarField: new Date('2021.06.04'),
        checkSingle: true,
        secretNumber: '1234561',
        singleSelection: 'third',
        switchButton: true,
        textfieldPrimary: '테스트',
    }
    formChange(data: any) {
        this.data = data
    }

    onSubmit(data: any) {
        console.log(data)
    }
}
</script>

<style lang="scss" scoped src="./SalesHistoryDetail.scss"></style>

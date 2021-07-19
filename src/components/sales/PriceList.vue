<template>
    <div class="price-list">
        <div class="sales-week-avg">
            <span class="avg-tit">최근 7일 평균 매출</span>
            <em class="price"><strong>5,000,000</strong>원</em>
        </div>

        <div class="sales-week-avg select-type">
            <!--[D] 요일별일때 select-type 클래스 추가-->
            <span class="avg-tit">최근 4주</span>
            <DropdownBox
                id="dropdown-box01"
                label="요일 선택"
                :hidden-label="true"
                :list="dropdownBoxList"
                default-value="월요일"
                :disabled="false"
            />

            <em class="price">
                <span>평균</span>
                <strong>5,000,000</strong>원
            </em>
        </div>
        <ul>
            <li>
                <span>6/27 (일)</span>
                <em class="price"><strong>5,000,000</strong>원</em>
            </li>
            <li>
                <span>6/27 (일)</span>
                <em class="price"><strong>5,000,000</strong>원</em>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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
    components: {},
})
export default class PriceList extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: '월요일', value: 'mon', selected: true },
        { displayName: '화요일', value: 'tue' },
        { displayName: '수요일', value: 'wed' },
        { displayName: '목요일', value: 'thu' },
        { displayName: '금요일', value: 'fri' },
        { displayName: '토요일', value: 'sat' },
        { displayName: '일요일', value: 'sun' },
    ]
}
</script>

<style lang="scss" scoped src="./PriceList.scss"></style>

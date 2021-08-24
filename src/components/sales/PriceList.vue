<template>
    <div class="price-list">
        <div
            v-if="isDayOfWeek"
            :class="['sales-week-avg', { 'select-type': isDayOfWeek }]"
        >
            <!--[D] 요일별일때 select-type 클래스 추가-->
            <div class="avg-tit-wrap">
                <span class="avg-tit">최근 4주 평균</span>
                <em class="price">
                    <strong>{{ average }}</strong>
                    원
                </em>
            </div>
            <DropdownBox
                v-if="!!weekList.length"
                id="dropdown-box01"
                :list="weekList"
                :disabled="false"
                label="요일 선택"
                :default-value="currentDate"
                hidden-label
                @select="onSelectDayofweek"
            />
        </div>
        <div v-else class="sales-week-avg">
            <span class="avg-tit">최근 7일 평균 매출</span>
            <em class="price">
                <strong>{{ average }}</strong>
                원
            </em>
        </div>
        <ul>
            <li
                v-for="(item, index) in list"
                :key="`sales-price-list-${index}`"
            >
                <span>{{ item.date }}</span>
                <em class="price">
                    <strong>
                        {{ item.amount }}
                    </strong>
                    원
                </em>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import type { Status } from '@stores/modules/sales'

@Component
export default class PriceList extends Vue {
    /** 날짜별 평균 리스트 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: { date: string; amount: string }[]

    /** 현재 선택된 항목(일간, 주간, 요일별) */
    @Prop({ type: String, default: '', required: true })
    readonly status!: Status

    /** 최근 평균 */
    @Prop({ type: String, default: '' })
    readonly average!: string

    /** 기준일자 - 요일별 일때만 사용 */
    @Prop({ type: String, default: '', required: true })
    readonly standardDate!: string

    /** 현재 상태가 '요일별' 인지 */
    get isDayOfWeek(): boolean {
        return this.status === 'dayOfWeek'
    }

    /** 현재 요일 구하기 */
    get currentDate(): string {
        // YYYYMMDD
        return this.standardDate
    }

    /** 요일 리스트 */
    private weekList: DropdownBoxList = []

    /** 기준일자 변경 시 요일 리스트 갱신 */
    @Watch('standardDate')
    chageDate(value: string) {
        if (value) {
            this.setWeekList(value)
        }
    }

    setWeekList(value?: string) {
        const origin = this.$dayjs(value || this.standardDate)
        const week: DropdownBoxList = []
        for (let index = 0; index < 7; index += 1) {
            const computed = origin.subtract(index, 'day')
            week.push({
                displayName: computed.format('dddd'),
                value: computed.format('YYYYMMDD'),
            })
        }
        console.log('###########', week)
        this.weekList = week
    }

    onSelectDayofweek(value: string) {
        /**
         * 요일 변경 시 발생
         * @event change-dayofweek
         */
        this.$emit('change-dayofweek', value)
    }

    mounted() {
        this.setWeekList()
    }
}
</script>

<style lang="scss" scoped src="./PriceList.scss"></style>

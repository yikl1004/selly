<template>
    <div class="sales-day-info">
        <span class="day">{{ date }} 매출</span>
        <strong class="price">{{ totalAmount }}원</strong>
        <ul class="compare">
            <li>
                {{ beforeDatePrefix }} 대비
                <strong :class="['compare-price', beforeIconState.class]">
                    {{ before.value ? `${before.value}원` : '' }}
                    <i class="ico">
                        <span class="ir">{{ beforeIconState.text }}</span>
                    </i>
                </strong>
            </li>
            <li>
                {{ latestComparePrefix }} 평균 대비
                <strong :class="['compare-price', latestIconState.class]">
                    {{ latest.value ? `${latest.value}원` : '' }}
                    <i class="ico">
                        <span class="ir">{{ latestIconState.text }}</span>
                    </i>
                </strong>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import type { IncreaseValue, Status } from '@stores/modules/sales'

type IconState = {
    text: string
    class: string
}

/**
 * @description
 * 매출/입금 내역 중 상단에 기본정보를 노출
 */
@Component
export default class BaseInfo extends Vue {
    /** 유형 */
    @Prop({ type: String, default: 'daily', required: true })
    readonly type!: Status

    /** 매출 총액 */
    @Prop({ type: String, default: '0', required: true })
    readonly totalAmount!: string

    /** 날짜, 또는 기간 */
    @Prop({ type: String, default: '', required: true })
    readonly date!: string

    /** 전일, 전주, 전주해당요일 값 (값, 증감) */
    @Prop({
        type: Object,
        default: () => ({ value: '0', increase: 'D' }),
        required: true,
    })
    readonly before!: IncreaseValue

    /** 최근 7일, 최근 4주, 전주 값 (값, 증감) */
    @Prop({
        type: Object,
        default: () => ({ value: '0', increase: 'D' }),
        required: true,
    })
    readonly latest!: IncreaseValue

    /** 이전 대비 문구 */
    get beforeDatePrefix(): string {
        const prifixDictionary = {
            daily: '전일',
            weekly: '전주',
            dayOfWeek: '전주',
        }

        return prifixDictionary[this.type]
    }

    /** 최근 대비 문구 */
    get latestComparePrefix(): string {
        const prefixDictionary = {
            daily: '최근 7일',
            weekly: '최근 4주',
            dayOfWeek: '전주',
        }
        return prefixDictionary[this.type]
    }

    /** 이전 대비 문구 스타일 객체 */
    get beforeIconState(): IconState {
        return this.getIcon('before')
    }

    /** 이전 대비 문구 스타일 객체 */
    get latestIconState(): IconState {
        return this.getIcon('latest')
    }

    /**
     * 오름, 내림, 변화없음 표시를 위한 데이터를 반환(스타일)
     * @param {string} state    // 'before' | 'latest'
     * @return {object} text: string, class: string
     */
    getIcon(state: 'before' | 'latest'): IconState {
        const htmlList = {
            I: { text: '오름', class: 'up' },
            D: { text: '내림', class: 'down' },
            N: { text: '변화없음', class: '' },
        }

        return htmlList[this[state].increase]
    }
}
</script>

<style scoped lang="scss" src="./BaseInfo.scss"></style>

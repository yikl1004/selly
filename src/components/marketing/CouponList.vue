<template>
    <div v-if="!!list" class="coupon-preview-wrap">
        <button
            v-for="(item, index) in list"
            :key="`marketing-coupon-item-${index}`"
            type="button"
            class="coupon-preview-item"
            @click="onPreview(item.gubun)"
        >
            <div class="info">
                <strong>
                    [{{ getGubunText(item.gubun) }} 고객 만들기]
                    {{ item.discountRate }}% 결제일 할인
                    {{ _.toNumber(item.target).toLocaleString() }}명
                </strong>
                <span class="date">
                    {{ item.period }}
                </span>
            </div>
            <span class="btn-preview">미리보기</span>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface CouponItem {
    discountRate: string
    period: string
    target: string
    gubun: Gubun
}

type Gubun =
    | '1' // 첫 고객
    | '2' // 단골 고객

@Component
export default class CouponList extends Vue {
    /** 쿠폰 아이템 리스트 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: CouponItem

    getGubunText(gubun: Gubun) {
        return gubun === '1' ? '첫' : '단골'
    }

    /** 미리보기 팝업 */
    onPreview(gubun: Gubun) {
        /**
         * 미리보기 콜백
         * @event preview
         */
        this.$emit('preview', gubun)
    }
}
</script>

<style scoped></style>

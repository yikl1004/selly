<template>
    <div class="prediction-price-box">
        <div v-if="type" class="title-box">
            <strong>중도상환 결과</strong>
            <span class="date">21. 05. 25 14:05 기준</span>
        </div>

        <InfoList v-if="type" :list="infoList" />

        <div class="price-total">
            <span>{{ type === 'repayment' ? '상환후 대출 잔여금액' : '예상 상환금액' }}</span>
            <strong>500만원</strong>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PredictionPriceBox extends Vue {
    /**
     * @category Props
     */
    //중도상환(repayment) 케이스
    @Prop({ type: String })
    readonly type!: string

    private infoList = [
        {
            title: '상환금액',
            desc: '1,000,000원',
        },
        {
            title: '상환금액',
            desc: '1,000,000원',
        },
    ]
}
</script>

<style lang="scss" scoped src="./PredictionPriceBox.scss"></style>

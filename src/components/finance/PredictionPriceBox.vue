<template>
    <div class="prediction-price-box">
        <div v-if="type === 'repayment'" class="title-box">
            <strong>중도상환 결과</strong>
            <span class="date">21. 05. 25 14:05 기준</span>
        </div>

        <InfoList :list="infoList" />

        <div class="price-total">
            <span>{{ priceName }}</span>
            <strong>500만원</strong>
        </div>

        <div class="round-list">
            <div class="round-card">
                <div class="round-info">
                    <strong>1회차</strong>
                    <span class="date">21. 06. 01</span>
                    <strong class="price">5,500,000원</strong>
                </div>
                <ul>
                    <li>원금 50,000,000원</li>
                    <li>이자 27,354원</li>
                    <li>상환 후 잔액 33,500,000원</li>
                </ul>
            </div>
            <div class="round-card">
                <div class="round-info">
                    <strong>1회차</strong>
                    <span class="date">21. 06. 01</span>
                    <strong class="price">5,500,000원</strong>
                </div>
                <ul>
                    <li>원금 50,000,000원</li>
                    <li>이자 27,354원</li>
                    <li>상환 후 잔액 33,500,000원</li>
                </ul>
            </div>
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
    //중도상환 결과(repayment) /  /
    @Prop({ type: String })
    readonly type!: string

    @Prop({ type: String })
    readonly priceName!: string

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

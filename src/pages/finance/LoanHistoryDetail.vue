<template>
    <div class="container">
        <div class="loan-detail-wrap">
            <div class="loan-info">
                <div class="loan-title">
                    <Flag color="blue" text="상환중" />
                    <strong>LOCA MONEY Biz론</strong>
                </div>
                <div class="benefit">
                    <p>원리금균등방식 상환 대비 <br /><strong>85,745원 이자 감면 효과</strong>를 받고 있습니다.</p>
                </div>
            </div>

            <div class="proceeding-loan-box">
                <button type="button" class="btn-more-info">
                    <span>대출원금</span>
                    <em><strong>10,000,000</strong>원</em>
                </button>
                <div class="loan-price-info">
                    <InfoList />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LoanCard from '@components/finance/LoanCard.vue'
import AdditionalLoan from '@components/finance/AdditionalLoan.vue'

@Component({
    components: {
        LoanCard,
        AdditionalLoan,
    },
})
export default class LoanHistoryDetail extends Vue {}
</script>
<style scoped lang="scss" src="./LoanHistoryDetail.scss" />

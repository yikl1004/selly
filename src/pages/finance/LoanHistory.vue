<template>
    <div class="container no-padding">
        <CautionBox description="이용중인 내역이 없습니다" />

        <div class="loan-history-wrap">
            <AdditionalLoan />
            <div class="loan-history-list">
                <LoanCard />
                <LoanCard />

                <div class="btn-area">
                    <BasicButton type="medium">
                        추가상환
                    </BasicButton>
                    <BasicButton type="medium">
                        금리인하권
                    </BasicButton>
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
export default class LoanHistory extends Vue {}
</script>
<style scoped lang="scss" src="./LoanHistory.scss" />

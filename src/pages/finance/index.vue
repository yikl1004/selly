<template>
    <div class="container">
        <!-- 신용카드 인증 -->
        <!-- <CreditCardAuth :on-click="onClick" /> -->
        <LoanApply />
        <h1>Finance</h1>
        <p>금융 메인 페이지???</p>
        <BasciButton>예상 상환스케줄</BasciButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CreditCardAuth from '@pages/finance/CreditCardAuth.vue'
import LoanApply from '@pages/finance/LoanApply.vue'

@Component({
    components: {
        CreditCardAuth,
        LoanApply,
    },
})
export default class FinancePage extends Vue {
    /**
     * @category Data
     */
    onClick() {
        console.log('다음버튼 클릭')
    }
}
</script>

<style scoped></style>

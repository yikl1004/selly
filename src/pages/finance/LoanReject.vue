<template>
    <div class="container floating">
        <div class="content">
            <CautionBox
                type="complete"
                :title="`장기카드대출 이용을 거절하셨습니다.`"
                description="다시 이용을 원하시는 경우 장기카드대출 이용동의를 신청하세요."
            />
        </div>
        <portal to="floating">
            <BasicButton size="large"> 확인 </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoanCard from '@components/finance/LoanCard.vue'
import AdditionalLoan from '@components/finance/AdditionalLoan.vue'

@Component({
    components: {
        LoanCard,
        AdditionalLoan,
    },
})
export default class LoanReject extends Vue {}
</script>
<style scoped lang="scss" src="./LoanHistory.scss" />

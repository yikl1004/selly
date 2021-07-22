<template>
    <!-- 금소법 적합성 확인 -->
    <!-- <LoanCompatibility /> -->

    <!-- 가맹점 선택 -->
    <!-- <FranchiseeSelect /> -->

    <!--신청서-->
    <LoanApplication />

    <!--대출신청 약관동의-->
    <!-- <LoanApplyTerms /> -->

    <!-- 부가정보 -->
    <!-- <LoanAddInfo /> -->

    <!--대출 신청 완료-->
    <!-- <LoanApplyComplete /> -->

    <!--대출 신청 불가-->
    <!-- <LoanApplyFail /> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoanCompatibility from '@components/finance/LoanCompatibility.vue'
import FranchiseeSelect from '@components/finance/FranchiseeSelect.vue'
import LoanApplication from '@components/finance/LoanApplication.vue'
import LoanApplyTerms from '@components/finance/LoanApplyTerms.vue'
import LoanAddInfo from '@components/finance/LoanAddInfo.vue'
import LoanApplyComplete from '@components/finance/LoanApplyComplete.vue'
import LoanApplyFail from '@components/finance/LoanApplyFail.vue'

@Component({
    components: {
        LoanCompatibility,
        FranchiseeSelect,
        LoanApplication,
        LoanApplyTerms,
        LoanAddInfo,
        LoanApplyComplete,
        LoanApplyFail,
    },
})
export default class LoanApply extends Vue {}
</script>

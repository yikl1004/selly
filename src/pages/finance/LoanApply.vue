<template>
    <div>
        <!--대출 신청 완료-->
        <LoanApplyComplete />

        <!--대출 신청 불가-->
        <LoanApplyFail />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FranchiseeSelect from '@components/finance/FranchiseeSelect.vue'
import LoanApplication from '@components/finance/LoanApplication.vue'
import LoanApplyComplete from '@components/finance/LoanApplyComplete.vue'
import LoanApplyFail from '@components/finance/LoanApplyFail.vue'

@Component({
    components: {
        FranchiseeSelect,
        LoanApplication,
        LoanApplyComplete,
        LoanApplyFail,
    },
})
export default class LoanApply extends Vue {}
</script>

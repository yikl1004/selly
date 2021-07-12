<template>
    <div class="additional-loan-wrap">
        <div class="additional-loan-box">
            <div class="text">
                <strong>17,500,000원</strong> 까지<br />
                추가대출가능합니다.
            </div>
            <BasicButton type="small">
                추가 대출
            </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoanCard extends Vue {}
</script>

<style scoped lang="scss" src="./AdditionalLoan.scss" />

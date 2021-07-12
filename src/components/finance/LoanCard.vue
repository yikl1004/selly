<template>
    <Anchor class="loan-card" href="/">
        <div class="top-info">
            <Flag color="blue" text="상환중" />
            <strong>LOCA MONEY Biz론</strong>
        </div>
        <ul>
            <li>
                <span class="subject">대출원금</span>
                <strong class="cont">50,000,000원</strong>
            </li>
            <li>
                <span class="subject">신청일</span>
                <strong class="cont">2021. 04. 01</strong>
            </li>
        </ul>
        <div class="btm-info">
            <span>만기일 22.03.01 (12개월)</span>
        </div>
    </Anchor>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoanCard extends Vue {}
</script>

<style scoped lang="scss" src="./LoanCard.scss" />

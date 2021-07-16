<template>
    <div class="popup-repayment-info">
        <p>회원 개인의 신용상태와 신청금액에 따라 이용 가능한 상환 방법이 다를 수 있습니다.</p>

        <div class="repayment-info-box">
            <strong>원리금균등상환</strong>
            <p>상환기간 중 매월 동일한 원리금 납부</p>
            <p>3 ~ 60개월 중 선택</p>
            <div class="img-box">
                <img src="/assets/finance/img-graph01.svg" alt="" />
            </div>

            <BulletList :list="commonInfo" />
        </div>
        <div class="repayment-info-box">
            <strong>거치후원리금균등상환</strong>
            <p>선택한 거치 기간만큼 이자만 납부</p>
            <p>0 ~ 최대 6개월 회원님의 신용에 따라 거치기간 선택가능</p>
            <p>거치기간 제외 60개월까지 대출가능</p>

            <div class="img-box">
                <img src="/assets/finance/img-graph02.svg" alt="" />
            </div>

            <BulletList :list="commonInfo" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PopupRepaymentInfo extends Vue {
    private commonInfo = [{ text: '회원 개인의 신용에 따라 최대대출기간은 달라질 수 있습니다.' }]
}
</script>

<style lang="scss" scoped src="./PopupRepaymentInfo.scss"></style>

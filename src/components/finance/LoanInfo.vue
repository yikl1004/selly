<template>
    <div class="loan-info-wrap">
        <div class="loan-info">
            <div class="loan-title">
                <Flag color="blue" text="상환중" />
                <Flag color="brown" text="신청" />
                <strong>LOCA MONEY Biz론</strong>
            </div>
            <div class="benefit">
                <p>원리금균등방식 상환 대비 <br /><strong>85,745원 이자 감면 효과</strong>를 받고 있습니다.</p>
            </div>
        </div>

        <div class="proceeding-loan-box" :class="{ active: toggle }">
            <strong class="title">대출원금</strong>
            <button type="button" class="btn-more-info" @click="onToggle">
                <em><strong>10,000,000</strong>원</em>
            </button>
            <div class="loan-price-info">
                <InfoList :list="infoList" />
            </div>
            <div class="price-box">
                <ul>
                    <li>상환원금 <strong>1,600,000원</strong></li>
                    <li>대출잔액 <strong>7,400,000원</strong></li>
                </ul>
            </div>
        </div>

        <BasicButton type="medium" @click="openModifyPopup">
            대출상환 변경
        </BasicButton>

        <BasicButton type="medium" @click="openPrepaymentPopup">
            중도상환 계산기
        </BasicButton>

        <!--[D] 팝업 : 대출상환 변경-->
        <FullPopup
            :show.sync="popModifyShow"
            title="대출상환 변경"
            :button-text="{ confirm: '적용' }"
            type="popup"
            @confirm="onModifyConfirm"
        >
            <PopupModifyLoan />
        </FullPopup>

        <!--[D] 팝업 : 중도상환 계산-->
        <FullPopup
            :show.sync="popPrepaymentShow"
            title="중도상환 계산"
            :button-text="{ confirm: '확인' }"
            type="popup"
            @confirm="onPrepaymentConfirm"
        >
            <PopupPrepayment />
        </FullPopup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PopupModifyLoan from '@components/finance/PopupModifyLoan.vue'
import PopupPrepayment from '@components/finance/PopupPrepayment.vue'

@Component({
    components: { PopupModifyLoan, PopupPrepayment },
})
export default class LoanInfo extends Vue {
    private infoList = [
        {
            title: '대출 연 이자율',
            desc: '4.95%',
        },
        {
            title: '대출 기간',
            desc: '21.04.01(12개월)',
        },
    ]
    // s: popup
    private popModifyShow: boolean = false
    openModifyPopup() {
        this.popModifyShow = true
    }
    onModifyConfirm() {
        this.popModifyShow = false
    }

    // e: popup

    // s: popup
    private popPrepaymentShow: boolean = false
    openPrepaymentPopup() {
        this.popPrepaymentShow = true
    }
    onPrepaymentConfirm() {
        this.popPrepaymentShow = false
    }

    // e: popup

    private toggle: boolean = false
    /**
     * @category Methods
     */
    onToggle() {
        this.toggle = !this.toggle
    }
}
</script>

<style scoped lang="scss" src="./LoanInfo.scss" />

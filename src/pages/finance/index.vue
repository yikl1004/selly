<template>
    <div v-if="isMain" class="container">
        <div class="content">
            <h1>금융 안내페이지</h1>
            <p>기획 업데이트 준비중</p>

            <br /><br />
            <BasicButton size="large" @click="openConsentPopup">
                이용동의
            </BasicButton>
            <br />
            <BasicButton size="large" @click="openSchedulePopup">
                예상 상환스케줄
            </BasicButton>
            <br />
            <BasicButton size="large" @click="openModal">
                모달 체크
            </BasicButton>
            <br />
            <BasicButton size="large" @click="openRefusalPopup">
                장기카드 대출 이용거절
            </BasicButton>
        </div>
        <!--[D] 이용동의 팝업 -->
        <FullPopup
            :show.sync="popConsentShow"
            title="장기카드 이용동의"
            :button-text="{ confirm: '이용동의' }"
            type="popup"
            @confirm="onConsentConfirm"
        >
            <PopupConsent />
        </FullPopup>
        <!--//[D] 이용동의 팝업 -->

        <!--[D] 장기카드 대출 이용거절 팝업 -->
        <!-- <FullPopup
            :show.sync="popRefusalShow"
            title="장기카드 대출 이용거절"
            :button-text="{ confirm: '동의' }"
            type="popup"
            @confirm="onRefusalConfirm"
        >
            <PopupRefusal />
        </FullPopup> -->
        <!--//[D] 장기카드 대출 이용거절 팝업 -->

        <!--[D] 예상 상환스케줄 팝업 -->
        <!-- <FullPopup
            :show.sync="popScheduleShow"
            title="예상 상환스케줄"
            :button-text="{ confirm: '확인' }"
            type="popup"
            @confirm="onScheduleConfirm"
        >
            <PopupRepaySchedule />
        </FullPopup> -->
        <!--//[D] 예상 상환스케줄 팝업 -->

        <!--[D] 최초 장기대출 신청시 알림팝업 -->
        <Modal :show.sync="modalShow" :button-text="{ confirm: '확인' }" type="popup" @confirm="onConfirmModal">
            <p>
                당사 장기카드대출을 처음 이용하실 경우, <br />회원님의 안전한 장기카드대출 이용을 위해 일일 3백만원 이상 신청시 대출신청
                완료 후<br />2시간 지연입금됩니다. <br />단, 은행시스템 점검으로 인해 당일 23:30~00:30까지 입금 건의 경우 점검 완료 후 입금
                처리 되며 은행 사정에 따라 입금 지연 또는 취소 될 수 있으니 반드시 입금통장을 확인해 주시기 바랍니다.
            </p>
        </Modal>
        <!--//[D] 최초 장기대출 신청시 알림팝업 -->
    </div>
    <router-view v-else />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CreditCardAuth from '@pages/finance/CreditCardAuth.vue'
import LoanApply from '@pages/finance/LoanApply.vue'
import PopupConsent from '@components/finance/PopupConsent.vue'
import PopupRefusal from '@components/finance/PopupRefusal.vue'
import PopupRepaySchedule from '@components/finance/PopupRepaySchedule.vue'

@Component({
    components: {
        CreditCardAuth,
        LoanApply,
        PopupConsent,
        PopupRefusal,
        PopupRepaySchedule,
    },
})
export default class FinancePage extends Vue {
    // s: popup 장기카드 이용동의
    private popConsentShow: boolean = false
    openConsentPopup() {
        this.popConsentShow = true
    }
    onConsentConfirm() {
        this.popConsentShow = false
    }
    // e: popup

    // s: popup 장기카드 대출 이용거절
    private popRefusalShow: boolean = false
    openRefusalPopup() {
        this.popRefusalShow = true
    }
    onRefusalConfirm() {
        this.popRefusalShow = false
    }
    // e: popup

    // s: popup 장기카드 대출 이용거절
    private popScheduleShow: boolean = false
    openSchedulePopup() {
        this.popScheduleShow = true
    }
    onScheduleConfirm() {
        this.popScheduleShow = false
    }
    // e: popup

    /** 모달 노출 */
    private modalShow: boolean = false
    openModal() {
        this.modalShow = true
    }
    onConfirmModal() {
        this.modalShow = false
    }

    /**
     * @category Data
     */
    onClick() {
        console.log('다음버튼 클릭')
    }

    get isMain() {
        return this.$route.name === 'Finance'
    }
}
</script>

<style scoped></style>

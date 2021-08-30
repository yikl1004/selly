<template>
    <footer class="footer">
        <ul class="terms-list">
            <li>
                <button type="button" @click="openTermsUse">이용약관</button>
            </li>
            <li>
                <button type="button" @click="openTermsPrivacy">
                    개인정보처리방침
                </button>
            </li>
        </ul>
        <address class="footer-info">
            <p>롯데카드(주) 대표이사 조좌진</p>
            <p>사업자등록번호 120-81-54231</p>
            <p>서울특별시 종로구 새문안로 76</p>

            <p class="copyright">Supported by LOTTECARD All rights reserved</p>
        </address>

        <!--[D] 이용약관 팝업 -->
        <FullPopup
            :show.sync="popTermsUse"
            title="이용약관"
            type="popup"
            :button-text="{ confirm: '확인' }"
            @confirm="onTermsUseConfirm"
        >
            <PopupTermsUse />
        </FullPopup>
        <!--//[D] 이용약관 팝업 -->

        <!--[D] 개인정보처리방침 팝업 -->
        <FullPopup
            :show.sync="popTermsPrivacy"
            title="개인정보처리방침"
            type="popup"
            :button-text="{ confirm: '확인' }"
            @confirm="onTermsPrivacyConfirm"
        >
            <PopupTermsPrivacy />
        </FullPopup>
        <!--//[D] 개인정보처리방침 팝업 -->
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
    // s: popup 이용약관
    private popTermsUse = false
    openTermsUse() {
        this.popTermsUse = true
    }
    onTermsUseConfirm() {
        this.popTermsUse = false
    }
    // e: popup 이용약관

    // s: popup 개인정보처리방침
    private popTermsPrivacy = false
    openTermsPrivacy() {
        this.popTermsPrivacy = true
    }
    onTermsPrivacyConfirm() {
        this.popTermsPrivacy = false
    }
    // e: popup 개인정보처리방침
}
</script>

<style scoped lang="scss" src="./Footer.scss"></style>

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
    </footer>
</template>

<script lang="ts">
import { Path } from '@router/routes'
import { Component, Vue } from 'vue-property-decorator'

/**
 * @description
 * 하단 footer를 노출
 */
@Component
export default class Footer extends Vue {
    /** 이용약관 으로 이동 */
    openTermsUse() {
        this.toTerms('policy')
    }

    /** 개인정보처리방침으로 이동 */
    openTermsPrivacy() {
        this.toTerms('privacy')
    }

    /** 약관 이동 */
    toTerms(flag: 'privacy' | 'policy') {
        this.$router.push({
            ...Path.TermsDetail,
            query: {
                comGrpC: `${flag === 'privacy' ? 'AGR_MBR' : 'AGR_COM'}`,
                comC: 'PRV_1',
            },
        })
    }
}
</script>

<style scoped lang="scss" src="./Footer.scss"></style>

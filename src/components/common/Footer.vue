<template>
    <footer class="footer">
        <ul class="terms-list">
            <li>
                <button type="button" @click="toTerms('policy')">
                    이용약관
                </button>
            </li>
            <li>
                <button type="button" @click="toTerms('privacy')">
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
    /** 약관 이동 */
    toTerms(flag: 'privacy' | 'policy') {
        this.$router.push({
            ...Path.TermsDetail,
            query: {
                comGrpC: 'AGR_COM',
                comC: `${flag === 'privacy' ? 'PRV_2' : 'PRV_1'}`,
                direct: 'true',
                access: 'internal',
            },
        })
    }
}
</script>

<style scoped lang="scss" src="./Footer.scss"></style>

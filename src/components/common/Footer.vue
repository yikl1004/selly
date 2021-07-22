<template>
    <footer class="footer">
        <h2 class="logo-footer">
            <span class="ir">Selly 푸터 로고</span>
        </h2>

        <address class="footer-info">
            <p>셀리 | 대표이사 조좌진</p>
            <p>사업자등록번호 123-45-67890</p>
            <p>서울특별시 종로구 새문안로 76 롯데카드 본사</p>

            <p class="copyright">Copyright. LOTTE CARD All rights reserved</p>
        </address>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>

<style scoped lang="scss" src="./Footer.scss"></style>

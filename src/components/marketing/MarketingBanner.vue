<template>
    <!--[P] 하드코딩 배너-->
    <Anchor href="/" class="marketing-banner">
        <div class="banner-inner">
            <span>Selly와 함께</span>
            <strong>매출 상승의<br />방법을 찾아보세요!</strong>
        </div>
    </Anchor>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MarketingBanner extends Vue {}
</script>

<style scoped lang="scss" src="./MarketingBanner.scss"></style>

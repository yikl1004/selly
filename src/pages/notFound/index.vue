<template>
    <Page class="error">
        <i class="error-icon" />
        <h2 class="error-title">요청하신 페이지를<br />찾을 수 없습니다.</h2>
        <p class="error-description">
            서비스 이용에 불편을 드려서 죄송합니다.
            <br />
            페이지 주소를 다시 확인해주세요.
        </p>
        <BasicButton type="large" @click="() => $router.push({ name: 'Main' })"> 메인으로 가기 </BasicButton>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * TODO: 404 페이지. 아직 디자인이없음
 */
@Component
export default class NotFoundPage extends Vue {
    /** @Props */
    /** @Methods */
}
</script>

<style scoped lang="scss">
.error {
    letter-spacing: -0.5px;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;

    &-icon {
        display: block;
        width: 48px;
        height: 48px;
        background-image: url('/assets/icon/icon-caution-empty.svg');
        background-size: cover;
        margin-bottom: 24px;
    }
    &-title {
        font-size: 20px;
        font-weight: bold;
        line-height: 1.4;
        color: #222222;
        margin-bottom: 8px;
    }
    &-description {
        font-size: 14px;
        line-height: 1.57;
        color: #666666;
        margin-bottom: 20px;
    }
}
</style>

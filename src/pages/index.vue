<template>
    <Page>
        <Header type="main" />
        <div class="page-main-wrap">
            <h2>메인 페이지</h2>
        </div>
    </Page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import type { MainInfo } from '@stores/modules/auth'

const { Action: AuthAction, State: AuthState } = namespace('auth')

@Component
export default class MainPage extends Vue {
    /** @Stores */
    @AuthAction('getMainInfo') readonly getMainInfo!: Function
    @AuthState('mainInfo') readonly mainInfo!: MainInfo

    /** @Watch */

    @Watch('mainInfo', { deep: true })
    changeMainInfo(value: MainInfo /* oldValue: MainInfo */) {
        if (value.rc === '8888') {
            console.log('로그인 필요한 사용자 > 로그인 페이지로 이동')
            this.$router.push({ name: 'Main' })
        }
    }
}
</script>

<style scoped lang="scss">
.page-login-wrap {
    padding: 0 24px 60px;
    .btn-kakao-login {
        display: block;
        width: 100%;
        height: 60px;
        border-radius: 10px;
        background-color: #ffe403;
        font-size: 16px;
        color: #3f1d1d;
        text-align: center;
        font-weight: 500;
        span {
            display: inline-block;
            position: relative;
            padding-left: 38px;
            &:before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 50%;
                width: 36px;
                height: 36px;
                margin-top: -18px;
                background: url('/assets/icon/icon-kakao.svg') no-repeat;
            }
        }
    }
}

.page-main-wrap {
    padding-top: 56px;
    min-height: calc(100vh - 216px);
}
</style>

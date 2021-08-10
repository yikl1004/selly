<template>
    <Page>
        <Header type="main" />
        <PageBody>
            <div class="page-main-wrap">
                <h2>메인 페이지</h2>
                <div>{{ info }}</div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import PageView from '@utils/mixins/PageView'
import type { MainInfo } from '@stores/modules/auth'

const { Action: AuthAction, State: AuthState } = namespace('auth')

@Component
export default class MainPage extends Mixins(PageView) {
    /** @Stores */
    @AuthAction('getMainInfo') readonly getMainInfo!: Function
    @AuthState('mainInfo') readonly mainInfo!: MainInfo

    /** @Computed */
    get info() {
        return JSON.stringify(this.mainInfo, null, 4)
    }

    created() {
        this.getMainInfo()
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

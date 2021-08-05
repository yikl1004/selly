<template>
    <Page>
        <PageBody>
            <div class="page-login-wrap">
                <div style="height: 500px; background: #2b2b2b; text-align: center; line-height: 500px">상단 비주얼 추가 작업 예정</div>
                <button type="button" class="btn-kakao-login" @click="() => login()">
                    <span>카카오톡으로 시작</span>
                </button>
                <button type="button" class="btn-kakao-login" @click="withdraw">
                    <span>연결끊기(탈퇴) - 테스트용</span>
                </button>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import store from '@stores/index'
import type { LoginInfo, UserInfo } from '@stores/modules/auth'
import PageView from '@utils/mixins/PageView'

const { Mutation, Action, State } = namespace('auth')

@Component({
    beforeRouteEnter(to, from, next) {
        const alreadyLogin = store.state.common.loginExtendInfo?.rc === '0000'
        next(alreadyLogin ? { name: 'Main' } : undefined)
    },
})
export default class LoginPage extends Mixins(PageView) {
    /**
     * @category Use store
     */

    // [ store ]: auth
    @Mutation('setUserInfo') readonly setUserInfo!: (userInfo: UserInfo) => void
    @Action('getLoginInfo') readonly getLoginInfo!: Function
    @State('loginInfo') readonly loginInfo!: LoginInfo

    /** @category Watch */

    // 로그인 정보에 따라 화면을 이동한다
    @Watch('loginInfo')
    changeLoginInfo(value: LoginInfo /* oldValue: LoginInfo | null */) {
        switch (value?.rspDc) {
            // 최초 회원가입, 사업자확인으로 이동(가입 절차)
            case '01':
                this.$router.push({ name: 'Join', params: { step: '1' } })
                break
            // 기존가입자: 메인으로 이동
            case '02':
                this.$router.push({ name: 'Main' })
                break
            // 가입불가 대상
            case '03':
                this.$router.push({ name: 'Join', params: { step: '-1' } })
                break
            default:
                break
        }
    }

    /** @category Methods */

    async login() {
        /**
         * 로그인 창을 띄웁니다.
         * @reference https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference
         */

        // 1. 카카오 로그인 요청
        await this.$kakaoSdk.login()
        // 2. 카카오 로그인 사용자 정보 요청
        const kakaoUserInfoResponse = await this.$kakaoSdk.userInfo()
        // 3. 동의한 약관 항목 요청
        const kakaoAgreedList = await this.$kakaoSdk.agreedList()
        // 4. Mutation: Selly 로그인 API 요청 Parameter 세팅
        this.setUserInfo({
            ...kakaoUserInfoResponse,
            ...kakaoAgreedList,
        })
        // 5. Action: Selly 로그인 API 요청
        await this.getLoginInfo()
    }

    // TODO: 임시 사용, 삭제 요망
    withdraw() {
        this.$kakaoSdk && this.$kakaoSdk.unlink()
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
</style>

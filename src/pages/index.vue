<template>
    <div v-if="!isLogin" class="main">
        <h2>메인 페이지</h2>
    </div>
    <div v-else class="page-login-wrap">
        <div
            style="
                height: 500px;
                background: #2b2b2b;
                text-align: center;
                line-height: 500px;
            "
        >
            상단 비주얼 추가 작업 예정
        </div>
        <button type="button" class="btn-kakao-login" @click="() => login()">
            <span>카카오톡으로 시작</span>
        </button>
        <button type="button" class="btn-kakao-login" @click="withdraw">
            <span>연결끊기(탈퇴) - 테스트용</span>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import store from '@stores/index'
import type { LoginInfo, MainInfo, UserInfo } from '@stores/modules/auth'
import type { HeaderType } from '@stores/modules/ui'
import type { RawLocation } from 'vue-router'

const {
    Mutation: AuthMutation,
    Action: AuthAction,
    State: AuthState,
} = namespace('auth')
const { Mutation: UIMutation } = namespace('ui')

@Component({
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('auth/getMainInfo')
        const mainInfo = store.state.auth.mainInfo

        if (mainInfo?.rc === '8888') {
            store.commit('ui/setVisibleHeader', false)
        } else {
            store.commit('ui/setHeaderType', 'main')
            store.commit('ui/setVisibleHeader', true)
        }

        next()
    },
})
export default class MainPage extends Vue {
    /**
     * @category Use store
     */

    // [ store ]: auth
    @AuthMutation('setUserInfo') readonly setUserInfo!: (
        userInfo: UserInfo,
    ) => void
    @AuthMutation('init') readonly init!: Function
    @AuthAction('getLoginInfo') readonly getLoginInfo!: Function
    @AuthAction('getMainInfo') readonly getMainInfo!: Function
    @AuthState('loginInfo') readonly loginInfo!: LoginInfo
    @AuthState('mainInfo') readonly mainInfo!: MainInfo

    // [ store ]: ui
    @UIMutation('setHeaderType') readonly setHeaderType!: (
        headerType: HeaderType,
    ) => void
    @UIMutation('setVisibleHeader') readonly setVisibleHeader!: (
        visible: boolean,
    ) => void

    /** @category Data */

    // page 분기
    private pageName!: 'main' | 'login'

    /** @category Watch */

    // 로그인 정보에 따라 화면을 이동한다
    @Watch('loginInfo')
    changeLoginInfo(value: LoginInfo /* oldValue: LoginInfo | null */) {
        let to: RawLocation | null = null

        switch (value?.rspDc) {
            // 최초 회원가입, 사업자확인으로 이동(가입 절차)
            case '01':
                to = { name: 'Join', params: { step: '1' } }
                break
            // 기존가입자: 메인으로 이동
            case '02':
                window.location.href = '/'
                break
            // 가입불가 대상
            case '03':
                to = { name: 'Join', params: { step: '-1' } }
                break
            default:
                break
        }

        !this._.isNull(to) && this.$router.push(to)
    }

    @Watch('mainInfo', { deep: true })
    changeMainInfo(value: MainInfo /* oldValue: MainInfo */) {
        if (value.rc === '8888') {
            console.log('로그인 필요한 사용자 > 로그인 페이지로 이동')
            this.$router.push({ name: 'Main' })
        }
    }

    /** @category Computed */

    get isLogin(): boolean {
        return this.mainInfo?.rc === '8888'
    }

    /** @category Methods */

    async login() {
        /**
         * 로그인 창을 띄웁니다.
         * @reference https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference
         * @path /v2/user/me : 사용자정보 가져오기
         * @path /v2/user/unlink : 연결끊기(탈퇴? 처럼 쓸수 있겠으나 실제로는 앱과의 연관성만 끊어준다고 함)
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
        this.getLoginInfo()
    }

    withdraw() {
        this.$kakaoSdk && this.$kakaoSdk.unlink()
    }

    /** @category Life-Cycle */

    created() {
        const mainInfo = this.mainInfo
        if (mainInfo && mainInfo.rc && mainInfo.rc === '8888') {
            this.pageName = 'login'
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
</style>

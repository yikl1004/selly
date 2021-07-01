<template>
    <div class="page-login-wrap">
        <div style="height:500px; background:#2b2b2b;text-align:center;line-height:500px">
            상단 비주얼 추가 작업 예정
        </div>
        <button type="button" class="btn-kakao-login" @click="login">
            <span>카카오톡으로 시작</span>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const { Mutation, Action, State } = namespace('auth')

@Component
export default class Login extends Vue {
    /**
     * @category Use store
     */

    @Mutation('setUserInfo') readonly setUserInfo!: (userInfo: UserInfo) => void
    @Mutation('init') readonly init!: Function
    @Action('getLoginInfo') readonly getLoginInfo!: Function
    @State('responseCode') readonly responseCode!: ResponseCode

    /** @category Data */

    // kakao api
    private kakaoApi!: KakaoCert

    /** @category Watch */

    @Watch('responseCode')
    changeResponseCode(value: ResponseCode, oldValue: ResponseCode) {
        let step = ''

        switch (value) {
            case '1010':
                step = '-1'
                break
            default:
                step = '1'
                break
        }

        this.$router.push({
            name: 'Join',
            params: { step },
        })
    }

    /** @category Methods */

    login() {
        /**
         * 로그인 창을 띄웁니다.
         * user-agent가 변경되면 ( ex: chrome 개발자모드>모바일 ) sdk 내부에서 체크하는 모듈이 존재하여 오류가 발생함
         * 카카오로그인은 개발자모드 > 모바일 변경없이하여야 로그인이 정상적으로 진행됨
         * @reference https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference
         * @path /v2/user/me : 사용자정보 가져오기
         * @path /v2/user/unlink : 연결끊기(탈퇴? 처럼 쓸수 있겠으나 실제로는 앱과의 연관성만 끊어준다고 함)
         */

        // 로그인 요청
        this.kakaoApi.Auth.login({
            success: (authObj: KakaoUserInfoRes) => {
                console.log('kakao login SUCCESS', authObj)

                // 로그인 성공 시, 유저 정보 요청
                this.kakaoApi.API.request({
                    url: '/v2/user/me',
                    success: res => {
                        console.log('/v2/user/me, 카카오에 요청한 유저정보', res)
                        this.setUserInfo({
                            // ciNo: res.kakao_account.ci,
                            ciNo: '8FsPBb/e2PxJLYQv22nQOKFNx7PTJTa6UoPNmx3b5eo94hjVhwc3FIFYsl8lbwKEL3d91h7nbdXl2pBmkFaOcg==',
                            kkoId: `${res.id}`,
                            cellNo: res.kakao_account.phone_number,
                            email: res.kakao_account.email,
                        })
                        this.getLoginInfo()
                    },
                })
            },
            fail: (err: any) => {
                // alert('요청에 실패 하였습니다.');
                this.kakaoApi.cleanup()
                console.log('kakao login FAIL', err)
            },
        })
    }

    loadScript() {
        if (document && document.querySelectorAll('#kakao-login-sdk').length === 0) {
            const script = document.createElement('script')
            script.id = 'kakao-login-sdk'
            script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
            document.head.appendChild(script)

            script.onload = () => {
                this.kakaoApi = window.Kakao
                this.initialize()
            }
        } else {
            this.kakaoApi = window.Kakao
        }
    }

    initialize() {
        if (!this.kakaoApi) {
            console.log('kakao object 가 없습니다.')
            return
        }

        this.kakaoApi.cleanup()

        if (!this.kakaoApi.isInitialized()) {
            this.kakaoApi.init(process.env.VUE_APP_KAKAO_API_KEY)
        }
    }

    /** @category Life-Cycle */

    mounted() {
        this.loadScript()
    }

    beforeDestroy() {}
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

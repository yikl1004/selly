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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
    /**
     * @category Data
     */

    // kakao api
    private kakaoApi!: KakaoCert

    /**
     * @category Methods
     */

    login() {
        /**
         * 로그인 창을 띄웁니다.
         * user-agent가 변경되면 ( ex: chrome 개발자모드>모바일 ) sdk 내부에서 체크하는 모듈이 존재하여 오류가 발생함
         * 카카오로그인은 개발자모드 > 모바일 변경없이하여야 로그인이 정상적으로 진행됨
         * @reference https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference
         * @path /v2/user/me : 사용자정보 가져오기
         * @path /v2/user/unlink : 연결끊기(탈퇴? 처럼 쓸수 있겠으나 실제로는 앱과의 연관성만 끊어준다고 함)
         */

        this.kakaoApi.Auth.login({
            success: (authObj: any) => {
                console.log('kakao login SUCCESS', authObj)
                // this.kakaoApi.Auth.getStatusInfo((status: any) => {
                //     console.log('getStatusInfo', status)
                // })
                this.kakaoApi.API.request({
                    url: '/v2/user/me',
                    success: res => {
                        console.log('/v2/user/me', res)
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
                this.init()
            }
        }
    }

    init() {
        if (!this.kakaoApi) {
            console.log('kakao object 가 없습니다.')
            return
        }

        this.kakaoApi.cleanup()

        if (!this.kakaoApi.isInitialized()) {
            this.kakaoApi.init(process.env.VUE_APP_KAKAO_API_KEY)
        }
    }

    mounted() {
        this.loadScript()
        // this.loginCheck()
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

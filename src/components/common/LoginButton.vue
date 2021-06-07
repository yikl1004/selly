<template>
    <button type="button" @click="onClick">
        카카오 로그인
    </button>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AuthModule = namespace('auth')

/**
 * login process( S: success, F: fail )
 * 1. 카카오 로그인 버튼이 있는 페이지 진입
 * 2. 카카오 SDK javascript 로드
 * 3. 로그인버튼 클릭
 *      3-1. 카카오 SDK 초기화 또는 초기화 확인
 *      3-2. 카카오 로그인 요청
 *      3-3. 성공시  유저 정보 가져오기
 *      3-4. 실패시 SDK cleanup 실행
 */

@Component
export default class extends Vue {
    @AuthModule.Action('getLoginInfo')
    readonly getLoginInfo!: Function

    @AuthModule.Action('loginCheck')
    readonly loginCheck!: Function

    @AuthModule.State('isLogin')
    readonly isLogin!: boolean

    @Watch('isLogin', { deep: true })
    changeIsLogin(newValue: boolean, oldValue: boolean) {
        console.log({ isLogin: newValue })
        newValue && this.$router.push({ name: 'Main' })
    }

    /**
     * @cateogry Methods
     */

    async login() {
        await this.getLoginInfo()
    }

    loadScript() {
        if (document && document.querySelectorAll('#kakao-login-sdk').length === 0) {
            const script = document.createElement('script')
            script.id = 'kakao-login-sdk'
            script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
            document.head.appendChild(script)
        }
    }

    doProcess() {
        if (!window.Kakao) {
            console.log('kakao object 가 없습니다.')
        }

        window.Kakao.cleanup()

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('da8413275bec093dd2f07488d9a4012e')
        }

        /**
         * 로그인 창을 띄웁니다.
         * user-agent가 변경되면 ( ex: chrome 개발자모드>모바일 ) sdk 내부에서 체크하는 모듈이 존재하여 오류가 발생함
         * 카카오로그인은 개발자모드 > 모바일 변경없이하여야 로그인이 정상적으로 진행됨
         */
        const KakaoAPI = window.Kakao.API
        /**
         * @path /v2/user/me : 사용자정보 가져오기
         * @path /v2/user/unlink : 연결끊기(탈퇴? 처럼 쓸수 있겠으나 실제로는 앱과의 연관성만 끊어준다고 함)
         */
        const userInfoPath = '/v2/user/me'
        const unlinkPath = '/v2/user/unlink'

        // window.Kakao.Auth.login({
        //     success: (authObj: any) => {
        //         console.log('kakao login SUCCESS', authObj)
        //         KakaoAPI.request({
        //             url: '/v2/user/me',
        //             success: res => {
        //                 console.log('kakao API SUCCESS', res)
        //             },
        //             fail: error => {
        //                 console.log('kakao API FAIL', error)
        //             },
        //         })
        //     },
        //     fail: (err: any) => {
        //         // alert('요청에 실패 하였습니다.');
        //         window.Kakao.cleanup()
        //         console.log('kakao login FAIL', err)
        //     },
        // })

        window.Kakao.Auth.authorize({
            redirectUri: '/example',
            scope: ['account_email', 'gender'].toString(),
        })
    }

    onClick() {
        this.login()
    }

    mounted() {
        // this.loadScript()
        this.loginCheck()
    }
}
</script>

<style scoped></style>

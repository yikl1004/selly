<template>
    <button type="button" @click="doProcess">
        카카오 로그인
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
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

        // 로그인 창을 띄웁니다.
        // user-agent가 변경되면 ( ex: chrome 개발자모드>모바일 ) sdk 내부에서 체크하는 모듈이 존재하여 오류가 발생함
        // 카카오로그인은 개발자모드 > 모바일 변경없이하여야 로그인이 정상적으로 진행됨
        const KakaoAPI = window.Kakao.API
        // window.Kakao.Auth.login({
        //     success: (authObj: any) => {
        //         console.log('kakao login SUCCESS', authObj)
        // 사용자정보 가져오기: /v2/user/me
        // 연결끊기: /v2/user/unlink
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
            scope: 'account_email,gender',
        })
    }

    mounted() {
        this.loadScript()
    }
}
</script>

<style scoped></style>

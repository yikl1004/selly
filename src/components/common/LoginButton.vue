<template>
    <div class="wrapper">
        <button type="button" @click="toggle('legacy')">
            SDK 방식
            <span>{{ legacyOpen ? '닫기' : '보기' }}</span>
        </button>
        <ul :class="['kakao-login-test-list', { open: legacyOpen }]">
            <li>
                <BasicButton @click="login">
                    카카오 로그인
                </BasicButton>
                <p class="description">
                    1. 동의하지 않은 회원인 경우 동의 후 로그인(카카오 화면)<br />
                    2. 인가받은 코드가 결과 값으로 넘어 오는데 이것은 어떻게 처리할지?
                </p>
            </li>
            <li>
                <BasicButton @click="sellyLogin">
                    셀리 로그인
                </BasicButton>
            </li>
            <li>
                <BasicButton @click="getTerms">
                    동의한 약관 정보 가져오기
                </BasicButton>
                <p class="description">
                    1. 동의한 항목과 동의한 날짜를 알 수 있음<br />
                    2. 이 data를 활용하는 곳이 있는지
                </p>
            </li>
            <li>
                <BasicButton @click="logout">
                    로그아웃
                </BasicButton>
                <p class="description">
                    1. access_token을 날리면서 로그아웃 처리됨<br />
                    2. access_token이 유실되면 자동으로 로그아웃 처리<br />
                    3. 로그아웃 API 처리가 필요함
                </p>
            </li>
            <li>
                <BasicButton @click="unlink">
                    탈퇴
                </BasicButton>
                <p class="description">
                    1. 카카오에 등록한 selly 앱과의 연결을 끊음<br />
                    2. 연결만 끊기 때문에 회원탈퇴 API가 필요함
                </p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

interface Parmas {
    response_type?: string
    client_id?: string
    redirect_uri?: string
    service_terms?: string
    state?: string
    prompt?: string
    scope?: string
}

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
export default class LoginButton extends Vue {
    @AuthModule.Action('getLoginInfo')
    readonly getLoginInfo!: Function

    @AuthModule.Action('loginCheck')
    readonly loginCheck!: Function

    @AuthModule.State('isLogin')
    readonly isLogin!: boolean

    @AuthModule.Mutation('setCI')
    readonly setCI!: Function

    // @Watch('isLogin', { deep: true })
    // changeIsLogin(newValue: boolean, oldValue: boolean) {
    //     console.log({ isLogin: newValue })
    //     // newValue && this.$router.push({ name: 'Main' })
    // }

    /**
     * @category Data
     */

    private legacyOpen: boolean = false
    private newOpen: boolean = false

    // kakao api
    private kakaoApi!: KakaoCert

    /** kakao API URI */
    private kakaoApiUri: { [key: string]: string } = {
        // userInfo: '/v2/user/me',
        unlink: '/v2/user/unlink',
        serviceTerms: '/v1/user/service/terms',
        revokeAgree: '/v2/user/revoke/scopes',
        login: '/oauth/token',
        logout: '/v1/user/logout',
    }

    /** autorize 공통 파라미터 */
    // private autorizeCommonParms: KakaoAuthAutorizeParameters = {
    //     redirectUri: 'http://selly.lottecard.com:8080/example',
    // }

    /**
     * @cateogry Methods
     */
    toggle(flag: string) {
        if (flag === 'legacy') {
            this.legacyOpen = !this.legacyOpen
        } else if (flag === 'new') {
            this.newOpen = !this.newOpen
        }
    }

    async sellyLogin() {
        await this.getLoginInfo()
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
            // this.kakaoApi.API.request({
            // url: this.kakaoApiUri.login,
            success: (authObj: any) => {
                console.log('kakao login SUCCESS', authObj)
                this.kakaoApi.Auth.getStatusInfo((status: any) => {
                    console.log('getStatusInfo', status)
                })
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

    unlink() {
        this.kakaoApi.API.request({
            url: '/v1/user/unlink',
            success: res => {
                console.log('kakao API UNLINK SUCCESS', res)
            },
            fail: error => {
                console.log('kakao API UNLINK FAIL', error)
            },
        })
    }

    getTerms() {
        // TODO: 약관 내용은 아직 API 적용하면 안됨
        this.kakaoApi.API.request({
            url: this.kakaoApiUri.serviceTerms,
            success: res => {
                console.log('KAKAO SERVICE TERMS SUCCESS', res)
            },
            fail: error => {
                console.log('KAKAO SERVICE TERMS FAIL', error)
            },
        })
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

    logout() {
        this.kakaoApi.API.request({
            url: this.kakaoApiUri.logout,
            success: res => {
                console.log('KAKAO LOGOUT SUCCESS', res)
            },
            fail: error => {
                console.log('KAKAO LOGOUT FAIL', error)
            },
        })
    }

    mounted() {
        this.loadScript()
        // this.loginCheck()
    }
}
</script>

<style scoped lang="scss">
hr {
    display: block;
    width: 100%;
}
.kakao-login-test-list {
    display: none;
    &.open {
        display: block;
    }

    li {
        & + li {
            margin-top: 16px;
        }
    }
}
</style>

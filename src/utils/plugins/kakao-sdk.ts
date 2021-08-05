import { basicUtil } from '@utils/mixins'
import type { UserInfo } from '@stores/modules/auth'
import type { PluginObject } from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $kakaoSdk: KakaoSDK
    }
}

interface PluginOptions {
    apiKey: string
}

class KakaoSDK {
    private kakaoApi!: KakaoCert
    private _url: { [key: string]: string } = {
        unlink: '/v1/user/unlink',
        userInfo: '/v2/user/me',
        terms: '/v1/user/service/terms',
    }
    private apiKey!: string

    constructor({ apiKey }: PluginOptions) {
        this.apiKey = apiKey
    }

    /**
     * 카카오 SDK 스크립트 로드 후 사용 전 초기화
     */
    initialize() {
        const KakaoSdk = window.Kakao

        if (KakaoSdk) {
            KakaoSdk.cleanup()
        }

        if (!KakaoSdk.isInitialized()) {
            KakaoSdk.init(this.apiKey)
        }

        this.kakaoApi = window.Kakao
    }

    reinitialize() {
        const KakaoSdk = window.Kakao

        if (!KakaoSdk.isInitialized()) {
            KakaoSdk.init(process.env.VUE_APP_KAKAO_API_KEY)
        }

        this.kakaoApi = window.Kakao
    }

    /**
     * 동의 한 약관 목록을 요청
     * @return {Promise<Pick<UserInfo, 'list'>>}
     */
    async agreedList(): Promise<Pick<UserInfo, 'list'>> {
        return await new Promise((resolve, reject) => {
            this.kakaoApi.API.request({
                url: this._url.terms,
                success: (response: KakaoTermsRes) => {
                    console.log('KAKAO SERVICE TERMS SUCCESS', response)
                    resolve({
                        list: response.allowed_service_terms.map(item => ({
                            agTag: item.tag,
                        })),
                    })
                },
                fail: reason => {
                    console.log('KAKAO SERVICE TERMS FAIL', reason)
                    alert('동의한 약관 항목을 불러오는데 실패하였습니다.\n 다시 시도해 주세요')
                    reject(reason)
                },
            })
        })
    }

    /**
     * 카카오 로그인 한 유저의 정보를 요청
     * @return {Promise<Omit<UserInfo, 'list'>>}
     */
    async userInfo(): Promise<Omit<UserInfo, 'list'>> {
        return await new Promise((resolve, reject) => {
            this.kakaoApi.API.request({
                url: this._url.userInfo,
                success: (res: KakaoUserInfoRes) => {
                    console.log('/v2/user/me, 카카오에 요청한 유저정보', res)
                    resolve({
                        // ciNo: res.kakao_account.ci,
                        // ciNo: 'rBEQQb+3pmYqPCNP4YwatvxlgA//fZ57i+RXx2NWrlXaoRWI/Zpo4VALx+eA0drMOTfdYPtDiGmOTHiiWIffTw==',
                        // ciNo: '8FsPBb/e2PxJLYQv22nQOKFNx7PTJTa6UoPNmx3b5eo94hjVhwc3FIFYsl8lbwKEL3d91h7nbdXl2pBmkFaOcg==', // 03 (가입불가)
                        // ciNo: 'ED4YJ80zZDOrVurxQJeQgzze/lkHapSfQlnzHCUUKMtuyy9E+m9zR3oFXMYM/JXuRlDLfOb1YE+PV41q4ec44g==', // 02 (사업자정보 1개)
                        ciNo: '+r/s3HjBSHosl0NyLj1F8+TlogEFjBwJxt07lpPkN4zXDWYQ+N73rJdOCVM8+4anTlk5P+A3pWZqv+THfPiWQQ==', // 사업자 정보 2개
                        cellNo: basicUtil.cellPhoneFormatter(res.kakao_account.phone_number),
                        email: res.kakao_account.email,
                    })
                },
                fail: reason => reject(reason),
            })
        })
    }

    /**
     * 카카오 로그인
     * @returns {Promise<AuthSuccessCallbackParamers>}
     */
    async login(): Promise<AuthSuccessCallbackParamers> {
        return await new Promise((resolve, reject) => {
            this.kakaoApi.Auth.login({
                success: authObj => resolve(authObj),
                fail: reason => {
                    this.kakaoApi.cleanup()
                    reject(reason)
                },
                throughTalk: false,
            })
        })
    }

    /**
     * 카카오 로그아웃: 액세스 토큰을 만료 시키는 것일 뿐, 카카오 계정을 로그아웃하는 것이 아닙니다.
     * @returns {Promise<boolean>}
     */
    async logout(): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            if (!this.kakaoApi.Auth.getAccessToken()) {
                alert('Not logged in.')
                reject(false)
            }
            this.kakaoApi.Auth.logout(() => {
                resolve(true)
            })
        })
    }

    /**
     * 연결 끊기: 채널앱과의 연관성을 끊어 줌, 회원탈퇴 API는 별도로 필요함
     */
    async unlink() {
        const url = this._url.unlink

        return await new Promise((success, fail) => {
            this.kakaoApi.API.request({ url, success, fail })
        })
    }

    /**
     * 이용 중 동의 받기
     * TODO: 아직 결정 안됨(태그명: plusfriends)
     * Kakao.Auth.authorize({ serviceTerms: "tag1, tag2" })
     */

    /**
     * 카카오 SDK 스크립트를 head에 동적으로 추가, 추가 후 'kakaoApi' data에 window.Kakao를 reference합니다.
     */
    async loadScript(): Promise<void> {
        return await new Promise((resolve, reject) => {
            if (document && document.querySelectorAll('#kakao-login-sdk').length === 0) {
                const script = document.createElement('script')
                script.id = 'kakao-login-sdk'
                script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
                document.head.appendChild(script)

                script.onload = () => {
                    resolve()
                }
                script.onerror = reject
            }
        })
    }

    /** @category Life-Cycle */

    // async created() {
    //     await this.loadScript()
    //     this.kakaoInitialize()
    // }

    // beforeMount() {
    //     this.kakaoApi = window.Kakao
    // }
}

const KakaoSdkPlugin: PluginObject<PluginOptions> = {
    install(_Vue, options) {
        if (typeof options === 'undefined') {
            throw new Error('[KakaoSdkPlugin]: options을 추가해 주세요.')
        }
        const { apiKey } = options
        const sdk = new KakaoSDK({
            apiKey,
        })

        sdk.loadScript().then(() => {
            console.log('ksdjkldjflskdj')
            sdk.initialize()
            console.log('install 완료', sdk)

            Object.defineProperty(_Vue.prototype, '$kakaoSdk', {
                enumerable: true,
                configurable: true,
                value: sdk,
            })
        })
    },
}

export default KakaoSdkPlugin
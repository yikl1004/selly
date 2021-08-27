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
            KakaoSdk.init(this.apiKey)
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
    async userInfo(ciNo?: string): Promise<Omit<UserInfo, 'list'>> {
        return await new Promise((resolve, reject) => {
            this.kakaoApi.API.request({
                url: this._url.userInfo,
                success: (res: KakaoUserInfoRes) => {
                    console.log('/v2/user/me, 카카오에 요청한 유저정보', res)
                    resolve({
                        ciNo: ciNo || res.kakao_account.ci, // 사업자 정보 2개
                        cellNo: basicUtil.cellPhoneFormatter(res.kakao_account.phone_number),
                        email: res.kakao_account.email,
                    })
                },
                fail: reason => reject(reason),
            })
        })
    }

    /**
     * 인가코드 발급
     * @returns {Promise<void>}
     */
    async authorize(testCiNo?: string): Promise<void> {
        return await this.kakaoApi.Auth.authorize({
            redirectUri: `${process.env.VUE_APP_API_DOMAIN}/authCallback`,
            throughTalk: true,
            state: testCiNo,
        })
    }

    setAccessToken(token: string) {
        this.kakaoApi.Auth.setAccessToken(token)
    }

    /**
     * 사용자 정보 가져오기
     * @return {Promise<KakaoUserInfoRes>}
     */
    // async getStatusInfo(): Promise<KakaoUserInfoRes> {
    //     return await new Promise((resolve, reject) => {
    //         this.kakaoApi.Auth.getStatusInfo(({ status, user }) => {
    //             if (status === 'connected') {
    //                 resolve(user)
    //             } else {
    //                 reject('[KakaoTalk] 사용자 정보 가져오기에 실패 했습니다.')
    //             }
    //         })
    //     })
    // }

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
}

const KakaoSdkPlugin: PluginObject<PluginOptions> = {
    async install(_Vue, options) {
        if (typeof options === 'undefined') {
            throw new Error('[KakaoSdkPlugin]: options을 추가해 주세요.')
        }
        const { apiKey } = options
        const sdk = new KakaoSDK({
            apiKey,
        })

        await sdk.loadScript()
        sdk.initialize()

        Object.defineProperty(_Vue.prototype, '$kakaoSdk', {
            enumerable: true,
            configurable: true,
            value: sdk,
        })
    },
}

export default KakaoSdkPlugin

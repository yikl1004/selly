declare global {
    /** password 타입의 input이 들어가는 컴포넌트의 타입 */
    export type SecretType =
        | 'regist' // 주민등록번호 7자리
        | 'registGender' // 주민등록번호 성별 1자리
        | 'card' // 카드번호
        | 'card2' // 카드번호 앞 2자리

    /** node 환경 변수 */
    namespace NodeJS {
        interface ProcessEnv {
            VUE_APP_API_DOMAIN: string
        }
    }

    interface KakaoLoginApi {
        success(authObj: any): void
        fail(err: any): void
    }

    interface KakaoAPIRequestParams {
        url?: string
        success?(res: any): void
        fail?(error: any): void
    }

    interface KakaoAuthAutorizeParameters {
        redirectUri: string
        state?: string
        scope?: string
        throughTalk?: boolean
    }
    interface KakaoCert {
        cleanup(): void
        isInitialized(): boolean
        init(clientId: string): void
        Auth: {
            login(params: KakaoLoginApi): void
            // TODO: 카카오싱크 연동하면서 추가해야 함
            authorize(params: KakaoAuthAutorizeParameters): void
        }
        API: {
            request(params: KakaoAPIRequestParams): void
        }
    }

    interface IKakaoCertUserInfo {
        id: string
        kakao_account: {
            email: string
            gender: string
            birthDate1: string
        }
    }

    interface Window {
        Kakao: KakaoCert
    }
}

export {}

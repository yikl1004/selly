/**
 * @interface KakaoUserInfoRes
 * @description "/"
 */
interface KakaoUserInfoRes {
    connected_at: string
    id: number
    kakao_account: {
        ci: string
        ci_authenticated_at: string
        ci_needs_agreement: boolean
        email: string
        email_needs_agreement: boolean
        has_ci: boolean
        has_email: boolean
        has_phone_number: boolean
        is_email_valid: boolean
        is_email_verified: boolean
        phone_number: string
        phone_number_needs_agreement: boolean
    }
    profile: {
        is_default_image: boolean
        nickname: string
        profile_image_url: string
        thumbnail_image_url: string
    }
    profile_needs_agreement: boolean
    properties: {
        nickname: string
        profile_image: string
        thumbnail_image: string
    }
    synched_at: string
}

interface KakaoTermsRes {
    allowed_service_terms: {
        tag: string
        agreed_at: string
    }[]
    user_id: number
}

interface KakaoUnlinkRes {
    id: number
}

interface ErrorStatus {
    // 고정값
    error: 'access_denied'
    error_description: string
}
interface AuthFailCallback {
    (params: {}): void
}

interface AuthSuccessCallbackParamers {
    access_token: string
    refresh_token: string
    token_type: 'bearer'
    expires_in: number
    scope: string
}
interface AuthSuccessCallback {
    (params: AuthSuccessCallbackParamers): void
}
interface KakaoLoginApi {
    success: AuthSuccessCallback
    fail: AuthFailCallback
    scope?: string
    throughTalk?: boolean
}

interface KakaoAPIRequestParams {
    url: string
    scopes?: string
    scope?: string
    success?(res: KakaoUserInfoRes | KakaoTermsRes): void
    fail?(error: ErrorStatus): void
    data?: {
        redirect_uri?: string
        through_talk?: boolean
    }
}

interface KakaoAuthAutorizeParameters {
    redirectUri?: string
    state?: string
    scope?: string
    throughTalk?: boolean
    serviceTerms?: string
}
interface KakaoAuthStatusCallback {
    (params: { status: 'connected' | 'not_connected'; user: KakaoUserInfoRes }): void
}
interface KakaoCert {
    cleanup(): void
    isInitialized(): boolean
    init(clientId: string): void
    /**
     * 카카오싱크 연동하면서 추가해야 함
     */
    Auth: {
        authorize(params: KakaoAuthAutorizeParameters): void
        /** 토큰 가져오기 */
        login(params: KakaoLoginApi): void
        /** 카카오 로그인한 유저의 정보 호출 */
        getStatusInfo(params?: KakaoAuthStatusCallback): void
        /** 토큰 삭제 하기 */
        logout(callback?: Function): void
        /** 사용 중인 엑세스 토큰 확인 */
        getAccessToken(): string
        /** 사용 할 엑세스 토큰 세팅 */
        setAccessToken(token: string, persist?: boolean): void
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

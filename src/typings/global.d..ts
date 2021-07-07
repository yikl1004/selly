import { RawLocation } from 'vue-router'

declare global {
    type VueRouterLocation = RawLocation

    // Y 또는 N 문자열
    type YN = 'Y' | 'N'

    // 응답코드
    type ResponseCode =
        // case 생길 때 마다 추가 예정
        | '0000' // 정상처리 되었습니다.
        | '1000' // 필수정보가 누락되었습니다.
        | '1010' // 회원가입 불가 대상입니다.
        | '1020' // 추천인 코드가 올바르지 않습니다.
        | '1030' // 주소 및 전화번호 업데이트에 실패하였습니다.
        | '1101' // 주민번호 입력값이 없습니다.
        | '9999' // 시스템에러가 발생하였습니다.
        | '1000' // 필수정보가 누락되었습니다.
        | '8888' // 로그인 후 이용해 주세요

    // API
    interface API {
        url: string
        method: 'post' | 'get'
    }

    // menu 정보
    interface GnbItem {
        name: string
        path: string
        children?: GnbItem[]
    }

    interface TransitionProps {
        mode: 'out-in'
        'enter-active-class': string
        'leave-active-class': string
    }

    type CSSObject = { [key: string]: string }

    /** password 타입의 input이 들어가는 컴포넌트의 타입 */
    type SecretType =
        | 'regist' // 주민등록번호 7자리
        | 'registGender' // 주민등록번호 성별 1자리
        | 'card' // 카드번호
        | 'card2' // 카드번호 앞 2자리

    /** node 환경 변수 */
    namespace NodeJS {
        interface ProcessEnv {
            // API URL 정보
            VUE_APP_API_DOMAIN: string
            // 카카오 SDK API key
            VUE_APP_KAKAO_API_KEY: string
            // 카카오 SDK 재설정 API key
            VUE_APP_KAKAO_REST_API_KEY: string
            // 도로명 주소 API KEY
            VUE_APP_JUSO_API_KEY: string
            // DEV: 로그인절차 생략 처리 플래그
            VUE_APP_SKIP_LOGIN: string
        }
    }

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

    interface AuthFailCallback {
        (params: {
            // 고정값
            error: 'access_denied'
            error_description: string
        }): void
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
        scopes?: string
        scope?: string
        url?: string
        success?(res: KakaoUserInfoRes | KakaoTermsRes): void
        fail?(error: any): void
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
    interface KakaoCert {
        cleanup(): void
        isInitialized(): boolean
        init(clientId: string): void
        // TODO: 카카오싱크 연동하면서 추가해야 함
        Auth: {
            authorize(params: KakaoAuthAutorizeParameters): void
            /** 토큰 가져오기 */
            login(params: KakaoLoginApi): void
            /** 카카오 로그인한 유저의 정보 호출 */
            getStatusInfo(params: any): void
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

    type FormInputType = 'number' | 'seperateNumber' | 'text' | 'select' | SecretType

    /**
     * @path { @component/common/Modal.vue }
     * @type { ModalDesignType }
     * @description Modal 컴포넌트의 디자인타입을 결정하는 Props
     */
    type ModalDesignType = 'dialog' | 'popup'

    /**
     * @path { @component/form/SwitchButton.vue }
     * @type { DesignType }
     * @description 디자인타입을 결정합니다.
     */
    type SwitchDesignType = 'large' | 'small'

    /**
     * @path { @component/common/BasicButton.vue }
     * @type { BasicButtonDesignType }
     * @description 디자인타입을 결정합니다.
     */
    type BasicButtonDesignType =
        | 'basic' // 기본
        | 'with' // 버튼과 함께 쓰이는 형태
        | 'textBlue' // 텍스트버튼_파랑
        | 'textGray' // 텍스트버튼_회색
        | 'dialogBlue' // dialog버튼_파랑
        | 'dialogWhite' // dialog버튼_흰색
        | 'more' // 더보기

    /**
     * @path { @component/form/CheckBox.vue }
     * @type { CheckBoxDesignType }
     * @description 디자인타입을 결정합니다.
     */
    type CheckBoxDesignType = 'normal' | 'square'

    /**
     * @path { @component/form/SingleSelection.vue }
     * @type { CheckBoxDesignType }
     * @description 디자인타입을 결정합니다.
     */
    type SingleSelectionDesignType = 'button' | 'radio'

    /**
     * @path { @component/form/SingleSelection.vue }
     * @type { SecretNumberType }
     * @description 디자인타입을 결정합니다.
     */
    interface SingleSelectionListItem {
        displayName: string
        value: string
        checked?: boolean
        disabled?: boolean
    }

    /**
     * @path { @component/form/SecretNumber.vue }
     * @type { SecretNumberType }
     * @description 타입을 결정합니다.
     */
    type SecretNumberType = 'regist' | 'registGender' | 'card' | 'card2'

    /**
     * @path { @component/common/BottomSheet.vue }
     * @type { BottomSheetOptionItem }
     * @description "list" props의 타입
     */
    interface BottomSheetOptionItem {
        displayName: string
        value: string
        selected?: boolean
    }

    /**
     * @path { @component/form/DropdownBox.vue }
     * @type { DropdownBoxList }
     * @description "list" props의 타입(DropdownBox의 'list' Props)
     */
    type DropdownBoxList = BottomSheetOptionItem[]
}

export {}

declare global {
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

    interface KakaoUnlinkRes {
        id: number
    }

    interface KakaoLoginApi {
        success(authObj: any): void
        fail(err: any): void
        scope?: string
    }

    interface KakaoAPIRequestParams {
        scopes?: string
        scope?: string
        url?: string
        success?(res: KakaoUserInfoRes): void
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

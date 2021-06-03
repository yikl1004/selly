declare global {
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
        | 'line' // 선형
        | 'with' // 버튼과 함께 쓰이는 형태

    /**
     * @path { @component/form/CheckBox.vue }
     * @type { CheckBoxDesignType }
     * @description 디자인타입을 결정합니다.
     */
    type CheckBoxDesignType = 'normal' | 'circle'

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
        selected?: boolean
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

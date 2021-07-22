declare global {
    interface Window {
        store?: object
    }

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

    type FormInputType =
        | 'number'
        | 'seperateNumber'
        | 'text'
        | 'select'
        | SecretType
}

export {}

export interface BizInfoItem {
    /** 사업자 번호 */
    bzno: string
    /** 사업자 등록 여부 */
    ltRgyn: YN
}
export interface FranchiseItem {
    /** 가맹점 번호 */
    mcno: string
    /** 가맹점 이름 */
    mcNm: string
    /** 우편번호 */
    psno: string
    /** 우편번호 주소 */
    pnadd: string
    /** 우편번호 외 주소 */
    bpsnoAdd: string
    /** 전화 지역번호 */
    ddd: string
    /** 국번 */
    exno: string
    /** 전화 개별 번호 */
    tlno: string
}

export interface BusinessManInfoListItem {
    /** 사업자번호 */
    bzno: string
    /** 사업자 명 */
    bzmanNm: string
    /** 롯데카드 가맹점 등록 여부 */
    locaMcYn: YN
    /** 가맹점 정보 리스트 */
    subList: FranchiseItem[]
    /** 선택된 상태, API에는 없는 추가된 필드 */
    selected?: boolean
}

export interface BusinessPlaceListItem {
    /** 사업자 번호 */
    bzno: string
    /** 사업자 이름 */
    bzmanNm: string
    /** 사업자 등록 여부 */
    ltRgyn: YN
    /** 로카 가맹점 여부 */
    locaMcYn: YN
}

/**
 * 회원정보관련 API 요청 파라미터
 */
interface Parameters {
    /**
     * @description 로그인 / 카카오 최초 인입자 셀리 가입처리
     */
    loginInfo: {
        /** 카카오로 전달 받은 ci */
        ciNo: string
        /** 카카오로 전달 받은 휴대폰번호 */
        cellNo?: string
        /** 카카오로 전달 받은 이메일 */
        email?: string
        /** 유입채널 (셀리:MWEB,비즈넵:BZNV,알밤:ALBM,로카m:LOCM) */
        chnlC?: 'MWEB' | 'BZNV' | 'ALBM' | 'LOCM'
        /** 약관 동의 항목 */
        list?: {
            agTag: string
            agDtti?: string
        }[]
        /** 외부에서 들어 올 경우 */
        redirectUrl?: string
    }
    /**
     * @description 유쇼데 로그인
     */
    datusLoginInfo: {
        /** 카카오로 전달 받은 ci */
        ciNo: string
        /** 유입채널(셀리: MWEB, 비즈넵: BZNV, 알밤: ALBM, 로카M: LOCM) */
        chnlC: string
        /** 카카오로 전달 받은 휴대폰번호 */
        cellNo?: string
        /** 카카오로 전달 받은 이메일 */
        email?: string
    }
    /**
     * @description my>최초로그인시 사업자정보 입력 내용
     */
    bizInfo: {
        /** 사업자 리스트 */
        list: BizInfoItem[]
    }
    /**
     * @description 추천인코드 입력 요청
     */
    recommenderCode: {
        /** 추천인 코드 */
        rfnSn: string
    }
    /**
     * @description 마케팅 동의 업데이트(카카오 친구톡, 마케팅 SMS)
     */
    marketingUpdate: {
        mrktKkofrndAgYn?: YN
        mrktSmsAgYn?: YN
    }
    /**
     * @description 회원 탈퇴전 안내문구 요청
     */
    checkBeforeWithdrawal: {
        /** 마케팅 가능 여부 */
        mrktYn?: YN
        /** 대출 가능 여부 */
        loadYn?: YN
        /** 장기카드/biz론 가능 여부 */
        bizLoanYn?: YN
        /** 유쇼데 구매 여부 */
        datusYn?: YN
    }
    franchiseDetail: {
        /** 가맹점 번호 */
        mcno: string
    }
    changeFranchiseDetail: {
        /** 가맹점우편번호외주소 */
        bpsnoAdd?: string
        /** 전화지역번호 */
        ddd?: string
        /** 국번 */
        exno: string
        /** 가맹점번호 */
        mcno?: string
        /** 가맹점우편번호주소 */
        pnadd?: string
        /** 우편번호 */
        psno?: string
        /** 전화개별번호 */
        tlno?: string
    }
    changeBusinessManName: {
        /** 사업자 번호 */
        bzno: string
        /** 사업자 명 */
        bzmanNm: string
    }
}

export interface Responses {
    loginInfo: DefaultResponse<{
        /** 01: 로그인 완료(메인으로 이동), 02: 회원가입 후 등록한 사업자번호 없음(회원가입 절차 진행) */
        rspDc: '01' | '02' | '03' | ''
        /** S: 정회원, J: 준회원 */
        mbrDc: 'S' | 'J' | ''
        /** 셀리에서 생성하는 비즈넵 JWT토큰 */
        bzNavToken: string
        /** ?? 날짜인데 */
        date: string
        /** 대표자이름 */
        dgNm: string
        /** 대출매뉴 노출 여부 */
        finMenYn: YN
        /** 마케팅 가능여부 */
        mrktPsyn: YN
        /** redirect url */
        redirectUrl: string
    } | null>
    datusLoginInfo: DefaultResponse<{
        /** 01: 유쇼데 페이지 open post, 02: 회원가입 불가 */
        rspDc: '01' | '02'
        /** form parameter 1 */
        token: string
        /** form parameter 2 */
        encdata: string
        /** form action url */
        url: string
    }>
    memberWorkplaceInfo: DefaultResponse<{
        /** 사업자 리스트 */
        list: {
            /** 사업자 번호 */
            bzno: string
            /** 사업자 명 */
            bzmanNm: string
            /** 사업자등록 여부 */
            ltRgyn: YN
            /** 롯데카드 가맹점 등록 여부 */
            locaMcYn: YN
        }[]
        /** 회원 이름(대표자) */
        mbrNm: string
    }>
    bizInfo: DefaultResponse<{
        /** 회원 이름 */
        mbrNm: string
        /** 사업자 리스트 */
        list: BusinessPlaceListItem[]
    }>
    logoutInfo: DefaultResponse<null>
    recommenderCode: DefaultResponse<null | object>
    memberInfo: DefaultResponse<{
        /** 회원이름 */
        mbrNm: string
        /** 카카오 이메일 아이디 */
        kkoId: string
        /** 휴대폰 번호 */
        cellNo: string
        /** 마케팅 가능(메뉴 노출) 여부 */
        mrktYn: YN
        /** 대출 가능(메뉴 노출) 여부 */
        loanYn: YN
        /** 장기카드/biz 론 가능 여부 */
        bizLoanYn: YN
        /** 유쇼대 구매 여부 */
        datusYn: YN
    }>
    withdrawal: DefaultResponse<null>
    beforeWithdrawal: DefaultResponse<{
        /** 해지안내 문구 리스트 */
        list: {
            /** 해지안내 문구 내용 */
            rsgDesc: string
        }[]
    }>
    businessMainInfo: DefaultResponse<{
        /** 사업자 리스트 */
        list: BusinessManInfoListItem[]
    }>
    franchiseDetail: DefaultResponse<{
        /** 가맹점 번호 */
        mcno: string
        /** 가맹점 이름 */
        mcNm: string
        /** 우편번호 */
        psno: string
        /** 우편번호 주소 */
        pnadd: string
        /** 우편번호 외 주소 */
        bpsnoAdd: string
        /** 전화 지역 번호 */
        ddd: string
        /** 전화 국번 */
        exno: string
        /** 전화 개별 번호 */
        tlno: string
    }>
    changeFranchiseDetail: DefaultResponse<{} | null>
    changeBusinessManName: DefaultResponse<{
        /** 사업자 리스트 */
        list: {
            /** 사업자 번호 */
            bzno: string
            /** 사업자 이름 */
            bzmanNm: string
            /** 사업자등록여부 */
            ltRgyn: YN
            /** 로카 가맹점 여부 */
            locaMcYn: YN
        }[]
        /** 이건 뭘까?? */
        mbrNm: string
    }>
}

/** Response data / Request parameter type Shortcuts */
export interface LoginInfo {
    Res: SellyServiceResponse<Responses['loginInfo']>
    Req: Parameters['loginInfo']
}

export interface DatusLoginInfo {
    Res: SellyServiceResponse<Responses['datusLoginInfo']>
    Req: Parameters['datusLoginInfo']
}

export interface MemberWorkplaceInfo {
    Res: SellyServiceResponse<Responses['memberWorkplaceInfo']>
}

export interface BizInfo {
    Res: SellyServiceResponse<Responses['bizInfo']>
    Req: Parameters['bizInfo']
}

export interface LogoutInfo {
    Res: SellyServiceResponse<Responses['logoutInfo']>
}

export interface RecommenderCode {
    Res: SellyServiceResponse<Responses['recommenderCode']>
    Req: Parameters['recommenderCode']
}

export interface MemberInfo {
    Res: SellyServiceResponse<Responses['memberInfo']>
}

export interface MarketingUpdate {
    Req: Parameters['marketingUpdate']
}

export interface WithdrawalInfo {
    Res: SellyServiceResponse<Responses['withdrawal']>
}

export interface BeforeWithdrawalInfo {
    Res: SellyServiceResponse<Responses['beforeWithdrawal']>
    Req: Parameters['checkBeforeWithdrawal']
}

export interface BusinessManInfo {
    Res: SellyServiceResponse<Responses['businessMainInfo']>
}

export interface FranchiseDetail {
    Res: SellyServiceResponse<Responses['franchiseDetail']>
    Req: Parameters['franchiseDetail']
}

export interface ChangeFranchiseDetail {
    Req: Parameters['changeFranchiseDetail']
    Res: SellyServiceResponse<Responses['changeFranchiseDetail']>
}

export interface ChangeBusinessManName {
    Res: SellyServiceResponse<Responses['changeBusinessManName']>
    Req: Parameters['changeBusinessManName']
}

/** api list key list */
export interface AuthAPIList {
    datusLogin: API
    login: API
    memberWorkplaceInfo: API
    bizInfoInput: API
    logout: API
    recommenderCode: API
    memberInfo: API
    marketingUpdate: API
    withdrawal: API
    beforeWithdrawal: API
    businessManInfo: API
    franchiseDetail: API
    changeFranchiseDetail: API
    changeBusinessManName: API
}

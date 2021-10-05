export interface Parameters {
    applyInitialHistory?: undefined
    applyHistory: {
        /** 가맹점번호 */
        mcno: string
        /** 현재 페이지 번호 */
        psPagNo: string
    }
}

/** 마케팅 상태 코드명 */
export type MarketingStatusText = '접수완료' | '준비중' | '진행예정' | '진행중' | '종료' | '재검토 필요' | '취소' | 'default'

/** 신청내역 내용 */
export interface ApplyHistoryItem {
    /** 마케팅 신청 번호 */
    mrktCtsSeq: string
    /** 가맹점명 */
    mcNm: string
    /** 마케팅 혜택 내용 */
    mrktBnfCn: string
    /** 행사시작일자 */
    evSdt: string
    /** 행사종료일자 */
    evEdt: string
    /** 마케팅 상태 코드명 */
    mrktStcNm: MarketingStatusText
}

/** 가맹점 정보 */
export interface FranchiseItem {
    /** 가맹점 번호 */
    mcno: string
    /** 가맹점 명 */
    mcNm: string
}

export interface Responses {
    /** 신청내역 (초기 내역) */
    applyInitialHistory: DefaultResponse<{
        rspDc: ResponseCode
        rspDcMsg: null | string
        /** 가맹점 목록 */
        mcList: FranchiseItem[]
        /** 현재 페이지 번호 */
        psPagNo: string
        /** 더보기 유무 */
        moreYn: YN
        /** 마케팅 목록 */
        mrktAplList: ApplyHistoryItem[]
    }>
    /** 신청 내역 */
    applyHistory: DefaultResponse<{
        rspDc: ResponseCode
        rspDcMsg: null | string
        moreYn: YN
        psPagNo: string
        mrktAplList: ApplyHistoryItem[]
    }>
}

export interface ApplyInitialHistory {
    Req: Parameters['applyInitialHistory']
    Res: SellyServiceResponse<Responses['applyInitialHistory']>
}

export interface ApplyHistory {
    Req: Parameters['applyHistory']
    Res: SellyServiceResponse<Responses['applyHistory']>
}

export interface APINames {
    applyInitialHistory: API
    applyHistory: API
}

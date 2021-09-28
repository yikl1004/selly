interface Parameters {
    /** @description 공지사항 목록 */
    noticeList: {
        /** 페이지 번호 */
        pageNo: string
    }

    /** @description 공지사항 상세 */
    noticeDetail: {
        /** 공지사항 일련번호 */
        anSeq: string
    }

    /** @description FAQ 조회 */
    faqList: {
        /** 페이지 번호 */
        pageNo: string
        /** 카테고리 구분 코드 */
        faqCtgDc?: string
    }

    /** @description FAQ카테고리 조회 */
    faqCategory: {}

    /** @description 이용약관 목록 */
    policyList: {
        /** 페이지 번호 */
        pageNo: string
        /** 그룹코드 */
        comGrpC: string
    }

    /** @description 이용약관 상세 */
    policyDetail: {
        /** 일련번호 */
        prvSeq: string
    }

    /** @description 이용약관 상세 - 직접 호출*/
    policyDetailDirect: {
        /** 그룹 코드 */
        comGrpC: string
        /** 공통 코드 */
        comC: string
    }
}

export interface Responses {
    noticeList: DefaultResponse<{
        list: {
            /** 게시물 일련번호 */
            anSeq: string
            /** 제목 */
            anTitNm: string
            /** 주요공지 여부 */
            mnAnYn: string
            /** 최초생성 일시 */
            fstCrtDtti: string
        }[]
        /** 더보기 여부 */
        moreYn: YN
        /** 총 게시물 갯수 */
        totalCnt: number
    }>
    noticeDetail: DefaultResponse<{
        anCn: string
        anTitNm: string
        fstCrtDtti: number | string
    }>
    faqList: DefaultResponse<{
        /** FAQ 목록 */
        list: {
            /** 카테고리 구분 코드 */
            faqCtgDc: string
            /** 카테고리 명 */
            faqCtgNm: string
            /** 제목 */
            faqTitNm: string
            /** 내용 */
            faqCnV: string
        }[]
        moreYn: YN
        totalCnt: number
    }>
    faqCategory: DefaultResponse<{
        /** FAQ 카테고리 목록 */
        list: {
            /** 카테고리 구분 코드 */
            faqCtgDc: string
            /** 카테고리명 */
            faqCtgNm: string
        }[]
    }>
    policyList: DefaultResponse<{
        /** 이용약관 목록 */
        list: {
            /** 일련번호 */
            prvSeq: string
            /** 제목 */
            prvTitNm: string
        }[]
        /** 더보기 여부 */
        moreYn: YN
        /** 총 갯수 */
        totalCnt: number
    }>
    policyDetail: DefaultResponse<{
        prvCn: string
        prvTitNm: string
    }>
    policyDetailDirect: DefaultResponse<{
        /** 약관 일련번호 */
        prvSeq: string
        /** 그룹코드 */
        comGrpC: string
        /** 공통코드 */
        comC: string
        /** 제목명 */
        prvTitNm: string
        /** 이용약관 내용 */
        prvCn: string
        /** 이용약관 번전 번호 */
        prvVerNo: string
    }>
}

export interface NoticeList {
    Res: SellyServiceResponse<Responses['noticeList']>
    Req: Parameters['noticeList']
}
export interface NoticeDetail {
    Res: SellyServiceResponse<Responses['noticeDetail']>
    Req: Parameters['noticeDetail']
}
export interface FaqList {
    Res: SellyServiceResponse<Responses['faqList']>
    Req: Parameters['faqList']
}
export interface FaqCategory {
    Res: SellyServiceResponse<Responses['faqCategory']>
    Req: Parameters['faqCategory']
}
export interface PolicyList {
    Res: SellyServiceResponse<Responses['policyList']>
    Req: Parameters['policyList']
}
export interface PolicyDetail {
    Res: SellyServiceResponse<Responses['policyDetail']>
    Req: Parameters['policyDetail']
}
export interface PolicyDetailDirect {
    Res: SellyServiceResponse<Responses['policyDetailDirect']>
    Req: Parameters['policyDetailDirect']
}

/** api list key list */
export interface BoardAPIList {
    noticeList: API
    noticeDetail: API
    faqList: API
    faqCategory: API
    policyList: API
    policyDetail: API
    policyDetailDirect: API
}

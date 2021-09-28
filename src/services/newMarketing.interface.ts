export interface FranchiseInfoItem {
    /** 주소 변경신청 가능 여부 */
    aplPsYn: YN
    /** 사업자 번호 */
    bzno: string
    /** 주소 */
    mcAdd: string
    /** 주소 존재 여부 */
    mcAddExsYn: YN
    /** 가맹점명 */
    mcNm: string
    /** 가맹점 번호 */
    mcno: string
    /** 메세지 */
    msg: string
    /** 우편번호 */
    psno: string
    /** 가맹점 전화번호 */
    tlno: string
}

export interface Parameters {
    possibleApplyUser: undefined
    franchiseInfo: undefined
    franchiseInfoSave: {
        /** 사업자 번호 */
        bzno: string
        /** 가맹점 번호 */
        mcno: string
    }
    createCouponDefaultInfo: undefined
}

export interface Responses {
    possibleApplyUser: DefaultResponse<null>
    franchiseInfo: DefaultResponse<{
        /** 업무 응답 코드 */
        rspDc: ResponseCode
        /** 업무 응답 코드 메세지 */
        rspDcMsg: string
        /** 가맹점 정보 목록 */
        list: FranchiseInfoItem[]
    }>
    franchiseInfoSave: DefaultResponse<{}>
    createCouponDefaultInfo: DefaultResponse<{}>
}

/** Response data / Request parameter type Shortcuts */
export interface PossibleApplyUser {
    Res: SellyServiceResponse<Responses['possibleApplyUser']>
    Req: Parameters['possibleApplyUser']
}

export interface FranchiseInfo {
    Res: SellyServiceResponse<Responses['franchiseInfo']>
    Req: Parameters['franchiseInfo']
}

export interface FranchiseInfoSave {
    Res: SellyServiceResponse<Responses['franchiseInfoSave']>
    Req: Parameters['franchiseInfoSave']
}

export interface CreateCouponDefaultInfo {
    Res: SellyServiceResponse<Responses['createCouponDefaultInfo']>
    Req: Parameters['createCouponDefaultInfo']
}

export interface APINames {
    possibleApplyUser: API
    franchiseInfo: API
    franchiseInfoSave: API
    createCouponDefaultInfo: API
}

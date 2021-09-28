export interface Parameters {
    /** 행정동 지역정보 조회 */
    inquiryDistrict: {
        /** 상위 지역 코드 */
        hiZonC: string
        /** 가맹점 행정동 코드 */
        mcAdmdC: string
    }
}

export interface Responses {
    /** 행정동 지역정보 조회 */
    inquiryDistrict: DefaultResponse<{
        guDongList:
            | null
            | {
                  /** 선택됨 여부 */
                  selected: YN
                  /** 지역 코드 */
                  zonC: string
                  /** 지역분류 코드 */
                  zonClsDc: '01' | '02'
                  /** 지역명 */
                  zonNm: string
              }[]
        list: {
            /** 선택됨 여부 */
            selected: YN
            /** 지역 코드 */
            zonC: string
            /** 지역분류 코드 */
            zonClsDc: '03'
            /** 지역명 */
            zonNm: string
        }[]
    }>
}

export interface InquiryDistrict {
    Res: SellyServiceResponse<Responses['inquiryDistrict']>
    Req: Partial<Parameters['inquiryDistrict']>
}

export interface APINames {
    inquiryDistrict: API
}

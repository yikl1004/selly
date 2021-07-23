import axios, { AxiosResponse } from 'axios'

/**
 * @description
 * 도로명 주소 결과 값과 요청 값을 정의
 */

/** 요청 값 */
interface JusoRequestParameters {
    /** 신청시 발급받은 승인키, default: nothing */
    confmKey: string
    /** 현재 페이지 번호, default: '1' */
    currentPage: string
    /** 페이지당 출력할 결과 Row 수, default: '10' */
    countPerPage: string
    /** 주소 검색어, default: nothing */
    keyword: string
    /** xml	검색결과형식 설정(xml, json) */
    resultType?: string
    /** * 2020년12월8일 추가된 항목, 변동된 주소정보 포함 여부, default: nothing */
    hstryYn?: string
    /**
     * * 2020년12월8일 추가된 항목, 정확도순 정렬(none), 우선정렬(road: 도로명 포함, location: 지번 포함), default: none
     * ※ keyword(검색어)가 우선정렬 항목에 포함된 결과 우선 표출
     */
    firstSort?: 'none' | 'road' | 'location'
    /**
     * * 2020년12월8일 추가된 항목
     * 출력결과에 추가된 항목(hstryYn, relJibun, hemdNm) 제공여부
     * ※ 해당 옵션으로 추가제공되는 항목의 경우, 추후 특정항목이 제거되거나 추가될 수 있으니 적용 시 고려해주시기 바랍니다.
     * default: 'N'
     */
    addInfoYn?: YN
}

type Results = {
    common: Common
    juso: JusoItem[]
}

interface JusoResponse {
    results: Results
}

/** 결과 값의 common */
interface Common {
    /** 총 검색 데이터수 */
    totalCount: string
    /** 페이지 번호 */
    currentPage: string
    /** 페이지당 출력할 결과 Row 수 */
    countPerPage: string
    /** 에러 코드 */
    errorCode: string
    /** 에러 메시지 */
    errorMessage: string
}

/** 결과 값의 juso 리스트 */
export interface JusoItem {
    /** 전체 도로명주소 */
    roadAddr: string
    /** 도로명주소(참고항목 제외) */
    roadAddrPart1: string
    /** 도로명주소 참고항목 */
    roadAddrPart2?: string
    /** 지번주소 */
    jibunAddr: string
    /** 도로명주소(영문) */
    engAddr: string
    /** 우편번호 */
    zipNo: string
    /** 행정구역코드 */
    admCd: string
    /** 도로명코드 */
    rnMgtSn: string
    /** 건물관리번호 */
    bdMgtSn: string
    /** 상세건물명 */
    detBdNmList?: string
    /** 건물명 */
    bdNm?: string
    /** 공동주택여부(1 : 공동주택, 0 : 비공동주택) */
    bdKdcd: '1' | '0'
    /** 시도명 */
    siNm: string
    /** 시군구명 */
    sggNm: string
    /** 읍면동명 */
    emdNm: string
    /** 법정리명 */
    liNm?: string
    /** 도로명 */
    rn: string
    /** 지하여부(0 : 지상, 1 : 지하) */
    udrtYn: '0' | '1'
    /** 건물본번 */
    buldMnnm: number
    /** 건물부번 */
    buldSlno: number
    /** 산여부(0 : 대지, 1 : 산) */
    mtYn: '0' | '1'
    /** 지번본번(번지) */
    lnbrMnnm: number
    /** 지번부번(호) */
    lnbrSlno: number
    /** 읍면동일련번호 */
    emdNo: string
    /**
     * * 2020년12월8일 추가된 항목
     * 변동이력여부(0: 현행 주소정보, 1: 요청변수의 keyword(검색어)가 변동된 주소정보에서 검색된 정보)
     */
    hstryYn: '0' | '1'
    /**
     * * 2020년12월8일 추가된 항목
     * 관련지번
     */
    relJibun?: string
    /**
     * * 2020년12월8일 추가된 항목
     * 관할주민센터, ※ 참고정보이며, 실제와 다를 수 있습니다.
     */
    hemdNm: string
}

interface DefaultParameters {
    countPerPage: string
    resultType: string
    confmKey: string
}

class JusoService {
    // API 정보
    private loginExtend: API = {
        url: '/API/CMN/SECMNFA001',
        method: 'post',
    }

    /** 고정 파라미터 */
    private defaultParameters: DefaultParameters = {
        countPerPage: '10',
        resultType: 'json',
        confmKey: process.env.VUE_APP_JUSO_API_KEY,
    }

    /** 검색 */
    async search(
        keyword: string,
        nextPage?: string,
    ): Promise<AxiosResponse<JusoResponse>> {
        return await axios.get<JusoResponse>(
            'https://www.juso.go.kr/addrlink/addrLinkApi.do',
            {
                params: {
                    keyword,
                    currentPage: nextPage || '1',
                    ...this.defaultParameters,
                },
            },
        )
    }
}

export default new JusoService()

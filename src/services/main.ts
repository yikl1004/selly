import { axiosInstance } from '@services/http'
import { IncreaseValue } from '@stores/modules/sales'
import { AxiosResponse } from 'axios'
import type { MarketingStatus } from '@services/marketing'

/**
 * @interface MainCardInfo 메인 카드 정보
 */
export interface MainCardInfo {
    // 로카머니 비즈니스 카드 보유 여부
    lmBizYn: YN
    // 로카코인
    locaCoin: number
    // 결제 예정 금액 URL
    todBilAm: number
    // LOCA 2.0 결제 예정 금액 URL
    todBilAmUrl: null | string
    // LOCA 2.0 로카코인 URL
    locaCoinUrl: null | string
    // LOCA 2.0 신용카드 신청 URL
    cardUrl: string
    // 카드 이미지
    cardImg: string
    // 카드 텍스트
    cardText: string
    // 카드 텍스트 부제
    cardSubText: string
}

/**
 * @type { MainFinancialGubun } 대출 구분
 */
export type MainFinancialGubun =
    | '1' // 비즈론 가능
    | '2' // 장기카드론
    | '3' // 사업자 대출
    | '4' // 즉시대출

/**
 * @interface MainAffiliateBannerItem 제휴사 배너 리스트 아이템 정보
 */
export interface MainAffiliateBannerItem {
    // 배너명(제휴사 명)
    bnnMenNm: string
    // 배너 서브 텍스트
    bnnSubText: string
    // 배너 이미지 경로
    filePhNm: string
    // 배너 url(링크)
    bnnUrl: string
    // 순서
    qeeOdrV: string
}

/**
 * @interface MainSalesItem 매출/입금 리스트 아이템 정보
 */
export interface MainSalesItem {
    // 금액
    am: string
    // 전일 대비 매출 증감
    bfdCmrSlIcrDcr: IncreaseValue['increase']
    // 기준날짜
    date: string
    // 매출/입금 구분
    slDc: SalesOrDeposit
}

/**
 * @interface MainMarketingItem 마케팅 리스트 아이템 정보
 */
export interface MainMarketingItem {
    // 할인율
    dcR: string
    // 행사 종료일자
    evEdt: string
    // 행사 시작일자
    evSdt: string
    // 집계 구분 명
    ggDNm: string
    // 집계 구분 코드
    ggDc: string
    // 가맹점 명
    mcNm: string
    // 마케팅 신청 일자
    mrktAplDt: string
    // 마케팅 혜택 내용
    mrktBnfCn: string
    // 마케팅 신청 일련번호
    mrktCtsSeq: string
    // 마케팅 상태 코드
    mrktStc: MarketingStatus
    // 목표 대상 고객수
    trgOjCstt: string
    // 이용고객수
    ucstt: string
    // 이용건수
    uct: string
}

/** 매출/입금 구분 코드 */
type SalesOrDeposit =
    | '0' // 매출
    | '1' // 입금

/** 스크래핑(연동) 여부 구분 코드 */
type Scrapping =
    | '0' // 연동 하지 않았고 연동 데이터 없음
    | '1' // 연동 후 데이터 수집 및 연동이 안되어 있는 상태
    | '2' // 연동 데이터 있음(연동 되었고 데이터도 있는 상태)

export interface MainResponse {
    // FIXME: 계속 업데이트 중
    mainInfo: DefaultResponse<{
        // 메인 카드 정보
        cardinf: MainCardInfo
        // 매출/입금 스크래핑 구분 코드
        scrapDc: Scrapping
        // 대표자명
        dgNm: string
        // 메인 금융 부분
        fininf: {
            // 대출 구분
            findc: MainFinancialGubun
            // LOCA 2.0 링크
            url: string
        }
        // 마케팅 정보 리스트
        list1: null | MainMarketingItem[]
        // 매출/입금 정보 리스트
        list2: null | MainSalesItem[]
        // 제휴사 배너 리스트
        list3: null | MainAffiliateBannerItem[]
    }>
}

type MainInfoRes = Promise<AxiosResponse<MainResponse['mainInfo']>>

class MainService {
    // 메인화면 정보
    private mainInfo: API = {
        url: '/API/MAI/SEMAIAA001',
        method: 'post',
    }

    // 메인화면 정보요청
    async getMainInfo(): MainInfoRes {
        return await axiosInstance.request({
            ...this.mainInfo,
        })
    }
}

export default new MainService()

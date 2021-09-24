import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

type OnlyBusinessNumber = {
    // 사업자 번호
    bzno?: string
}

type IncreaseFlag =
    | 'I' // 증가
    | 'D' // 감소
    | 'N' // 유지

export interface SalesParameters {
    /**
     * @description 매출내역 > 일간
     */
    salesDaily?: OnlyBusinessNumber
    /**
     * @description 매출내역 > 주간
     */
    salesWeekly?: OnlyBusinessNumber
    /**
     * @description 매출내역 > 요일별
     */
    salesDayOfWeek?: OnlyBusinessNumber
    /**
     * @description 매출내역>요일별최근4주매출
     */
    salesFourWeeksPerDay: {
        // 사업자 번호
        bzno: string
        // 기준일자 - YYYYMMDD
        stdt: string
    }
    /**
     * @description 입금내역 > 일간
     */
    depositDaily?: OnlyBusinessNumber
    /**
     * @description 입금내역 > 주간
     */
    depositWeekly?: OnlyBusinessNumber
    /**
     * @description 입금내역 > 요일별
     */
    depositDayOfWeek?: OnlyBusinessNumber
    /**
     * @description 입금내역 > 요일별최근4주매출
     */
    depositFourWeeksPerDay: {
        // 사업자 번호
        bzno: string
        // 기준일자 - YYYYMMDD
        stdt: string
    }
}

export interface SalesResponse {
    scrappingInfo: DefaultResponse<{
        list: {
            // 사업자 연동 ID (비즈넵 연동시 필요)
            bzmanLnkId: null | string
            // 사업자명
            bzmanNm: string
            // 사업자번호
            bzno: string
            // 연동 여부 (Y: 1개이상, N: 연동 없음)
            lnkYn: YN
            // 연동 제휴사 코드
            scrapOfcoDc:
                | '00001' // 비즈넵
                | '00002' // 로카M
            //??
            scrapOfcoNm: null | string
            // 스크래핑 기준 일자
            scrapStdt: string
            // 스크래핑 여부(Y: 전체 스크래핑, N: 스크래핑 없음)
            scrapYn: YN
        }[]
    }>
    salesDaily: DefaultResponse<{
        // 전일 대비 매출 금액
        bfdCmrSlAm: string
        // 전일 대비 매출 증감
        bfdCmrSlIcrDcr: IncreaseFlag
        // 전일 매출 총액
        bfdSlTam: string
        // 사업자 번호
        bzno: null | string
        // 카드 매출 총액
        cdSlTam: string
        // 현금영수증 매출 총액
        chrctSlTam: string
        // 배달 매출 총액
        drvySlTam: string
        // 최근 7일 매출 목록
        list: {
            // 일자
            dt: string
            // 매출 총액
            slTam: string
        }[]
        // 제휴사 배너 목록
        list2: {
            /** 배너 Alt 값 */
            bnnAlt: string
            /** 배너명 */
            bnnMenNm: string
            /** 배너 아이콘 경로 url */
            bnnPath: string
            /** 배너 서브문구 */
            bnnSuImgNm: string
            /** 배너 링크 url */
            bnnUrl: string
        }[]
        // 최근 7일 평균 대비 매출 금액
        re7dAvCmrSlAm: string
        // 최근 7일 평균 대비 매출 증감
        re7dAvCmrSlIcrDcr: IncreaseFlag
        // 최근 7일 평균 매출 금액
        re7dAvSlAm: string
        // 매출 총액
        slTam: string
        // 기준일자
        stdt: string
    }>
    salesWeekly: DefaultResponse<{
        // 전주 대비 매출 금액
        bfwCmrSlAm: string
        // 전주 대비 매출 금액 증감
        bfwCmrSlIcrDcr: IncreaseFlag
        // 전주 매출 총액
        bfwSlTam: string
        // 사업자번호
        bzno: null | string
        // 카드 매출 총액
        cdSlTam: string
        // 현금영수증 매출 총액
        chrctSlTam: string
        // 배달 매출 총액
        drvySlTam: string
        // 종료 일자
        edt: string
        // 최근 4주 매출 목록
        list: {
            // 시작 일자
            sdt: string
            // 종료 일자
            edt: string
            // 매출 총액
            slTam: string
        }[]
        // 최근 4주 평균 대비 매출 금액
        re4wAvCmrSlAm: string
        // 최근 4주 평균 대비 매출 증감
        re4wAvCmrSlIcrDcr: IncreaseFlag
        // 최근 4주 평균 매출 금액
        re4wAvSlAm: string
        // 시작 일자
        sdt: string
        // 매출 총액
        slTam: string
        // 기준 일자
        stdt: string
    }>
    salesDayOfWeek: DefaultResponse<{
        // 전주 요일 대비 매출 금액
        bfwDwCmrSlAm: string
        // 전주 요일 대비 매출 증감
        bfwDwCmrSlIcrDcr: IncreaseFlag
        // 전주 요일 먜출 총액
        bfwDwSlTam: null
        // 사업자 번호
        bzno: null | string
        // 카드 매출 총액
        cdSlTam: string
        // 현금영수증 매출 총액
        chrctSlTam: string
        // 배달 매출 총액
        drvySlTam: string
        // 최근 7일 매출 목록
        list: {
            // 일자
            dt: string
            // 매출 총액
            slTam: string
            // 최근 4주 요일 평균 매출 금액
            re4wDwAvSlAm: string
        }[]
        // 매출 총액
        slTam: string
        // 기준일자
        stdt: string
        // 최근 4주 요일 평균 대비 매출 금액
        re4wDwAvCmrSlAm: string
        // 최근 4주 요일 평균 대비 매출 증감
        re4wDwAvCmrSlIcrDcr: IncreaseFlag
        // 최근 4주 요일 평균 매출 금액
        re4wDwAvSlAm: string
    }>
    salesFourWeeksPerDay: DefaultResponse<{
        bzno: null | string
        list: {
            dt: string
            slTam: string
        }[]
        re4wDwAvSlAm: string
        stdt: string
    }>

    depositDaily: DefaultResponse<{
        // 전일 대비 입금 금액
        bfdCmrPayAm: string
        // 전일 대비 입금 증감
        bfdCmrPayIcrDcr: IncreaseFlag
        // 전일 입금 총액
        bfdPayTam: string
        // 사업자 번호
        bzno: null | string
        // 카드 입금 총액
        cdPayTam: string
        // 배달 입금 총액
        drvyPayTam: string
        list: {
            // 일자
            dt: string
            // 입금 총액
            payTam: string
        }[]
        // 입금 총액
        payTam: string
        // 최근 7일 평균 대비 입금 금액
        re7dAvCmrPayAm: string
        // 최근 7일 평균 대비 입금 증감
        re7dAvCmrPayIcrDcr: IncreaseFlag
        // 최근 7일 평균 입금 금액
        re7dAvPayAm: string
        // 기준 일자
        stdt: string
    }>
    depositWeekly: DefaultResponse<{
        // 전주 대비 입금 금액
        bfwCmrPayAm: string
        // 전주 대비 입금 증감
        bfwCmrPayIcrDcr: IncreaseFlag
        // 전주 입금 총액
        bfwPayTam: string
        // 사업자 번호
        bzno: null | string
        // 카드 입금 총액
        cdPayTam: string
        // 배달 입금 총액
        drvyPayTam: string
        // 종료 일자
        edt: string
        // 최근 4주 입금 목록
        list: {
            // 시작 일자
            sdt: string
            // 종료 일자
            edt: string
            // 입금 총액
            payTam: string
        }[]
        // 입금 총액
        payTam: string
        // 최근 4주 평균 대비 입금 금액
        re4wAvCmrPayAm: string
        // 최근 4주 평균 대비 입금 증감
        re4wAvCmrPayIcrDcr: IncreaseFlag
        // 최근 4주 평균 입금 금액
        re4wAvPayAm: string
        // 시작 일자
        sdt: string
        // 기준 일자
        stdt: string
    }>
    depositDayOfWeek: DefaultResponse<{
        // 전주 요일 대비 입금 금액
        bfwDwCmrPayAm: null | string
        // 전주 요일 대비 입금 증감
        bfwDwCmrPayIcrDcr: IncreaseFlag
        // 전주 요일 입금 총액
        bfwDwPayTam: string
        // 사업자 번호
        bzno: null | string
        // 카드 입금 총액
        cdPayTam: string
        // 배달 4입금 총액
        drvyPayTam: string
        // 최근 7일 입금 목록
        list: {
            // 일자
            dt: string
            // 입금 총액
            payTam: string
            // 최근 4주 요일 평균 입금 금액
            re4wDwAvPayAm: string
        }[]
        // 입금 총액
        payTam: string
        // 최근 4주 요일 평균 대비 입금 금액
        re4wDwAvCmrPayAm: string
        // 최근 4주 요일 평균 대비 입금 증감
        re4wDwAvCmrPayIcrDcr: IncreaseFlag
        // 최근 4주 요일 평균 입금 금액
        re4wDwAvPayAm: string
        // 기준 일자
        stdt: string
    }>
    depositFourWeeksPerDay: DefaultResponse<{
        // 사업자 번호
        bzno: string
        // 요일 최근 4주 매출 목록
        list: {
            // 날짜
            dt: string
            // 입금 총액
            payTam: string
        }[]
        // 최근 4주 요일 평균 입금 금액
        re4wDwAvSlAm: null | string
        // 기준 일자
        stdt: string
    }>
}

// daily, weekly, dayOfWeek
type ScrappingInfoRes = Promise<AxiosResponse<SalesResponse['scrappingInfo']>>
type SalesDailyRes = Promise<AxiosResponse<SalesResponse['salesDaily']>>
type SalesWeeklyRes = Promise<AxiosResponse<SalesResponse['salesWeekly']>>
type SalesDayOfWeekRes = Promise<AxiosResponse<SalesResponse['salesDayOfWeek']>>
type SalesFourWeeksPerDayRes = Promise<AxiosResponse<SalesResponse['salesFourWeeksPerDay']>>
type DepositDailyRes = Promise<AxiosResponse<SalesResponse['depositDaily']>>
type DepositWeeklyRes = Promise<AxiosResponse<SalesResponse['depositWeekly']>>
type DepositDayOfWeekRes = Promise<AxiosResponse<SalesResponse['depositDayOfWeek']>>
type DepositFourWeeksPerDayRes = Promise<AxiosResponse<SalesResponse['depositFourWeeksPerDay']>>

class SalesService {
    // 제휴사 연동 및 스크래핑 정보 조회
    private scrappingInfo: API = {
        url: '/API/SLE/SESLEZZ001',
        method: 'post',
    }

    // 매출내역>일간
    private salesDaily: API = { url: '/API/SLE/SESLEAA001', method: 'post' }
    // 매출내역>주간
    private salesWeekly: API = { url: '/API/SLE/SESLEAA002', method: 'post' }
    // 매출내역>요일별
    private salesDayOfWeek: API = { url: '/API/SLE/SESLEAA003', method: 'post' }
    // 매출내역>요일별최근4주매출
    private salesFourWeeksPerDay: API = {
        url: '/API/SLE/SESLEAA004',
        method: 'post',
    }

    // 입금내역>일간
    private depositDaily: API = { url: '/API/SLE/SESLEBA001', method: 'post' }
    // 입금내역>주간
    private depositWeekly: API = { url: '/API/SLE/SESLEBA002', method: 'post' }
    // 입금내역>요일별
    private depositDayOfWeek: API = { url: '/API/SLE/SESLEBA003', method: 'post' }
    // 입금내역>요일별최근4주입금
    private depositFourWeeksPerDay: API = {
        url: '/API/SLE/SESLEBA004',
        method: 'post',
    }

    // 제휴사 연동 및 스크래핑 정보 조회
    async getScrappingInfo(): ScrappingInfoRes {
        return await axiosInstance.request({ ...this.scrappingInfo })
    }

    // 매출내역>일간
    async getSalesDaily(params?: SalesParameters['salesDaily']): SalesDailyRes {
        return await axiosInstance.request({ ...this.salesDaily, params })
    }

    // 매출내역>주간
    async getSalesWeekly(params: SalesParameters['salesWeekly']): SalesWeeklyRes {
        return await axiosInstance.request({ ...this.salesWeekly, params })
    }

    // 매출내역>요일별
    async getSalesDayOfWeek(params: SalesParameters['salesDayOfWeek']): SalesDayOfWeekRes {
        return await axiosInstance.request({ ...this.salesDayOfWeek, params })
    }

    // 매출내역 > 요일별 최근 4주 매출
    async getSalesFourWeeksPerDay(params: SalesParameters['salesFourWeeksPerDay']): SalesFourWeeksPerDayRes {
        return await axiosInstance.request({ ...this.salesFourWeeksPerDay, params })
    }

    // 입금내역>일간
    async getDepositDaily(params?: SalesParameters['depositDaily']): DepositDailyRes {
        return await axiosInstance.request({ ...this.depositDaily, params })
    }

    // 입금내역>주간
    async getDepositWeekly(params: SalesParameters['depositWeekly']): DepositWeeklyRes {
        return await axiosInstance.request({ ...this.depositWeekly, params })
    }

    // 입금내역 > 요일별
    async getDepositDayOfWeek(params: SalesParameters['depositDayOfWeek']): DepositDayOfWeekRes {
        return await axiosInstance.request({ ...this.depositDayOfWeek, params })
    }

    // 매출내역 > 요일별 최근 4주 매출
    async getDepositFourWeeksPerDay(params: SalesParameters['depositFourWeeksPerDay']): DepositFourWeeksPerDayRes {
        return await axiosInstance.request({ ...this.depositFourWeeksPerDay, params })
    }
}

export default new SalesService()

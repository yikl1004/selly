import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

type OnlyBusinessNumber = {
    // 사업자 번호
    bzno?: string
}

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
}

export interface SalesResponse {
    salesDaily: {
        rc: ResponseCode
        rsMsg: string
        data: {
            // 전일 대비 매출 금액
            bfdCmrSlAm: string
            // 전일 대비 매출 증감
            bfdCmrSlIcrDcr: 'I' | 'D' | 'N'
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
                // 요일
                dw: string
                // 매출 총액
                slTam: string
            }[]
            // 최근 7일 평균 대비 매출 금액
            re7dAvCmrSlAm: string
            // 최근 7일 평균 대비 매출 증감
            re7dAvCmrSlIcrDcr: 'I' | 'D' | 'N'
            // 최근 7일 평균 매출 금액
            re7dAvSlAm: string
            // 매출 총액
            slTam: string
            // 기준일자
            stdt: string
            // 기준 요일(?)
            stdw: string
        }
    }
    salesWeekly: {
        rc: ResponseCode
        rsMsg: string
        data: {
            // 전주 대비 매출 금액
            bfwCmrSlAm: string
            // 전주 대비 매출 금액 증감
            bfwCmrSlIcrDcr: 'I' | 'D' | 'N'
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
            re4wAvCmrSlIcrDcr: 'I' | 'D' | 'N'
            // 최근 4주 평균 매출 금액
            re4wAvSlAm: string
            // 시작 일자
            sdt: string
            // 매출 총액
            slTam: string
            // 기준 일자
            stdt: string
        }
    }
    salesDayOfWeek: {
        rc: ResponseCode
        rsMsg: string
        data: {
            // 전주 요일 대비 매출 금액
            bfwDwCmrSlAm: string
            // 전주 요일 대비 매출 증감
            bfwDwCmrSlIcrDcr: 'I' | 'D' | 'N'
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
        }
    }
    depositDaily: {
        rc: ResponseCode
        rsMsg: string
        data: {}
    }
    depositWeekly: {
        rc: ResponseCode
        rsMsg: string
        data: {}
    }
    depositDayOfWeek: {
        rc: ResponseCode
        rsMsg: string
        data: {}
    }
}

// daily, weekly, dayOfWeek
type SalesDailyRes = Promise<AxiosResponse<SalesResponse['salesDaily']>>
type SalesWeeklyRes = Promise<AxiosResponse<SalesResponse['salesWeekly']>>
type SalesDayOfWeekRes = Promise<AxiosResponse<SalesResponse['salesDayOfWeek']>>
type DepositDailyRes = Promise<AxiosResponse<SalesResponse['depositDaily']>>
type DepositWeeklyRes = Promise<AxiosResponse<SalesResponse['depositWeekly']>>
type DepositDayOfWeekRes = Promise<AxiosResponse<SalesResponse['depositDayOfWeek']>>

class SalesService {
    // 매출내역>일간
    private salesDaily: API = { url: '/API/SLE/SESLEAA001', method: 'post' }
    // 매출내역>주간
    private salesWeekly: API = { url: '/API/SLE/SESLEAA002', method: 'post' }
    // 매출내역>요일별
    private salesDayOfWeek: API = { url: '/API/SLE/SESLEAA003', method: 'post' }
    // 입금내역>일간
    private depositDaily: API = { url: '/API/SLE/SESLEBA001', method: 'post' }
    // 입금내역>주간
    private depositWeekly: API = { url: '/API/SLE/SESLEBA002', method: 'post' }
    // 입금내역>요일별
    private depositDayOfWeek: API = { url: '/API/SLE/SESLEBA003', method: 'post' }

    // 매출내역>일간
    async getSalesDaily(params: SalesParameters['salesDaily']): SalesDailyRes {
        const { url, method } = this.salesDaily

        return await axiosInstance.request({ method, url, params })
    }

    // 매출내역>주간
    async getSalesWeekly(params: SalesParameters['salesWeekly']): SalesWeeklyRes {
        const { url, method } = this.salesWeekly

        return await axiosInstance.request({ method, url, params })
    }

    // 매출내역>요일별
    async getSalesDayOfWeek(params: SalesParameters['salesDayOfWeek']): SalesDayOfWeekRes {
        const { url, method } = this.salesDayOfWeek

        return await axiosInstance.request({ method, url, params })
    }
    // 입금내역>일간
    async getDepositDaily(params: SalesParameters['depositDaily']): DepositDailyRes {
        const { url, method } = this.depositDaily

        return await axiosInstance.request({ method, url, params })
    }

    // 입금내역>주간
    async getDepositWeekly(params: SalesParameters['depositWeekly']): DepositWeeklyRes {
        const { url, method } = this.depositWeekly

        return await axiosInstance.request({ method, url, params })
    }
    // 입금내역>요일별
    async getDepositDayOfWeek(params: SalesParameters['depositDayOfWeek']): DepositDayOfWeekRes {
        const { url, method } = this.depositDayOfWeek

        return await axiosInstance.request({ method, url, params })
    }
}

export default new SalesService()

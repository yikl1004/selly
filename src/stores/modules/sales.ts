import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import SalesService from '@services/sales'
import { $dayjs } from '@utils/plugins/dayjs'
import toNumber from 'lodash/toNumber'
import pick from 'lodash/pick'
import mapKeys from 'lodash/mapKeys'
import mapValues from 'lodash/mapValues'

import type { RootStore } from '@stores/index'
import type { SalesParameters, SalesResponse } from '@services/sales'

type DayOfWeekAverageData = { value: string; date: string }
export interface SalesState {
    salesDaily: SalesDailyRes | null
    salesWeekly: SalesWeeklyRes | null
    salesDayOfWeek: SalesDayOfWeekRes | null
    depositDaily: DepositDailyRes | null
    depositWeekly: DepositWeeklyRes | null
    depositDayOfWeek: DepositDayOfWeekRes | null
    salesDayOfWeekAverageData: DayOfWeekAverageData[]
    depositDayOfWeekAverageData: DayOfWeekAverageData[]
}

export type SalesDailyParams = SalesParameters['salesDaily']
export type SalesWeeklyParams = SalesParameters['salesWeekly']
export type SalesDayOfWeekParams = SalesParameters['salesDayOfWeek']
export type SalesFourWeeksPerDayParams = SalesParameters['salesFourWeeksPerDay']
export type DepositDailyParams = SalesParameters['depositDaily']
export type DepositWeeklyParams = SalesParameters['depositWeekly']
export type DepositDayOfWeekParams = SalesParameters['depositDayOfWeek']
export type DepositFourWeeksPerDayParams = SalesParameters['depositFourWeeksPerDay']

export type ScrappingInfoRes = SalesResponse['scrappingInfo']
export type SalesDailyRes = SalesResponse['salesDaily']
export type SalesWeeklyRes = SalesResponse['salesWeekly']
export type SalesDayOfWeekRes = SalesResponse['salesDayOfWeek']
export type DepositDailyRes = SalesResponse['depositDaily']
export type DepositWeeklyRes = SalesResponse['depositWeekly']
export type DepositDayOfWeekRes = SalesResponse['depositDayOfWeek']

export interface DateList {
    // 일간
    daily: 'daily'
    // 주간
    weekly: 'weekly'
    // 요일별
    dayOfWeek: 'dayOfWeek'
}

export type Status = keyof DateList

export type IncreaseValue = {
    value: string
    increase:
        | 'I' // 증가
        | 'D' // 감소
        | 'N' // 유지
}

const dates: DateList = {
    daily: 'daily',
    weekly: 'weekly',
    dayOfWeek: 'dayOfWeek',
}
const seperatePrice = (value?: string | null) => toNumber(value ?? '').toLocaleString()

@Module({ name: 'sales', namespaced: true })
export default class Sales extends VuexModule<SalesState, RootStore> {
    // 스크래핑 정보
    public scrappingInfo: ScrappingInfoRes | null = null

    // 현재 선택된 탭
    public status: Status = 'daily'

    /** 매출 - 일간 */
    public salesDaily: SalesDailyRes | null = null

    /** 매출 - 주간 */
    public salesWeekly: SalesWeeklyRes | null = null

    /** 매출 - 요일별 */
    public salesDayOfWeek: SalesDayOfWeekRes | null = null

    /** 입금 - 일간 */
    public depositDaily: DepositDailyRes | null = null

    /** 입금 - 주간 */
    public depositWeekly: DepositWeeklyRes | null = null

    /** 입금 - 요일별 */
    public depositDayOfWeek: DepositDayOfWeekRes | null = null

    /** 매출 - 요일별 평균 데이터 (recent4WeekDayOfWeekAverageSalesAmount - re4wDwAvslAm) */
    public salesDayOfWeekAverageData: DayOfWeekAverageData[] = []
    /** 입금 - 요일별 평균 데이터 (recent4WeekDayOfWeekAveragePayAmount - re4wDwAvPayAm) */
    public depositDayOfWeekAverageData: DayOfWeekAverageData[] = []

    /**
     * 현재 선택된 탭 변경하기
     * @param {Status} status
     */
    @Mutation
    changeStatus(status: Status) {
        this.status = status
    }

    @MutationAction
    async getScrappingInfo() {
        const { data } = await SalesService.getScrappingInfo()

        console.log(data)
        return {
            scrappingInfo: data,
        }
    }

    @MutationAction
    async getSalesDaily(params: SalesDailyParams) {
        const { data } = await SalesService.getSalesDaily(params)
        return {
            salesDaily: data,
        }
    }

    @MutationAction
    async getSalesWeekly(params: SalesWeeklyParams) {
        const { data } = await SalesService.getSalesWeekly(params)
        return {
            salesWeekly: data,
        }
    }

    @MutationAction
    async getSalesDayOfWeek(params: SalesDayOfWeekParams) {
        const { data } = await SalesService.getSalesDayOfWeek(params)
        return {
            salesDayOfWeek: data,
            salesDayOfWeekAverageData: data.data.list.map(item => ({
                value: item.re4wDwAvSlAm,
                date: item.dt,
            })),
        }
    }

    @MutationAction
    async getSalesFourWeeksPerDay(params: SalesFourWeeksPerDayParams) {
        const { data } = await SalesService.getSalesFourWeeksPerDay(params)
        const typedSalesDayOfWeek = (this.state as SalesState).salesDayOfWeek

        return {
            salesDayOfWeek: {
                ...typedSalesDayOfWeek,
                data: {
                    ...typedSalesDayOfWeek?.data,
                    list: data.data.list,
                },
            },
        }
    }

    @MutationAction
    async getDepositDaily(params: DepositDailyParams) {
        const { data } = await SalesService.getDepositDaily(params)
        return {
            depositDaily: data,
        }
    }

    @MutationAction
    async getDepositWeekly(params: DepositWeeklyParams) {
        const { data } = await SalesService.getDepositWeekly(params)
        return {
            depositWeekly: data,
        }
    }

    @MutationAction
    async getDepositDayOfWeek(params: DepositDayOfWeekParams) {
        const { data } = await SalesService.getDepositDayOfWeek(params)
        return {
            depositDayOfWeek: data,
            depositDayOfWeekAverageData: data.data.list.map(item => ({
                value: item.re4wDwAvPayAm,
                date: item.dt,
            })),
        }
    }

    @MutationAction
    async getDepositFourWeeksPerDay(params: DepositFourWeeksPerDayParams) {
        const { data } = await SalesService.getDepositFourWeeksPerDay(params)
        const typedDepositDayOfWeek = (this.state as SalesState).depositDayOfWeek
        console.log('이거 >>>>>>>>>>>> ', data)
        return {
            depositDayOfWeek: {
                ...typedDepositDayOfWeek,
                data: {
                    ...typedDepositDayOfWeek?.data,
                    list: data.data.list,
                },
            },
        }
    }

    /***********************************************************************
     * 매출 & 입금 공통
     *********************************************************************** */

    /** 사업장 정보 */
    get workingPlaceList() {
        return this.scrappingInfo
            ? this.scrappingInfo.data?.list.map((item, index) => {
                  return {
                      selected: index === 0,
                      displayName: item.bzmanNm,
                      value: item.bzno,
                  }
              })
            : []
    }

    /** 연동 여부 */
    get whetherTolinkage() {
        return this.scrappingInfo ? this.scrappingInfo?.data?.list.some(item => item.lnkYn === 'Y') : false
    }

    /** 스크래핑 여부 (1개 사업자에서 1개 이상 연동 됬으면 true, 그외 false) */
    get whetherToScrape() {
        return this.scrappingInfo ? this.scrappingInfo.data?.list.some(item => item.scrapYn === 'Y') : false
    }

    /***********************************************************************
     * 매출
     *********************************************************************** */

    /** 매출 총액 */
    get salesTotalAmount(): string {
        const cases = {
            [dates.daily]: seperatePrice(this.salesDaily?.data.slTam),
            [dates.weekly]: seperatePrice(this.salesWeekly?.data.slTam),
            [dates.dayOfWeek]: seperatePrice(this.salesDayOfWeek?.data.slTam),
            default: '',
        }

        return cases[this.status || 'default']
    }

    /** 매출 - 기준일, 기준기간, 기준요일 */
    get salesBaseDate() {
        const date = (value?: string, format = 'M/D(ddd)') => $dayjs(value).format(format)
        const cases = {
            [dates.daily]: date(this.salesDaily?.data.stdt || undefined),
            [dates.weekly]: [
                date(this.salesWeekly?.data.stdt || undefined), // 시작일자
                date(this.salesWeekly?.data.edt || undefined), // 종료일자
            ].join(' ~ '),
            [dates.dayOfWeek]: date(this.salesDayOfWeek?.data.stdt || undefined, 'ddd(M/D)'),
            default: '',
        }

        return cases[this.status || 'default']
    }

    /** 매출 - 기준요일 */
    get salesBaseDatePerDay() {
        return this.salesDayOfWeek?.data.stdt ?? ''
    }

    /** 매출 - 전일, 전주, 전주 해당요일 대비 */
    get salesBefore(): IncreaseValue {
        const getIncrease = (value?: IncreaseValue['increase'] | null) => value ?? 'N'
        const cases = {
            [dates.daily]: {
                value: seperatePrice(this.salesDaily?.data.bfdCmrSlAm),
                increase: getIncrease(this.salesDaily?.data.bfdCmrSlIcrDcr),
            },
            [dates.weekly]: {
                value: seperatePrice(this.salesWeekly?.data.bfwCmrSlAm),
                increase: getIncrease(this.salesWeekly?.data.bfwCmrSlIcrDcr),
            },
            [dates.dayOfWeek]: {
                value: seperatePrice(this.salesDayOfWeek?.data.bfwDwCmrSlAm),
                increase: getIncrease(this.salesDayOfWeek?.data.bfwDwCmrSlIcrDcr),
            },
            default: {
                value: '0',
                increase: 'N',
            },
        }

        return cases[this.status || 'default']
    }

    /** 매출 - 최근 7일, 최근 4주, 전주 평균 대비 */
    get salesLatest(): IncreaseValue {
        const getIncrease = (value?: IncreaseValue['increase'] | null) => value ?? 'N'
        const cases = {
            [dates.daily]: {
                value: seperatePrice(this.salesDaily?.data.re7dAvCmrSlAm),
                increase: getIncrease(this.salesDaily?.data.re7dAvCmrSlIcrDcr),
            },
            [dates.weekly]: {
                value: seperatePrice(this.salesWeekly?.data.re4wAvCmrSlAm),
                increase: getIncrease(this.salesWeekly?.data.re4wAvCmrSlIcrDcr),
            },
            [dates.dayOfWeek]: {
                value: seperatePrice(this.salesDayOfWeek?.data.re4wDwAvCmrSlAm),
                increase: getIncrease(this.salesDayOfWeek?.data.re4wDwAvCmrSlIcrDcr),
            },
            default: {
                value: '0',
                increase: 'N',
            },
        }

        return cases[this.status || 'default']
    }

    /** 매출 - 최근 기간 매출 리스트 */
    get salesListOfPerido() {
        const { salesDaily: daily, salesWeekly: weekly, salesDayOfWeek: dayOfWeek } = this
        const cases = {
            [dates.daily]: daily
                ? daily.data.list.map(item => {
                      return {
                          date: $dayjs(item.dt).format('M/D(ddd)'),
                          amount: seperatePrice(item.slTam),
                      }
                  })
                : [],
            [dates.weekly]: weekly
                ? weekly.data.list.map(item => {
                      return {
                          date: [$dayjs(item.sdt).format('M/D'), $dayjs(item.edt).format('M/D')].join('~'),
                          amount: seperatePrice(item.slTam),
                      }
                  })
                : [],
            [dates.dayOfWeek]: dayOfWeek
                ? dayOfWeek.data.list.map(item => {
                      return {
                          date: $dayjs(item.dt).format('M/D(ddd)'),
                          amount: seperatePrice(item.slTam),
                      }
                  })
                : [],
            default: [],
        }
        return cases[this.status || 'default']
    }

    /** 매출 - 최근 평균 매출 */
    get salesLatestAverage() {
        const cases = {
            [dates.daily]: seperatePrice(this.salesDaily?.data.re7dAvSlAm),
            [dates.weekly]: seperatePrice(this.salesWeekly?.data.re4wAvSlAm),
            [dates.dayOfWeek]: seperatePrice(this.salesDayOfWeek?.data.re4wDwAvSlAm),
            default: '',
        }

        return cases[this.status || 'default']
    }

    /** 매출 - 매출 내역 */
    get salesList() {
        const dataPick = <T>(value?: T | null) => {
            const picked = pick(value, ['cdSlTam', 'chrctSlTam', 'drvySlTam'])
            const keyMapped = mapKeys(picked || {}, (value, key) => {
                const keyMap: { [key: string]: string } = {
                    cdSlTam: 'card',
                    chrctSlTam: 'cashReceipt',
                    drvySlTam: 'delivery',
                }

                return keyMap[key]
            })
            const valueMapped = mapValues(keyMapped, value => toNumber(value).toLocaleString())
            return valueMapped
        }

        const cases = {
            [dates.daily]: dataPick<SalesDailyRes['data']>(this.salesDaily?.data),
            [dates.weekly]: dataPick<SalesWeeklyRes['data']>(this.salesWeekly?.data),
            [dates.dayOfWeek]: dataPick<SalesDayOfWeekRes['data']>(this.salesDayOfWeek?.data),
            default: {
                card: '0',
                cashReceipt: '0',
                delivery: '0',
            },
        }

        return cases[this.status || 'default']
    }

    /***********************************************************************
     * 입금
     *********************************************************************** */

    /** 입금 총액 */
    get depositTotalAmount(): string {
        const cases = {
            [dates.daily]: seperatePrice(this.depositDaily?.data.payTam),
            [dates.weekly]: seperatePrice(this.depositWeekly?.data.payTam),
            [dates.dayOfWeek]: seperatePrice(this.depositDayOfWeek?.data.payTam),
            default: '',
        }

        return cases[this.status || 'default']
    }

    /** 입금 - 기준일, 기준기간, 기준요일 */
    get depositBaseDate() {
        const date = (value?: string, format = 'M/D(ddd)') => $dayjs(value).format(format)
        const cases = {
            [dates.daily]: date(this.depositDaily?.data.stdt || undefined),
            [dates.weekly]: [
                date(this.depositWeekly?.data.stdt || undefined), // 시작일자
                date(this.depositWeekly?.data.edt || undefined), // 종료일자
            ].join(' ~ '),
            [dates.dayOfWeek]: date(this.depositDayOfWeek?.data.stdt || undefined, 'ddd(M/D)'),
            default: '',
        }

        return cases[this.status || 'default']
    }

    /** 입금 - 기준요일 */
    get depositBaseDatePerDay() {
        return this.depositDayOfWeek?.data.stdt ?? ''
    }

    /** 입금 - 전일, 전주, 전주 해당요일 대비 */
    get depositBefore(): IncreaseValue {
        const getIncrease = (value?: IncreaseValue['increase'] | null) => value ?? 'N'
        const cases = {
            [dates.daily]: {
                value: seperatePrice(this.depositDaily?.data.bfdCmrPayAm),
                increase: getIncrease(this.depositDaily?.data.bfdCmrPayIcrDcr),
            },
            [dates.weekly]: {
                value: seperatePrice(this.depositWeekly?.data.bfwCmrPayAm),
                increase: getIncrease(this.depositWeekly?.data.bfwCmrPayIcrDcr),
            },
            [dates.dayOfWeek]: {
                value: seperatePrice(this.depositDayOfWeek?.data.bfwDwCmrPayAm),
                increase: getIncrease(this.depositDayOfWeek?.data.bfwDwCmrPayIcrDcr),
            },
            default: {
                value: '0',
                increase: 'N',
            },
        }

        return cases[this.status || 'default']
    }

    /** 입금 - 최근 7일, 최근 4주, 전주 평균 대비 */
    get depositLatest(): IncreaseValue {
        const getIncrease = (value?: IncreaseValue['increase'] | null) => value ?? 'N'
        const cases = {
            [dates.daily]: {
                value: seperatePrice(this.depositDaily?.data.re7dAvCmrPayAm),
                increase: getIncrease(this.depositDaily?.data.re7dAvCmrPayIcrDcr),
            },
            [dates.weekly]: {
                value: seperatePrice(this.depositWeekly?.data.re4wAvCmrPayAm),
                increase: getIncrease(this.depositWeekly?.data.re4wAvCmrPayIcrDcr),
            },
            [dates.dayOfWeek]: {
                value: seperatePrice(this.depositDayOfWeek?.data.re4wDwAvCmrPayAm),
                increase: getIncrease(this.depositDayOfWeek?.data.re4wDwAvCmrPayIcrDcr),
            },
            default: {
                value: '0',
                increase: 'N',
            },
        }

        return cases[this.status || 'default']
    }

    /** 입금 - 최근 기간 입금 리스트 */
    get depositListOfPerido() {
        const { depositDaily: daily, depositWeekly: weekly, depositDayOfWeek: dayOfWeek } = this
        const cases = {
            [dates.daily]: daily
                ? daily.data.list.map(item => {
                      return {
                          date: $dayjs(item.dt).format('M/D(ddd)'),
                          amount: seperatePrice(item.payTam),
                      }
                  })
                : [],
            [dates.weekly]: weekly
                ? weekly.data.list.map(item => {
                      return {
                          date: [$dayjs(item.sdt).format('M/D'), $dayjs(item.edt).format('M/D')].join('~'),
                          amount: seperatePrice(item.payTam),
                      }
                  })
                : [],
            [dates.dayOfWeek]: dayOfWeek
                ? dayOfWeek.data.list.map(item => {
                      return {
                          date: $dayjs(item.dt).format('M/D(ddd)'),
                          amount: seperatePrice(item.payTam),
                      }
                  })
                : [],
            default: [],
        }
        return cases[this.status || 'default']
    }

    /** 입금 - 최근 평균 입금 */
    get depositLatestAverage() {
        const cases = {
            [dates.daily]: seperatePrice(this.depositDaily?.data.re7dAvPayAm),
            [dates.weekly]: seperatePrice(this.depositWeekly?.data.re4wAvPayAm),
            [dates.dayOfWeek]: seperatePrice(this.depositDayOfWeek?.data.re4wDwAvPayAm),
            default: '',
        }

        return cases[this.status || 'default']
    }

    /** 입금 - 매출 내역 */
    get depositList() {
        const dataPick = <T>(value?: T | null) => {
            const picked = pick(value, ['cdPayTam', 'drvyPayTam'])
            const keyMapped = mapKeys(picked || {}, (value, key) => {
                const keyMap: { [key: string]: string } = {
                    cdPayTam: 'card',
                    drvyPayTam: 'delivery',
                }

                return keyMap[key]
            })
            const valueMapped = mapValues(keyMapped, value => toNumber(value).toLocaleString())
            return valueMapped
        }

        const cases = {
            [dates.daily]: dataPick<DepositDailyRes['data']>(this.depositDaily?.data),
            [dates.weekly]: dataPick<DepositWeeklyRes['data']>(this.depositWeekly?.data),
            [dates.dayOfWeek]: dataPick<DepositDayOfWeekRes['data']>(this.depositDayOfWeek?.data),
            default: {
                card: '0',
                delivery: '0',
            },
        }

        return cases[this.status || 'default']
    }
}

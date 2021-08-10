import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import SalesService, { SalesParameters, SalesResponse } from '@services/sales'

export interface SalesState {
    salesDaily: SalesDailyRes | null
    salesWeekly: SalesWeeklyRes | null
    salesDayOfWeek: SalesDayOfWeekRes | null
    depositDaily: DepositDailyRes | null
    depositWeekly: DepositWeeklyRes | null
    depositDayOfWeek: DepositDayOfWeekRes | null
}

export type SalesDailyParams = SalesParameters['salesDaily']
export type SalesWeeklyParams = SalesParameters['salesWeekly']
export type SalesDayOfWeekParams = SalesParameters['salesDayOfWeek']
export type DepositDailyParams = SalesParameters['depositDaily']
export type DepositWeeklyParams = SalesParameters['depositWeekly']
export type DepositDayOfWeekParams = SalesParameters['depositDayOfWeek']

export type SalesDailyRes = SalesResponse['salesDaily']
export type SalesWeeklyRes = SalesResponse['salesWeekly']
export type SalesDayOfWeekRes = SalesResponse['salesDayOfWeek']
export type DepositDailyRes = SalesResponse['depositDaily']
export type DepositWeeklyRes = SalesResponse['depositWeekly']
export type DepositDayOfWeekRes = SalesResponse['depositDayOfWeek']

@Module({ name: 'sales', namespaced: true })
export default class Test extends VuexModule<SalesState> {
    public salesDaily: SalesDailyRes | null = null
    public salesWeekly: SalesWeeklyRes | null = null
    public salesDayOfWeek: SalesDayOfWeekRes | null = null
    public depositDaily: DepositDailyRes | null = null
    public depositWeekly: DepositWeeklyRes | null = null
    public depositDayOfWeek: DepositDayOfWeekRes | null = null

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
        }
    }
}

import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { default as common, CommonState } from './modules/common'
import { default as finance, FinancialState } from './modules/finance'
import { default as auth, AuthState } from './modules/auth'
import { default as ui, UiState } from './modules/ui'
import { default as sales, SalesState } from './modules/sales'

export interface RootStore {
    common: CommonState
    finance: FinancialState
    auth: AuthState
    ui: UiState
    sales: SalesState
}

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    strict: process.env.NODE_ENV === 'development',
    modules: {
        common,
        finance,
        auth,
        ui,
        sales,
    },
    plugins: [createLogger()],
})

if (process.env.NODE_ENV === 'development') {
    window.store = store
}

export default store

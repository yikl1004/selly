import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { default as common } from './modules/common'
import { default as finance } from './modules/finance'
import { default as auth } from './modules/auth'
import { default as ui } from './modules/ui'
import { default as sales } from './modules/sales'
import { default as board } from './modules/board'

import type { CommonState } from './modules/common'
import type { FinancialState } from './modules/finance'
import type { AuthState } from './modules/auth'
import type { UiState } from './modules/ui'
import type { SalesState } from './modules/sales'
import type { BoardState } from './modules/board'

export interface RootStore {
    common: CommonState
    finance: FinancialState
    auth: AuthState
    ui: UiState
    sales: SalesState
    board: BoardState
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
        // board,
    },
    plugins: [createLogger()],
})

if (process.env.NODE_ENV === 'development') {
    window.store = store
}

export default store

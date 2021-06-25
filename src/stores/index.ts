import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { default as finance, FinancialState } from './modules/finance'
import { default as auth, AuthState } from './modules/auth'
import { default as ui, UiState } from './modules/ui'

interface RootStore {
    finance: FinancialState
    auth: AuthState
    ui: UiState
}

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    strict: process.env.NODE_ENV === 'development',
    modules: {
        finance,
        auth,
        ui,
    },
    plugins: [createLogger()],
})

export default store

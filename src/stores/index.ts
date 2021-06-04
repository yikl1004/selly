import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { default as finance, FinancialState } from './modules/finance'
import { default as auth, AuthState } from './modules/auth'

interface RootStore {
    finance: FinancialState
    auth: AuthState
}

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    strict: process.env.NODE_ENV === 'development',
    modules: {
        finance,
        auth,
    },
    plugins: [createLogger()],
})

export default store

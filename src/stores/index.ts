import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { default as finance, FinancialState } from './modules/finance'

interface RootStore {
    finance: FinancialState
}

const isDev = process.env.NODE_ENV === 'development'

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    strict: isDev,
    modules: {
        finance,
    },
    plugins: [createLogger()],
})

export default store

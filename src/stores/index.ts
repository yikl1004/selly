import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import Finance, { FinancialState } from './modules/finance'

interface RootStore {
    finance: FinancialState
}

const isDev = process.env.NODE_ENV === 'development'

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    strict: isDev,
    modules: {
        finance: Finance,
    },
    plugins: [createLogger()],
})

export default store

import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { default as finance } from './modules/finance'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    modules: {
        finance,
    },
    plugins: [createLogger()],
})

if (process.env.NODE_ENV === 'development') {
    window.store = store
}

export default store

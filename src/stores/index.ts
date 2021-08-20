import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    plugins: [createLogger()],
})

if (process.env.NODE_ENV === 'development') {
    window.store = store
}

export default store

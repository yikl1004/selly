import Vue from 'vue'
import Vuex from 'vuex'

import { Financial } from './modules/financial'
import { Card } from './modules/card'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        card: Card,
        financial: Financial,
    },
})

export default store

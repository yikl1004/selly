import Vue from 'vue'
import Vuex from 'vuex'

import Finance from './modules/financial'
import { Card } from './modules/card'

interface RootStore {}

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    modules: {
        card: Card,
        finance: Finance,
    },
})

export default store

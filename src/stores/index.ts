import Vue from 'vue'
import Vuex from 'vuex'

import { Financial } from './modules/financial'
import { Card } from './modules/card'

interface RootStore {}

Vue.use(Vuex)

const store = new Vuex.Store<RootStore>({
    modules: {
        card: Card,
        financial: Financial,
    },
})

export default store

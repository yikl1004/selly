import Vue from 'vue'
import Vuex from 'vuex'

import { Card } from './modules/card'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        card: Card,
    },
})

export default store

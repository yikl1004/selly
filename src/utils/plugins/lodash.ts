import Vue from 'vue'
import VueLodash from 'vue-lodash'
import toNumber from 'lodash/toNumber'

export default function registerVueLodash() {
    Vue.use(VueLodash, {
        lodash: {
            toNumber,
        },
    })
}

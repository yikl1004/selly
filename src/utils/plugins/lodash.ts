import Vue from 'vue'
import VueLodash from 'vue-lodash'
import toNumber from 'lodash/toNumber'
import cloneDeep from 'lodash/cloneDeep'

export default function registerVueLodash() {
    Vue.use(VueLodash, {
        lodash: {
            toNumber,
            cloneDeep,
        },
    })
}

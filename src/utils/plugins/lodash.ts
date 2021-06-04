import Vue from 'vue'
import VueLodash from 'vue-lodash'

// lodash methods...
import toNumber from 'lodash/toNumber'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import isUndefined from 'lodash/isUndefined'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'

export const options = {
    lodash: {
        toNumber,
        cloneDeep,
        merge,
        uniq,
        isUndefined,
        camelCase,
        kebabCase,
    },
}
export default VueLodash

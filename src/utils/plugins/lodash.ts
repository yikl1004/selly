import VueLodash from 'vue-lodash'

// lodash methods...
import toNumber from 'lodash/toNumber'
import isNull from 'lodash/isNull'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import isUndefined from 'lodash/isUndefined'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import pickBy from 'lodash/pickBy'
import toArray from 'lodash/toArray'
import forIn from 'lodash/forIn'
import union from 'lodash/union'
import omit from 'lodash/omit'
import isNumber from 'lodash/isNumber'

export const options = {
    lodash: {
        isNumber,
        toNumber,
        cloneDeep,
        merge,
        uniq,
        isUndefined,
        camelCase,
        kebabCase,
        pickBy,
        isNull,
        toArray,
        forIn,
        union,
        omit,
    },
}
export default VueLodash

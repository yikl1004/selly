import Vue, { VueConstructor } from 'vue'
import _ from 'lodash'

// 아래는 임시로... 디자인이 아직 안나옴 ㅠㅠ (2021-05-03)
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// components
import componentList from '@components/common'

const registerCommonComponent = (): void => {
    componentList.forEach(componentInfo => {
        // 배열 원소가 1개 뿐이므로 index는 0
        const params = Object.entries(componentInfo)[0]
        Vue.component(...params)

        library.add(fas, far)
        Vue.component('FWIcon', FontAwesomeIcon)
    })
    console.log('common components registered...')
}

export default registerCommonComponent

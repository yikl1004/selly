import Vue, { VueConstructor } from 'vue'
import _ from 'lodash'

// components
import componentList from '@components/common'

const registerCommonComponent = (): void => {
    componentList.forEach(componentInfo => {
        // 배열 원소가 1개 뿐이므로 index는 0
        const params = Object.entries(componentInfo)[0]
        console.log('regist component', ...params)
        Vue.component(...params)
    })
    console.log('common components registered...')
}

export default registerCommonComponent

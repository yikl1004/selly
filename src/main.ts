import { Vue, Component } from 'vue-property-decorator'
import store from '@stores/index'
import { initialize } from '@utils/index'
import router from '@router/index'
import App from './App.vue'

import 'animate.css/animate.css'
import '@styles/variables.scss'
import '@styles/index.scss'

Vue.config.productionTip = false
Component.registerHooks(['beforeRouteEnter'])
console.log(process.env)

const a: GnbItem = { name: 'aa', path: 'aaa' }
console.log(a)

/**
 * @description 공통컴포넌트 등록, 전역 플러그인 등록
 */
initialize()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

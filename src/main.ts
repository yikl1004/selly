import Vue from 'vue'
import store from '@stores/index'
import { initialize } from '@utils/index'
import App from './App.vue'
import router from './router'

import 'animate.css/animate.css'
import '@styles/variables.scss'
import '@styles/index.scss'

Vue.config.productionTip = false

console.log(process.env)

/**
 * @title 공통컴포넌트 등록, 전역 플러그인 등록
 */
initialize()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

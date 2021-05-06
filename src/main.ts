import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import { initialize } from '@/utils/index'

import 'animate.css/animate.css'
import '@styles/variables.scss'
import '@styles/index.scss'

Vue.config.productionTip = false

/**
 * @title 공통컴포넌트 등록, 전역 플러그인 등록
 */
initialize()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

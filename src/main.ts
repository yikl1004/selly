import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import { initialize } from '@/utils/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
Vue.component('FAIcon', FontAwesomeIcon)

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

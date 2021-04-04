import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import { registerCommonComponent, registerPlugins } from '@/utils/index'

Vue.config.productionTip = false

/**
 * @title 공통컴포넌트 등록
 */
registerCommonComponent()
/**
 * @title 전역 플러그인 등록
 */
registerPlugins()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import PortalVue from 'portal-vue'
import Lodash, { options as LodashOptions } from '@utils/plugins/lodash'
import Dayjs from '@utils/plugins/dayjs'
import ClickOutside from 'vue-click-outside'
import vLogger from '@utils/plugins/logger'
import Modal from '@utils/plugins/modal'
import Edk from '@utils/plugins/Edk'
import KakaoSdkPlugin from '@utils/plugins/kakao-sdk'
import ScrollLock from '@utils/plugins/scroll-lock'

// [개발용]
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

// datepicker - https://vcalendar.io/
// const VCalendar = require('v-calendar')

const registerPlugins = (): void => {
    // DOM dynamic append
    Vue.use(PortalVue)

    // lodash in Vue
    Vue.use(Lodash, LodashOptions)

    // instead of "moment"
    Vue.use(Dayjs)

    // DEV: Toast message Template
    Vue.use(VueToast, { position: 'bottom', duration: 0 })

    // sense outside click
    Vue.directive('click-outside', ClickOutside)

    // logger
    Vue.use(vLogger, {
        dev: process.env.NODE_ENV !== 'production',
    })

    // global modal (alert)
    Vue.use(Modal)

    // Biznav 연동
    Vue.use(Edk, {
        stage: 'prod',
        clientId: 'selly',
        debug: true,
    })

    // 카카오 sdk 연동
    Vue.use(KakaoSdkPlugin)

    // 스크롤 차단
    Vue.use(ScrollLock)
}

export default registerPlugins

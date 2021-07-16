import Vue from 'vue'
import PortalVue from 'portal-vue'
import Lodash, { options as LodashOptions } from '@utils/plugins/lodash'
import Dayjs from '@utils/plugins/dayjs'
import ClickOutside from 'vue-click-outside'
import vLogger from '@utils/plugins/logger'

// [개발용]
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

// datepicker - https://vcalendar.io/
const VCalendar = require('v-calendar')
const DatePicker = require('v-calendar/lib/components/date-picker.umd')

const registerPlugins = (): void => {
    // DOM dynamic append
    Vue.use(PortalVue)

    // lodash in Vue
    Vue.use(Lodash, LodashOptions)

    // instead of "moment"
    Vue.use(Dayjs)

    // calendar
    Vue.use(VCalendar, { componentPrefix: 'vc' })
    Vue.component('date-picker', DatePicker)

    // DEV: Toast message Template
    Vue.use(VueToast, { position: 'bottom', duration: 0 })

    // sense outside click
    Vue.directive('click-outside', ClickOutside)

    // logger
    Vue.use(vLogger, {
        dev: process.env.NODE_ENV !== 'production',
    })
}

export default registerPlugins

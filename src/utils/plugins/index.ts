import Vue from 'vue'
import PortalVue from 'portal-vue'
import Lodash, { options as LodashOptions } from '@utils/plugins/lodash'
import Dayjs from '@utils/plugins/dayjs'
import ClickOutside from 'vue-click-outside'

// [개발용]
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

// datepicker - https://vcalendar.io/
const VCalendar = require('v-calendar')
const DatePicker = require('v-calendar/lib/components/date-picker.umd')

const registerPlugins = (): void => {
    Vue.use(PortalVue)
    Vue.use(Lodash, LodashOptions)
    Vue.use(Dayjs)
    Vue.use(VCalendar, { componentPrefix: 'vc' })
    // Vue.component('calendar', Calendar)
    Vue.use(VueToast, { position: 'bottom', duration: 0 })
    Vue.component('date-picker', DatePicker)
    Vue.directive('click-outside', ClickOutside)
}

export default registerPlugins

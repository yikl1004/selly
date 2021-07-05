import Vue from 'vue'
import PortalVue from 'portal-vue'
import ImageUploader from 'vue-image-upload-resize'
import Lodash, { options as LodashOptions } from '@utils/plugins/lodash'
import Dayjs from '@utils/plugins/dayjs'
import ClickOutside from 'vue-click-outside'

// TODO: 삭제 해야됨
import chalk from 'chalk'
import VueToast from 'vue-toast-notification'

// datepicker - https://vcalendar.io/
const VCalendar = require('v-calendar')
const DatePicker = require('v-calendar/lib/components/date-picker.umd')

const registerPlugins = (): void => {
    Vue.use(ImageUploader)
    Vue.use(PortalVue)
    Vue.use(Lodash, LodashOptions)
    Vue.use(Dayjs)
    Vue.use(VCalendar, { componentPrefix: 'vc' })
    // Vue.component('calendar', Calendar)
    Vue.use(VueToast, { position: 'bottom' })
    Vue.component('date-picker', DatePicker)
    Vue.directive('click-outside', ClickOutside)

    chalk(
        {
            'font-size': '16px',
            'background-color': 'skyblue',
            color: 'white',
            padding: '3px 10px',
            'border-radius': '10px',
        },
        'vue plugins registered...',
    )
}

export default registerPlugins

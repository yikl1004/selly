import Vue from 'vue'
import PortalVue from 'portal-vue'
import registerVueLodash from '@utils/plugins/lodash'
import ImageUploader from 'vue-image-upload-resize'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// TODO: 삭제 해야됨
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// datepicker - https://vcalendar.io/
const VCalendar = require('v-calendar')
const DatePicker = require('v-calendar/lib/components/date-picker.umd')

const registerPlugins = (): void => {
    Vue.use(Antd)
    Vue.use(ImageUploader)
    Vue.use(PortalVue)

    // Use v-calendar & v-date-picker components
    Vue.use(VCalendar, {
        componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
    })
    // Vue.component('calendar', Calendar)
    Vue.component('date-picker', DatePicker)

    registerVueLodash()

    dayjs.extend(duration)

    // chalk(
    //     {
    //         'font-size': '16px',
    //         'background-color': 'skyblue',
    //         color: 'white',
    //         padding: '3px 10px',
    //         'border-radius': '10px',
    //     },
    //     'vue plugins registered...',
    // )
}

export const moment = dayjs

export default registerPlugins

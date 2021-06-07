import Vue from 'vue'
import PortalVue from 'portal-vue'
import ImageUploader from 'vue-image-upload-resize'
import Lodash, { options as LodashOptions } from '@utils/plugins/lodash'
import Dayjs from '@utils/plugins/dayjs'
import ClickOutside from 'vue-click-outside'

// TODO: 삭제 해야됨
import chalk from 'chalk'

// datepicker - https://vcalendar.io/
const VCalendar = require('v-calendar')
const DatePicker = require('v-calendar/lib/components/date-picker.umd')

const registerPlugins = (): void => {
    Vue.use(ImageUploader)
    Vue.use(PortalVue)
    Vue.use(Lodash, LodashOptions)
    Vue.use(Dayjs)

    // Use v-calendar & v-date-picker components
    Vue.use(VCalendar, {
        componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
        masks: {
            title: 'YYYY년 M',
        },
    })
    // Vue.component('calendar', Calendar)
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

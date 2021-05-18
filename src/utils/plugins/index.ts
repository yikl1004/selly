import Vue from 'vue'
import PortalVue from 'portal-vue'
import registerVueLodash from '@utils/plugins/lodash'
import ImageUploader from 'vue-image-upload-resize'

// TODO: 삭제 해야됨
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// const ImageUploader = require('vue-image-upload-resize')

const registerPlugins = (): void => {
    Vue.use(Antd)
    Vue.use(ImageUploader)
    Vue.use(PortalVue)
    registerVueLodash()

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

export default registerPlugins

import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
import PortalVue from 'portal-vue'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import registerVueLodash from '@utils/plugins/lodash'

const registerPlugins = (): void => {
    // Vue.use(Antd)
    Vue.use(ImageUploader)
    Vue.use(PortalVue)
    registerVueLodash()
    console.log('vue plugins registered...')
}

export default registerPlugins

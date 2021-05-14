import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
import PortalVue from 'portal-vue'
import registerVueLodash from '@utils/plugins/lodash'

// TODO: 삭제 해야됨
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const registerPlugins = (): void => {
    Vue.use(Antd)
    Vue.use(ImageUploader)
    Vue.use(PortalVue)
    registerVueLodash()
    console.log('vue plugins registered...')
}

export default registerPlugins

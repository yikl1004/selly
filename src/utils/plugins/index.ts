import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import registerVueLodash from '@utils/plugins/lodash'

const registerPlugins = (): void => {
    Vue.use(ImageUploader)
    Vue.use(Antd)
    registerVueLodash()
    console.log('vue plugins registered...')
}

export default registerPlugins

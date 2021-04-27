import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

const registerPlugins = (): void => {
    Vue.use(ImageUploader)
    Vue.use(Antd)
    Vue.use(VueLodash, { lodash })
    console.log('vue plugins registered...')
}

export default registerPlugins

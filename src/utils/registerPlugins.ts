import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const registerPlugins = (): void => {
    Vue.use(ImageUploader)
    Vue.use(Antd)

    console.log('vue plugins registered...')
}

export default registerPlugins

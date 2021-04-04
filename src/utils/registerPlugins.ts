import Vue from 'vue'
import Fragment from 'vue-fragment'
import ImageUploader from 'vue-image-upload-resize'

const registerPlugins = (): void => {
    Vue.use(Fragment.Plugin)
    Vue.use(ImageUploader)
    console.log('vue plugins registered...')
}

export default registerPlugins

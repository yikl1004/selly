import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'

const registerPlugins = (): void => {
    Vue.use(ImageUploader)

    console.log('vue plugins registered...')
}

export default registerPlugins

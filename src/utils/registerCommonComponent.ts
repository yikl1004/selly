import Vue from 'vue'

// components
import SellyLink from '@components/common/SellyLink.vue'
import FileUploader from '@components/common/FileUploader.vue'

const registerCommonComponent = (): void => {
    Vue.component('selly-link', SellyLink)
    Vue.component('file-uploader', FileUploader)

    console.log('common components registered...')
}

export default registerCommonComponent

import { Vue } from 'vue-property-decorator'
import type { PluginObject } from 'vue'

const ModalBus = new Vue()

declare module 'vue/types/vue' {
    interface Vue {
        $modal: {
            open(option: ModalOptions): void
            bus: Vue
        }
    }
}

export interface ModalOptions {
    message: string
    buttonText: {
        confirm: string
        cancel?: string
    }
    confirm: Function
}

const Modal: PluginObject<{}> = {
    install(_Vue /* options */) {
        _Vue.prototype.$modal = {
            open(option: ModalOptions) {
                ModalBus.$emit('open', option)
            },
            bus: ModalBus,
        }
    },
}

export default Modal

import { Vue } from 'vue-property-decorator'
import type { PluginFunction, PluginObject } from 'vue'

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
    buttonText?: {
        confirm: string
        cancel?: string
    }
    confirm?: Function
    cancel?: Function
}

export const ModalBus = new Vue()
const install: PluginFunction<{}> = _Vue => {
    Object.defineProperties(_Vue.prototype, {
        $modal: {
            value: {
                open(option: ModalOptions | string) {
                    ModalBus.$emit('open', option)
                },
                bus: ModalBus,
            },
        },
    })
}

const Modal: PluginObject<{}> = { install }

export default Modal

import Vue, { PluginObject } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

/**
 * @description 플러그인 타입 추가
 */
declare module 'vue/types/vue' {
    interface Vue {
        $dayjs: typeof dayjs
    }
}

interface DayjsPluginOptions {}

const Dyajs: PluginObject<DayjsPluginOptions> = {
    install(VueApp, options) {
        // 추가 하고 싶은 기능을 개별적으로 import 해서 extend메서드로 확장해서 사용
        dayjs.extend(duration)
        VueApp.prototype.$dayjs = dayjs
    },
}

export default Dyajs

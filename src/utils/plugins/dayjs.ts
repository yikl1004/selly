import Vue, { PluginObject } from 'vue'

interface PluginOptions {}

// declare module 'vue/types/vue' {
//     // 3. Vue에 보강할 내용을 선언하세요.
//     interface Vue {
//         dayjs: dayjs
//     }
// }

// const dayjsPlugin: PluginObject<PluginOptions> = {
//     install(Vue, options) {
//         dayjs.extend(duration)
//         Vue.prototype.dayjs = dayjs
//     },
// }

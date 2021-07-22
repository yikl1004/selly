declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

// declare module 'vue/types/vue' {
//     // interface RouteMeta {
//     //     foo?: number
//     // }
//     import { Route } from 'vue-router'

//     interface Vue {
//         $route: Route
//     }
// }

declare module 'vue-click-outside' {
    const directive: DirectiveOptions
    export default directive
}

// declare module 'vue-image-upload-resize' {
//     interface Options {
//         // 참고: https://www.npmjs.com/package/vue-image-upload-resize
//     }

//     const plugin: VueConstructor & PluginObject<Options>
//     export default plugin
// }

declare module 'v-calendar' {
    import type { Component } from 'vue'
    const DatePicker: Component
}

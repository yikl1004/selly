declare module '*.vue' {
    import Vue, { VueConstructor, PluginObject } from 'vue'
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

declare module 'vue-image-upload-resize' {
    const plugin: VueConstructor & PluginObject
    export default plugin
}

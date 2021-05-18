declare module '*.vue' {
    import Vue, { VueConstructor, PluginObject, DirectiveOptions } from 'vue'
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
    const plugin: VueConstructor & PluginObject<any>
    export default plugin
}

declare module 'vue-click-outside' {
    const directive: DirectiveOptions
    export default directive
}

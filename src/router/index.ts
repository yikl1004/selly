import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import VueRouter from 'vue-router'
import routes from '@router/routes'
import navigationGuard from '@router/navigationGuard'

Vue.use(VueRouter)
Component.registerHooks(['beforeRouteEnter'])

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(/* to, from, savedPosition */) {
        return { x: 0, y: 0 }
    },
})

router.beforeEach(navigationGuard.beforeEach)

export default router

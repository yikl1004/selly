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
})

router.beforeEach(navigationGuard.beforeEach)

export default router

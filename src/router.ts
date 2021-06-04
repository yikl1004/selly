import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import isNull from 'lodash/isNull'
import store from '@stores/index'

import LoginPage from '@pages/index.vue'
import NeedLoginPage from '@pages/NeedLogin/index.vue'
import MainPage from '@pages/main/index.vue'

Vue.use(VueRouter)

type Meta = {
    layout?: 'default' | 'none' | string
}

const routes: Array<RouteConfig & { meta: Meta }> = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage,
        meta: {
            layout: 'default',
        },
    },
    {
        path: '/needLogin',
        name: 'NeedLogin',
        component: NeedLoginPage,
        meta: {
            layout: 'none',
        },
    },
    {
        path: '/main',
        name: 'Main',
        component: MainPage,
        meta: {
            layout: 'default',
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach(async (to, from, next) => {
    await store.dispatch('auth/loginCheck')

    const isLogin = store.state.auth.isLogin
    const exceptionPages = ['Login', 'NeedLogin']
    console.log({ to, from })
    if (isLogin) {
        if (exceptionPages.some(page => page === to.name)) {
            next({ name: isNull(from.name) ? 'Main' : (from.name as string) })
        } else {
            next()
        }
    } else if (exceptionPages.some(page => page === to.name)) {
        next()
    } else {
        next({ name: 'NeedLogin' })
    }
})

const namespace: { [key: string]: string } = {}
routes.forEach(route => {
    if (route.name) {
        namespace[route.name] = route.name
    }
})
export const PAGE_NAMES = namespace

export default router

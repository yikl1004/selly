import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import isNull from 'lodash/isNull'
import store from '@stores/index'

import LoginPage from '@pages/index.vue'
import NeedLoginPage from '@pages/NeedLogin/index.vue'
import MainPage from '@pages/main/index.vue'

// examples
import ExampleMain from '@pages/example/index.vue'
import ExampleForm from '@pages/example/form/index.vue'

Vue.use(VueRouter)

export type RouteMeta = {
    layout?: 'default' | 'none' | string
}

const routes: Array<RouteConfig & { meta?: RouteMeta }> = [
    // 여기는 예제 작성
    {
        path: '/example',
        name: 'Example',
        component: ExampleMain,
        children: [
            {
                path: 'form',
                name: 'ExampleForm',
                component: ExampleForm,
            },
        ],
        meta: {
            layout: 'none',
        },
    },

    // 여기부터 페이지 작성
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

/**
 * navigatoin guard
 */
router.beforeEach(async (to, from, next) => {
    if (process.env.VUE_APP_SKIP_LOGIN === 'true') {
        next()
        return
    } else {
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

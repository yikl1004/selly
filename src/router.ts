import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import isNull from 'lodash/isNull'
import store from '@stores/index'

import LoginPage from '@pages/index.vue'
import NeedLoginPage from '@pages/NeedLogin/index.vue'
import MainPage from '@pages/main/index.vue'
import SelectStorePage from '@pages/auth/SelectStore.vue'
import CompleteJoinPage from '@pages/auth/CompleteJoin.vue'
import UnableJoinPage from '@pages/auth/UnableJoin.vue'

import CardPage from '@pages/card/index.vue'
import CardSubPage from '@pages/card/subPage.vue'

// examples
import ExampleMain from '@pages/example/index.vue'
import ExampleForm from '@pages/example/form/index.vue'
import ExampleTestbed from '@pages/example/testbed/index.vue'

Vue.use(VueRouter)

export type RouteMeta = {
    layout?: 'default' | 'none' | 'floating' | string
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
            {
                path: 'test',
                name: 'Test',
                component: ExampleTestbed,
            },
        ],
        meta: {
            layout: 'none',
        },
    },

    // 여기부터 페이지 작성

    // 로그인, 회원가입 페이지
    {
        path: '/',
        name: 'Login',
        component: LoginPage,
        meta: {
            layout: 'none',
        },
    },

    // 사업자번호 선택 (단일 / 복수)
    {
        path: '/auth/selectStore',
        name: 'SelectStore',
        component: SelectStorePage,
        meta: {
            layout: 'default',
            auth: true,
        },
    },

    // 가입완료
    {
        path: '/auth/completeJoin',
        name: 'CompleteJoin',
        component: CompleteJoinPage,
        meta: {
            layout: 'default',
            auth: true,
        },
    },

    // 가입불가
    {
        path: '/auth/unableJoin',
        name: 'UnableJoin',
        component: UnableJoinPage,
        meta: {
            layout: 'default',
            auth: true,
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
    {
        path: '/card',
        name: 'Card',
        component: CardPage,
        meta: {
            layout: 'none',
        },
    },
    {
        path: '/card/subpage',
        name: 'CardSub',
        component: CardSubPage,
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

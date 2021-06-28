import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import isNull from 'lodash/isNull'
import store from '@stores/index'

import NotFoundPage from '@pages/notFound/index.vue'
import LoginPage from '@pages/index.vue'
// import NeedLoginPage from '@pages/needLogin/index.vue'
// import MainPage from '@pages/main/index.vue'
import JoinPage from '@pages/join/index.vue'

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
    foolter?: boolean
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

    /* 404: not found */
    {
        path: '*',
        name: 'NotFound',
        component: NotFoundPage,
    },

    /* 로그인 or 메인 */
    {
        path: '/',
        name: 'Login',
        component: LoginPage,
        meta: {
            layout: 'none',
        },
    },

    {
        path: '/join',
        name: 'Join',
        component: JoinPage,
        meta: {
            footer: false,
        },
    },

    /* 사업자번호 선택 (단일 / 복수) */
    {
        path: '/auth/selectStore',
        name: 'SelectStore',
        component: SelectStorePage,
        meta: {
            layout: 'default',
            auth: true,
        },
    },

    /* 가입완료 */
    {
        path: '/auth/completeJoin',
        name: 'CompleteJoin',
        component: CompleteJoinPage,
        meta: {
            layout: 'default',
            auth: true,
        },
    },

    /* 가입불가 */
    {
        path: '/auth/unableJoin',
        name: 'UnableJoin',
        component: UnableJoinPage,
        meta: {
            layout: 'default',
            auth: true,
        },
    },

    /**
     * "로그인이 필요합니다" 페이지
     * NOTICE: 2021-06-28 기획과 협의 후 이 페이지는 사용하지 않는 것으로 정리
     * 404페이지로 401,403,404 등 400번대 에러를 하나로 처리
     */
    // {
    //     path: '/needLogin',
    //     name: 'NeedLogin',
    //     component: NeedLoginPage,
    //     meta: {
    //         layout: 'none',
    //     },
    // },

    // 작성 중인 페이지
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
const exceptionPages = ['Login', 'NeedLogin', 'NotFound', 'Join']
router.beforeEach(async (to, from, next) => {
    await store.dispatch('auth/loginCheck')
    const isLogin = store.state.auth.isLogin
    if (isLogin) {
        if (exceptionPages.some(page => page === to.name)) {
            next({ name: isNull(from.name) ? 'Main' : (from.name as string) })
        } else {
            next()
        }
    } else if (exceptionPages.some(page => page === to.name)) {
        next()
    } else {
        next({ name: 'NotFound' })
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

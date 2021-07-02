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

//매출
import SalesPage from '@pages/sales/index.vue'
import SalesHistory from '@pages/sales/SalesHistory.vue'

// 금융
import FinancePage from '@pages/finance/index.vue'
import CreditCardAuth from '@pages/finance/CreditCardAuth.vue'

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
        // beforeEnter(to, from, next) {
        //     console.log('router beforeEnter', { to, from })
        //     next()
        // },
    },

    {
        path: '/join',
        name: 'Join',
        component: JoinPage,
        meta: {
            footer: false,
            layout: 'none',
        },
    },

    /* 사업자번호 선택 (단일 / 복수) */
    // {
    //     path: '/auth/selectStore',
    //     name: 'SelectStore',
    //     component: SelectStorePage,
    //     meta: {
    //         layout: 'default',
    //         auth: true,
    //     },
    // },

    // /* 가입완료 */
    // {
    //     path: '/auth/completeJoin',
    //     name: 'CompleteJoin',
    //     component: CompleteJoinPage,
    //     meta: {
    //         layout: 'default',
    //         auth: true,
    //     },
    // },

    // /* 가입불가 */
    // {
    //     path: '/auth/unableJoin',
    //     name: 'UnableJoin',
    //     component: UnableJoinPage,
    //     meta: {
    //         layout: 'default',
    //         auth: true,
    //     },
    // },

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

    //매출페이지
    //매출내역 메인
    {
        path: '/sales',
        name: 'Sales',
        component: SalesPage,
    },
    {
        path: '/sales/saleshistory',
        name: 'Sales History',
        component: SalesHistory,
    },
    // 금융페이지
    // 금융메인 / 금융 안내페이지
    {
        path: '/finance',
        name: 'Finance',
        component: FinancePage,
    },
    {
        path: '/finance/creditcardauth',
        name: 'CreditCardAuth',
        component: CreditCardAuth,

        meta: {
            layout: 'default',
            footer: false,
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
router.beforeEach((to, from, next) => {
    /**
     * @description
     * 1. 모든 API에서 로그인 체크를 기본적으로 함.
     * 2. 각 페이지에서 필요한 API를 호출 할 떄 결과 값에 따른 페이지 처리가 필요
     * 3. beforeEach 메서드는 router의 전역 가드 이므로 여기서 공통으로 처리하기보다 각 페이지 router에서 처리하는 것이 낮다고 판단됨
     *      3-1. 개별 router의 beforeEnter 가드 (params: to, from, next)
     *      3-2. 컴포넌트 내부의 beforeRouteEnter 가드 (params: to, from, next())
     *      3-3. 위 2가지 방법중 한가지를 택해서 사용하는 것이 나을것 같음...(뇌피셜 by CMK)
     */
    next()
})

const namespace: { [key: string]: string } = {}
routes.forEach(route => {
    if (route.name) {
        namespace[route.name] = route.name
    }
})
export const PAGE_NAMES = namespace

export default router

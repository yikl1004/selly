import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Main from '@pages/index.vue'
import Example from '@pages/example/index.vue'
import Sales from '@pages/sales/index.vue'

Vue.use(VueRouter)

type LayoutMeta = {
    layout?: 'default' | 'none'
}

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            layout: 'default',
        } as LayoutMeta,
    },
    {
        path: '/example',
        name: 'Example',
        component: Example,
        meta: {
            layout: 'none',
        },
    },
    {
        path: '/sales',
        name: 'Sales',
        component: Sales,
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

export default router

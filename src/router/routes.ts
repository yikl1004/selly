import { RouteConfig } from 'vue-router'

import NotFoundPage from '@pages/notFound/index.vue'
import MainPage from '@pages/index.vue'
// import NeedLoginPage from '@pages/needLogin/index.vue'
import JoinPage from '@pages/join/index.vue'
// import SelectStorePage from '@pages/auth/SelectStore.vue'
// import CompleteJoinPage from '@pages/auth/CompleteJoin.vue'
// import UnableJoinPage from '@pages/auth/UnableJoin.vue'

import CardPage from '@pages/card/index.vue'
import CardSubPage from '@pages/card/subPage.vue'

//매출
import SalesPage from '@pages/sales/index.vue'
import SalesLinkage from '@pages/sales/SalesLinkage.vue'
import SalesHistory from '@pages/sales/SalesHistory.vue'

// 금융
import FinancePage from '@pages/finance/index.vue'
import CreditCardAuth from '@pages/finance/CreditCardAuth.vue'
import SelfAuth from '@pages/finance/SelfAuth.vue'
import LoanApply from '@pages/finance/LoanApply.vue'
import LoanReject from '@pages/finance/LoanReject.vue'
import LoanHistory from '@pages/finance/LoanHistory.vue'
import LoanHistoryDetail from '@pages/finance/LoanHistoryDetail.vue'

//설정
import NoticePage from '@pages/cs/NoticePage.vue'
import NoticeDetailPage from '@pages/cs/NoticeDetailPage.vue'
import FaqPage from '@pages/cs/FaqPage.vue'

// examples
import ExampleMain from '@pages/example/index.vue'
import ExampleForm from '@pages/example/form/index.vue'
import ExampleTestbed from '@pages/example/testbed/index.vue'

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
        name: 'Main',
        component: MainPage,
        meta: {
            layout: 'default',
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
    // TODO: 입금, 매출 내역 2개의 페이지로 나눠야함
    // 매출: salesHistory, 입금: depositHistory
    // 매출, 입금 에서 가가가 일간, 주간, 요일별 (총 6벌, 3벌씩 탭이 있는 페이지 2개)
    {
        path: '/sales',
        name: 'Sales',
        component: SalesPage,
        meta: {
            title: '매출 내역',
        },
        children: [
            {
                // TODO: 매출내역 연동 페이지... 기획 수정 중
                path: 'linkage',
                name: 'Sales Linkage',
                component: SalesLinkage,
                meta: {
                    title: '매출 내역',
                },
            },
        ],
    },
    // ing: 매출 만드는 중...
    {
        path: '/saleshistory',
        name: 'Sales History',
        component: SalesHistory,
        meta: {
            title: '매출 내역',
        },
    },

    // 금융페이지
    // 금융메인 / 금융 안내페이지
    {
        path: '/finance',
        name: 'Finance',
        component: FinancePage,
        children: [
            {
                //신용카드 인증페이지
                path: 'creditcardauth',
                name: 'CreditCardAuth',
                component: CreditCardAuth,
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //본인인증 페이지
                path: 'selfauth',
                name: 'Self Auth',
                component: SelfAuth,
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //금소법 적합성 확인페이지
                path: 'loanapply',
                name: 'Loan Apply',
                component: LoanApply,
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //이용 거절 페이지
                path: 'loanreject',
                name: 'Loan Reject',
                component: LoanReject,
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //대출내역
                path: 'loanhistory',
                name: 'Loan History',
                component: LoanHistory,

                meta: {
                    layout: 'default',
                },
            },
            {
                //대출내역상세
                path: 'loandetail',
                name: 'Loan History Detail',
                component: LoanHistoryDetail,

                meta: {
                    layout: 'default',
                },
            },
        ],
    },

    //설정
    //공지사항
    {
        path: '/cs/notice',
        name: 'Notice',
        component: NoticePage,
        meta: {
            layout: 'default',
        },
    },
    {
        path: '/cs/noticedetail',
        name: 'Notice Detail',
        component: NoticeDetailPage,
        meta: {
            layout: 'default',
        },
    },
    {
        path: '/cs/faq',
        name: 'FAQ',
        component: FaqPage,
        meta: {
            layout: 'default',
        },
    },
]

export default routes

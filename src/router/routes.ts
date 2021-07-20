import { RouteConfig } from 'vue-router'

export type RouteMeta = {
    layout?: 'default' | 'none' | 'floating' | string
    foolter?: boolean
}

const createAsyncComponent = (path: string) => {
    const loading = {
        template: `<Loading />`,
    }

    return () => ({
        component: import(path),
        loading,
    })
}

const routes: Array<RouteConfig & { meta?: RouteMeta }> = [
    // 여기는 예제 작성
    {
        path: '/example',
        name: 'Example',
        component: createAsyncComponent('@pages/example/index.vue'),
        children: [
            {
                path: 'form',
                name: 'ExampleForm',
                component: createAsyncComponent('@pages/example/form/index.vue'),
            },
            {
                path: 'test',
                name: 'Test',
                component: createAsyncComponent('@pages/example/testbed/index.vue'),
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
        component: createAsyncComponent('@pages/notFound/index.vue'),
    },

    /* 로그인 or 메인 */
    {
        path: '/',
        name: 'Main',
        component: createAsyncComponent('@pages/index.vue'),
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
        component: createAsyncComponent('@pages/join/index.vue'),
        /**
         * @pages/auth/SelectStore.vue - 가맹점 선택(단일 사업자인 경우 선택되어서 나옴)
         * @pages/auth/UnableJoin.vue - 가입 불가 처리
         */
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
    //     component: createAsyncComponent(@pages/needLogin/index.vue),
    //     meta: {
    //         layout: 'none',
    //     },
    // },

    // 작성 중인 페이지
    {
        path: '/card',
        name: 'Card',
        component: createAsyncComponent('@pages/card/index.vue'),
        meta: {
            layout: 'none',
        },
    },
    {
        path: '/card/subpage',
        name: 'CardSub',
        component: createAsyncComponent('@pages/card/subPage.vue'),
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
        component: createAsyncComponent('@pages/sales/index.vue'),
        meta: {
            title: '매출 내역',
        },
        children: [
            {
                // TODO: 매출내역 연동 페이지... 기획 수정 중
                path: 'linkage',
                name: 'Sales Linkage',
                component: createAsyncComponent('@pages/sales/SalesLinkage.vue'),
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
        component: createAsyncComponent('@pages/sales/SalesHistory.vue'),
        meta: {
            title: '매출 내역',
        },
    },

    // 금융페이지
    // 금융메인 / 금융 안내페이지
    {
        path: '/finance',
        name: 'Finance',
        component: createAsyncComponent('@pages/finance/index.vue'),
        children: [
            {
                //신용카드 인증페이지
                path: 'creditcardauth',
                name: 'CreditCardAuth',
                component: createAsyncComponent('@pages/finance/CreditCardAuth.vue'),
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //본인인증 페이지
                path: 'selfauth',
                name: 'Self Auth',
                component: createAsyncComponent('@pages/finance/SelfAuth.vue'),
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //금소법 적합성 확인페이지
                path: 'loanapply',
                name: 'Loan Apply',
                component: createAsyncComponent('@pages/finance/LoanApply.vue'),
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //이용 거절 페이지
                path: 'loanreject',
                name: 'Loan Reject',
                component: createAsyncComponent('@pages/finance/LoanReject.vue'),
                meta: {
                    layout: 'default',
                    footer: false,
                },
            },
            {
                //대출내역
                path: 'loanhistory',
                name: 'Loan History',
                component: createAsyncComponent('@pages/finance/LoanHistory.vue'),
                meta: {
                    layout: 'default',
                },
            },
            {
                //대출내역상세
                path: 'loandetail',
                name: 'Loan History Detail',
                component: createAsyncComponent('@pages/finance/LoanHistoryDetail.vue'),
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
        component: createAsyncComponent('@pages/cs/NoticePage.vue'),
        meta: {
            title: '공지사항',
            layout: 'default',
        },
    },
    {
        path: '/cs/noticedetail',
        name: 'Notice Detail',
        component: createAsyncComponent('@pages/cs/NoticeDetailPage.vue'),
        meta: {
            title: '공지사항',
            layout: 'default',
        },
    },
    {
        path: '/cs/faq',
        name: 'FAQ',
        component: createAsyncComponent('@pages/cs/FaqPage.vue'),
        meta: {
            title: '자주 묻는 질문',
            layout: 'default',
        },
    },

    {
        path: '/cs/terms',
        name: 'Terms',
        component: createAsyncComponent('@pages/cs/TermsPage.vue'),
        meta: {
            title: '이용약관',
            layout: 'default',
        },
    },
    {
        path: '/cs/termsdetail',
        name: 'Terms Detail',
        component: createAsyncComponent('@pages/cs/TermsDetailPage.vue'),
        meta: {
            title: '이용약관',
            layout: 'default',
        },
    },
    //마이페이지
    {
        path: '/my/setting',
        name: 'setting',
        component: createAsyncComponent('@pages/mypage/SettingPage.vue'),
        meta: {
            title: '회원정보',
            layout: 'default',
            footer: true,
        },
    },
    {
        path: '/my/secession',
        name: 'Secession',
        component: createAsyncComponent('@pages/mypage/SecessionPage.vue'),
        meta: {
            title: '회원탈퇴',
            layout: 'default',
            footer: false,
        },
    },

    {
        path: '/my/business',
        name: 'Business',
        component: createAsyncComponent('@pages/mypage/BusinessPage.vue'),
        meta: {
            title: '사업자 정보',
            layout: 'default',
        },
    },
]

export default routes

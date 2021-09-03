import type { RouteConfig } from 'vue-router'

/**
 * @description vue route 파일 (페이지 관리)
 * @notice 범례 - 중첩으로 표기 될 수 있습니다.
 *      - @complete 완료
 *      - @working 작업중
 *      - @needFix 수정필요(기획 변경, 디자인 변경 등)
 */

export type RouteMeta = {
    floating?: boolean
}

const loading = {
    template: `<Loading />`,
}

const createAsyncPage = (component: Promise<object>) => {
    return () => ({
        component,
        loading,
    })
}

const routes: Array<RouteConfig & { meta?: RouteMeta }> = [
    // 여기는 예제 작성
    {
        path: '/example',
        name: 'Example',
        component: createAsyncPage(import('@pages/example/index.vue')),
        children: [
            {
                path: 'form',
                name: 'ExampleForm',
                component: createAsyncPage(import('@pages/example/form/index.vue')),
            },
            {
                path: 'test',
                name: 'Test',
                component: createAsyncPage(import('@pages/example/testbed/index.vue')),
            },
            {
                path: 'keypadSample',
                name: 'KeypadSample',
                component: createAsyncPage(import('@pages/example/keypadSample/index.vue')),
            },
            {
                path: 'edkSample',
                name: 'EDKSample',
                component: createAsyncPage(import('@pages/example/EDKSample/index.vue')),
            },
        ],
        meta: {},
    },

    /* 404: not found */
    {
        path: '*',
        name: 'NotFound',
        component: createAsyncPage(import('@pages/notFound/index.vue')),
    },

    // 여기부터 페이지 작성
    {
        path: '/',
        component: createAsyncPage(import('@layout/Layout.vue')),
        children: [
            /** Global Navigation */
            {
                /** @complete */
                path: '/navigation',
                name: 'Navigation',
                component: createAsyncPage(import('@pages/navigation/index.vue')),
            },

            /* 메인 */
            {
                path: '',
                name: 'Main',
                component: createAsyncPage(import('@pages/index.vue')),
                meta: {},
            },

            // 로그인
            {
                /** @complete */
                path: '/login',
                name: 'Login',
                component: createAsyncPage(import('@pages/login/index.vue')),
            },

            // 로그인 콜백
            {
                /** @complete */
                path: '/authCallback',
                name: 'Auth Callback',
                component: createAsyncPage(import('@pages/login/AuthCallback.vue')),
            },

            {
                /** @complete */
                path: '/join',
                name: 'Join',
                component: createAsyncPage(import('@pages/join/index.vue')),
                /**
                 * @pages/auth/SelectStore.vue - 가맹점 선택(단일 사업자인 경우 선택되어서 나옴)
                 * @pages/auth/UnableJoin.vue - 가입 불가 처리
                 */
                meta: {
                    footer: false,
                    floating: true,
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
            //     component: createAsyncPage(import(@pages/needLogin/index.vue)),
            //     meta: {
            //         layout: 'none',
            //     },
            // },

            // 작성 중인 페이지
            {
                path: '/card',
                name: 'Card',
                component: createAsyncPage(import('@pages/card/index.vue')),
                meta: {},
            },
            {
                path: '/card/subpage',
                name: 'CardSub',
                component: createAsyncPage(import('@pages/card/subPage.vue')),
                meta: {},
            },

            // 금융페이지
            // 금융메인 / 금융 안내페이지
            {
                path: '/finance',
                name: 'Finance',
                component: createAsyncPage(import('@pages/finance/index.vue')),
                children: [
                    {
                        //신용카드 인증페이지
                        path: 'creditcardauth',
                        name: 'CreditCardAuth',
                        component: createAsyncPage(import('@pages/finance/CreditCardAuth.vue')),
                        meta: {
                            layout: 'default',
                            footer: false,
                        },
                    },
                    {
                        //본인인증 페이지
                        path: 'selfauth',
                        name: 'Self Auth',
                        component: createAsyncPage(import('@pages/finance/SelfAuth.vue')),
                        meta: {
                            layout: 'default',
                            footer: false,
                        },
                    },
                    {
                        //금소법 적합성 확인페이지
                        path: 'loanapply',
                        name: 'Loan Apply',
                        component: createAsyncPage(import('@pages/finance/LoanApply.vue')),
                        meta: {
                            layout: 'default',
                            footer: false,
                        },
                    },
                    {
                        //이용 거절 페이지
                        path: 'loanreject',
                        name: 'Loan Reject',
                        component: createAsyncPage(import('@pages/finance/LoanReject.vue')),
                        meta: {
                            layout: 'default',
                            footer: false,
                        },
                    },
                    {
                        //대출내역
                        path: 'loanhistory',
                        name: 'Loan History',
                        component: createAsyncPage(import('@pages/finance/LoanHistory.vue')),
                        meta: {
                            layout: 'default',
                        },
                    },
                    {
                        //대출내역상세
                        path: 'loandetail',
                        name: 'Loan History Detail',
                        component: createAsyncPage(import('@pages/finance/LoanHistoryDetail.vue')),
                        meta: {
                            layout: 'default',
                        },
                    },
                ],
            },

            // 쿠폰만들기 - 안내페이지
            {
                /** @working */
                path: '/marketing/couponCreation',
                name: 'Marketing Coupon Creation Guide',
                component: createAsyncPage(import('@pages/marketing/couponCreation/index.vue')),
                meta: {
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step1
            {
                /** @working */
                path: '/marketing/couponCreation/stepFirst',
                name: 'Marketing Coupon Creation Step 1',
                component: createAsyncPage(import('@pages/marketing/couponCreation/StepFirst.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step2
            {
                path: '/marketing/couponCreation/stepSecond',
                name: 'Marketing Coupon Creation Step 2',
                component: createAsyncPage(import('@pages/marketing/apply/ApplyStep2.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step3
            {
                path: '/marketing/couponCreation/stepThird',
                name: 'Marketing Coupon Creation Step 3',
                component: createAsyncPage(import('@pages/marketing/apply/ApplyStep3.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },

            //신청내역
            {
                path: '/marketing/application',
                name: 'CouponHistory',
                component: createAsyncPage(import('@pages/marketing/history/index.vue')),
                meta: {
                    floating: true,
                },
            },
            //신청내역_상세
            {
                path: '/marketing/detail',
                name: 'CouponDetail',
                component: createAsyncPage(import('@pages/marketing/detail/index.vue')),
                meta: {
                    floating: true,
                },
            },
            //내 주변 매출
            {
                path: '/marketing/around',
                name: 'AroundSales',
                component: createAsyncPage(import('@pages/marketing/around/index.vue')),
                meta: {
                    floating: true,
                },
            },
            // e : 마케팅

            // 설정
            {
                /** @complete */
                path: '/config/member',
                name: 'Config',
                component: createAsyncPage(import('@pages/config/member/index.vue')),
            },
            {
                /** @complete */
                path: '/config/withdrawal',
                name: 'Withdrawal',
                component: createAsyncPage(import('@pages/config/withdrawal/index.vue')),
                meta: {
                    floating: true,
                },
                beforeEnter(to, from, next) {
                    next(from.name !== 'Config' ? 'not-found-page' : undefined)
                },
            },
            {
                /**
                 * @complete
                 * @needFix 사업자 추가, 삭제 기능 제정의 필요
                 */
                path: '/config/personalBusinessOwnerInfo',
                name: 'Business',
                component: createAsyncPage(import('@pages/config/business/index.vue')),
                meta: {
                    title: '사업자 정보',
                    layout: 'default',
                },
            },
            {
                /** @complete */
                path: '/config/franchise/:mcno',
                name: 'Franchise',
                component: createAsyncPage(import('@pages/config/franchise/index.vue')),
                meta: {
                    title: '가맹점 정보',
                    layout: 'default',
                    footer: false,
                    floating: true,
                },
                beforeEnter(to, from, next) {
                    next(from.name !== 'Business' ? 'not-found-page' : undefined)
                },
            },
            //공지사항
            {
                /** @complete */
                path: '/config/notice',
                name: 'Notice',
                component: createAsyncPage(import('@pages/config/notice/index.vue')),
            },
            // 공지사항 상세
            {
                /** @complete */
                path: '/config/notice/detail/:no',
                name: 'Notice Detail',
                component: createAsyncPage(import('@pages/config/notice/detail/index.vue')),
            },
            // 자주 묻는 질문(faq)
            {
                /** @complete */
                path: '/config/faq',
                name: 'FAQ',
                component: createAsyncPage(import('@pages/config/faq/index.vue')),
            },

            // 이용약관
            {
                /** @complete */
                path: '/config/terms',
                name: 'Terms',
                component: createAsyncPage(import('@pages/config/terms/index.vue')),
            },

            // 이용약관 상세
            {
                /** @complete */
                path: '/config/terms/detail/:no',
                name: 'Terms Detail',
                component: createAsyncPage(import('@pages/config/terms/detail/index.vue')),
            },
            // 매출/입금 연동 페이지
            {
                /** @complete */
                path: '/salesAndPurchases',
                name: 'Sales Linkage',
                component: createAsyncPage(import('@pages/salesAndPurchases/index.vue')),
                children: [
                    {
                        /** @complete */
                        path: '/salesAndPurchases/sales',
                        name: 'Sales',
                        component: createAsyncPage(import('@pages/salesAndPurchases/sales/index.vue')),
                    },
                    // 입금 내역
                    {
                        /** @complete */
                        path: '/salesAndPurchases/deposit',
                        name: 'Deposit',
                        component: createAsyncPage(import('@pages/salesAndPurchases/deposit/index.vue')),
                    },
                ],
            },
        ],
    },
]

export default routes

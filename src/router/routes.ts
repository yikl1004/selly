import type { Location, RouteConfig } from 'vue-router'

export type RouteMeta = {
    floating?: boolean
}

/**
 * @description vue route 파일 (페이지 관리)
 * @notice 범례 - 중첩으로 표기 될 수 있습니다.
 *      - @complete 완료
 *      - @working 작업중
 *      - @needFix 수정필요(기획 변경, 디자인 변경 등)
 * @etc 금융 관련 메뉴 전부가 개발범위에서 탈락하여 router에서 제거 하고 따로 파일을 만들어 뒀습니다.
 * @path 금융 라우터 src/router/financeRoutes.ts
 *
 */

const loading = {
    template: `<Loading />`,
}

type PathNames =
    | 'Navigation'
    | 'Main'
    | 'Login'
    | 'AuthCallback'
    | 'Join'
    | 'TaxServiceGuide'
    | 'MarketingGuide'
    | 'MarketingStepFirst'
    | 'MarketingStepSecond'
    | 'MarketingStepThird'
    | 'CouponList'
    | 'CouponDetail'
    | 'Config'
    | 'Withdrawal'
    | 'Business'
    | 'Franchise'
    | 'Notice'
    | 'NoticeDetail'
    | 'FAQ'
    | 'Terms'
    | 'TermsDetail'
    | 'SalesLinkage'
    | 'Sales'
    | 'Deposit'
    /***** */
    | 'NewMarketingGuide'
    | 'NewMarketingStepFirst'
    | 'NewMarketingStepSecond'
    | 'NewMarketingStepThird'
    | 'NewCouponList'
    | 'NewCouponDetail'
export const Path: Record<PathNames, Location> = {
    Navigation: { name: 'Navigation' },
    Main: { name: 'Main' },
    Login: { name: 'Login' },
    AuthCallback: { name: 'Auth Callback' },
    Join: { name: 'Join' },
    TaxServiceGuide: { name: 'Tax Service Guide' },
    MarketingGuide: { name: 'Marketing Coupon Creation Guide' },
    MarketingStepFirst: { name: 'Marketing Coupon Creation Step 1' },
    MarketingStepSecond: { name: 'Marketing Coupon Creation Step 2' },
    MarketingStepThird: { name: 'Marketing Coupon Creation Step 3' },
    CouponList: { name: 'CouponList' },
    CouponDetail: { name: 'CouponDetail' },
    /****** */
    NewMarketingGuide: { name: 'New Marketing Coupon Creation Guide' },
    NewMarketingStepFirst: { name: 'New Marketing Coupon Creation Step 1' },
    NewMarketingStepSecond: { name: 'New Marketing Coupon Creation Step 2' },
    NewMarketingStepThird: { name: 'New Marketing Coupon Creation Step 3' },
    NewCouponList: { name: 'New CouponList' },
    NewCouponDetail: { name: 'New CouponDetail' },
    /***** */
    Config: { name: 'Config' },
    Withdrawal: { name: 'Withdrawal' },
    Business: { name: 'Business' },
    Franchise: { name: 'Franchise' },
    Notice: { name: 'Notice' },
    NoticeDetail: { name: 'Notice Detail' },
    FAQ: { name: 'FAQ' },
    Terms: { name: 'Terms' },
    TermsDetail: { name: 'Terms Detail' },
    SalesLinkage: { name: 'Sales Linkage' },
    Sales: { name: 'Sales' },
    Deposit: { name: 'Deposit' },
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
            /** GNB: Global Navigation Bar */
            {
                /** @complete */
                path: '/navigation',
                name: Path.Navigation.name,
                component: createAsyncPage(import('@pages/navigation/index.vue')),
            },

            /* 메인 */
            {
                path: '',
                name: Path.Main.name,
                component: createAsyncPage(import('@pages/index.vue')),
                meta: {},
            },

            // 로그인
            {
                /** @complete */
                path: '/login',
                name: Path.Login.name,
                component: createAsyncPage(import('@pages/login/index.vue')),
            },

            // 로그인 콜백(카카오 로그인)
            {
                /** @complete */
                path: '/authCallback',
                name: Path.AuthCallback.name,
                component: createAsyncPage(import('@pages/login/AuthCallback.vue')),
            },

            {
                /** @complete */
                path: '/join',
                name: Path.Join.name,
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

            // 세무서비스
            {
                /** @complete */
                path: '/taxServiceGuide',
                name: Path.TaxServiceGuide.name,
                component: createAsyncPage(import('@pages/taxServiceGuide/index.vue')),
                meta: {},
            },

            // s: 마케팅
            // 쿠폰만들기 - 안내페이지
            {
                /** @complete */
                path: '/marketing/couponCreation',
                name: Path.MarketingGuide.name,
                component: createAsyncPage(import('@pages/marketing/couponCreation/index.vue')),
                meta: {
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step1
            {
                /** @complete */
                path: '/marketing/couponCreation/stepFirst',
                name: Path.MarketingStepFirst.name,
                component: createAsyncPage(import('@pages/marketing/couponCreation/StepFirst.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step2
            {
                /** @complete */
                path: '/marketing/couponCreation/stepSecond',
                name: Path.MarketingStepSecond.name,
                component: createAsyncPage(import('@pages/marketing/couponCreation/StepSecond.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step3
            {
                /** @complete */
                path: '/marketing/couponCreation/stepThird',
                name: Path.MarketingStepThird.name,
                component: createAsyncPage(import('@pages/marketing/couponCreation/StepThird.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },

            // 신청내역
            {
                path: '/marketing/applicationDetail',
                name: Path.CouponList.name,
                component: createAsyncPage(import('@pages/marketing/history/index.vue')),
                meta: {
                    floating: true,
                },
            },
            // 신청내역_상세
            {
                path: '/marketing/detail',
                name: Path.CouponDetail.name,
                component: createAsyncPage(import('@pages/marketing/detail/index.vue')),
                meta: {
                    floating: true,
                },
            },
            // 내 주변 매출
            {
                path: '/aroundSales',
                name: 'AroundSales',
                component: createAsyncPage(import('@pages/aroundSales/index.vue')),
                meta: {
                    floating: true,
                },
            },
            // e : 마케팅

            // s: NEW 마케팅
            // 쿠폰만들기 - 안내페이지
            {
                /** @working */
                path: '/newMarketing/couponCreation',
                name: Path.NewMarketingGuide.name,
                component: createAsyncPage(import('@pages/newMarketing/couponCreation/index.vue')),
                meta: {
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step1
            {
                /** @working */
                path: '/newMarketing/couponCreation/stepFirst',
                name: Path.NewMarketingStepFirst.name,
                component: createAsyncPage(import('@pages/newMarketing/couponCreation/StepFirst.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step2
            {
                /** @working */
                path: '/newMarketing/couponCreation/stepSecond',
                name: Path.NewMarketingStepSecond.name,
                component: createAsyncPage(import('@pages/newMarketing/couponCreation/StepSecond.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },
            //쿠폰만들기_step3
            {
                /** @working */
                path: '/newMarketing/couponCreation/stepThird',
                name: Path.NewMarketingStepThird.name,
                component: createAsyncPage(import('@pages/newMarketing/couponCreation/StepThird.vue')),
                meta: {
                    floating: true,
                    title: '쿠폰 만들기',
                },
            },

            // 신청내역
            {
                /** @working */
                path: '/newMarketing/applicationDetail',
                name: Path.NewCouponList.name,
                component: createAsyncPage(import('@pages/newMarketing/history/index.vue')),
                meta: {
                    floating: true,
                },
            },
            // 신청내역_상세
            {
                /** @working */
                path: '/newMarketing/detail',
                name: Path.NewCouponDetail.name,
                component: createAsyncPage(import('@pages/newMarketing/detail/index.vue')),
                meta: {
                    floating: true,
                },
            },
            // e : NEW 마케팅

            // s: 설정
            {
                /** @complete */
                path: '/config/member',
                name: Path.Config.name,
                component: createAsyncPage(import('@pages/config/member/index.vue')),
            },
            {
                /** @complete */
                path: '/config/withdrawal',
                name: Path.Withdrawal.name,
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
                name: Path.Business.name,
                component: createAsyncPage(import('@pages/config/business/index.vue')),
                meta: {
                    title: '사업자 정보',
                    layout: 'default',
                },
            },
            {
                /** @complete */
                path: '/config/franchise/:mcno',
                name: Path.Franchise.name,
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
                name: Path.Notice.name,
                component: createAsyncPage(import('@pages/config/notice/index.vue')),
            },
            // 공지사항 상세
            {
                /** @complete */
                path: '/config/notice/detail/:no',
                name: Path.NoticeDetail.name,
                component: createAsyncPage(import('@pages/config/notice/detail/index.vue')),
            },
            // 자주 묻는 질문(faq)
            {
                /** @complete */
                path: '/config/faq',
                name: Path.FAQ.name,
                component: createAsyncPage(import('@pages/config/faq/index.vue')),
            },

            // 이용약관
            {
                /** @complete */
                path: '/config/terms',
                name: Path.Terms.name,
                component: createAsyncPage(import('@pages/config/terms/index.vue')),
            },

            // 이용약관 상세
            {
                /** @complete */
                path: '/config/terms/detail',
                name: Path.TermsDetail.name,
                component: createAsyncPage(import('@pages/config/terms/detail/index.vue')),
            },
            // e: 설정

            // s: 매출/입금
            {
                // 매출/입금 연동 페이지
                /** @complete */
                path: '/salesAndPurchases',
                name: Path.SalesLinkage.name,
                component: createAsyncPage(import('@pages/salesAndPurchases/index.vue')),
                children: [
                    {
                        // 매출 내역
                        /** @complete */
                        path: '/salesAndPurchases/sales',
                        name: Path.Sales.name,
                        component: createAsyncPage(import('@pages/salesAndPurchases/sales/index.vue')),
                    },
                    // 입금 내역
                    {
                        /** @complete */
                        path: '/salesAndPurchases/deposit',
                        name: Path.Deposit.name,
                        component: createAsyncPage(import('@pages/salesAndPurchases/deposit/index.vue')),
                    },
                ],
            },
            // e: 매출/입금
        ],
    },
]

export default routes

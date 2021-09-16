import type { Location, RouteConfig } from 'vue-router'

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
            /** Global Navigation */
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

            // 로그인 콜백
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

            // 금융페이지
            // 금융메인 / 금융 안내페이지
            {
                path: '/finance',
                name: 'Finance',
                component: createAsyncPage(import('@pages/finance/index.vue')),
                children: [],
            },
            //금융인트로_비즈론
            {
                path: '/finance/introbiz',
                name: 'biz loan intro',
                component: createAsyncPage(import('@pages/finance/intro/BizLoan.vue')),
            },
            //금융인트로_카드론
            {
                path: '/finance/introcard',
                name: 'card loan intro',
                component: createAsyncPage(import('@pages/finance/intro/CardLoan.vue')),
            },
            //금융인트로_사업자
            {
                path: '/finance/introbusiness',
                name: 'business loan intro',
                component: createAsyncPage(import('@pages/finance/intro/BusinessLoan.vue')),
            },
            //금융인트로_신용
            {
                path: '/finance/introcredit',
                name: 'credit loan intro',
                component: createAsyncPage(import('@pages/finance/intro/CreditLoan.vue')),
            },
            //신용카드 인증
            {
                path: '/finance/creditcardauth',
                name: 'creditcardauth',
                component: createAsyncPage(import('@pages/finance/apply/CreditCardAuth.vue')),
            },
            //본인 인증
            {
                path: '/finance/selfauth',
                name: 'self auth',
                component: createAsyncPage(import('@pages/finance/apply/SelfAuth.vue')),
            },
            //대출약관동의
            {
                path: '/finance/agreeterms',
                name: 'self auth',
                component: createAsyncPage(import('@pages/finance/apply/AgreeLoanTerms.vue')),
            },
            //금소법 적합성 확인
            {
                path: '/finance/loancompatibility',
                name: 'loan compatibility',
                component: createAsyncPage(import('@pages/finance/apply/LoanCompatibility.vue')),
            },
            //신청 스텝_가맹점 선택
            {
                path: '/finance/applystep1',
                name: 'step1',
                component: createAsyncPage(import('@pages/finance/apply/ApplyStep1.vue')),
            },
            //신청 스텝_신청서
            {
                path: '/finance/applystep2',
                name: 'step2',
                component: createAsyncPage(import('@pages/finance/apply/ApplyStep2.vue')),
            },
            //신청 스텝_신청정보
            {
                path: '/finance/applystep3',
                name: 'step3',
                component: createAsyncPage(import('@pages/finance/apply/ApplyStep3.vue')),
            },
            //신청 스텝_본인인증
            {
                path: '/finance/applystep4',
                name: 'step4',
                component: createAsyncPage(import('@pages/finance/apply/ApplyStep4.vue')),
            },
            //신청 스텝_부가정보
            {
                path: '/finance/applystep5',
                name: 'step5',
                component: createAsyncPage(import('@pages/finance/apply/ApplyStep5.vue')),
            },
            //신청완료
            {
                path: '/finance/applycomplete',
                name: 'Apply Complete',
                component: createAsyncPage(import('@pages/finance/apply/ApplyComplite.vue')),
            },

            //대출신청불가
            {
                path: '/finance/applyfail1',
                name: 'fail',
                component: createAsyncPage(import('@pages/finance/apply/ApplyFail.vue')),
            },
            //본인인증 실패
            {
                path: '/finance/applyfail2',
                name: 'fail',
                component: createAsyncPage(import('@pages/finance/apply/ApplyFail2.vue')),
            },
            //현재 신청중인 대출있음
            {
                path: '/finance/applyfail3',
                name: 'fail',
                component: createAsyncPage(import('@pages/finance/apply/ApplyFail3.vue')),
            },
            //현재 가능한도 없음
            {
                path: '/finance/applyfail4',
                name: 'fail',
                component: createAsyncPage(import('@pages/finance/apply/ApplyFail4.vue')),
            },
            //ars인증
            {
                path: '/finance/authars',
                name: 'ars',
                component: createAsyncPage(import('@pages/finance/apply/AuthArs.vue')),
            },
            //이용거절
            {
                path: '/finance/refusal',
                name: 'ars',
                component: createAsyncPage(import('@pages/finance/UseRefusal.vue')),
            },
            //대출내역페이지
            {
                path: '/finance/loanhistory',
                name: 'Loan History',
                component: createAsyncPage(import('@pages/finance/LoanHistory.vue')),
                meta: {
                    layout: 'default',
                },
            },
            //대출내역 상세페이지
            {
                path: '/finance/loandetail',
                name: 'Loan History Detail',
                component: createAsyncPage(import('@pages/finance/LoanHistoryDetail.vue')),
                meta: {
                    layout: 'default',
                },
            },

            // 세무서비스
            {
                /** @complete */
                path: '/taxServiceGuide',
                name: 'Tax Service Guide',
                component: createAsyncPage(import('@pages/taxServiceGuide/index.vue')),
                meta: {},
            },

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
                path: '/config/terms/detail/:no',
                name: Path.TermsDetail.name,
                component: createAsyncPage(import('@pages/config/terms/detail/index.vue')),
            },
            // 매출/입금 연동 페이지
            {
                /** @complete */
                path: '/salesAndPurchases',
                name: Path.SalesLinkage.name,
                component: createAsyncPage(import('@pages/salesAndPurchases/index.vue')),
                children: [
                    {
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
        ],
    },
]

export default routes

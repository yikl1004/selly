import type { Location, RouteConfig } from 'vue-router'

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

const financeRoutes: Array<RouteConfig & { meta?: RouteMeta }> = [
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
]

export default financeRoutes

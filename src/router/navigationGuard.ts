import store from '@stores/index'
import { CommonModule } from '@stores/modules/common'
import { Path } from '@router/routes'
import type { NavigationGuard } from 'vue-router'
interface SellyNavigationGuard {
    beforeEach: NavigationGuard
}

/** 세션 연장 시간 타이머 */
export const sessionTimer = {
    interval: {
        // nine: 5000,
        // ten: 6000,
        nine: 1000 * 60 * 9,
        ten: 1000 * 60 * 10,
    },
    timer: {
        nine: 0,
        ten: 0,
    },
    create() {
        this.timer.nine = window.setTimeout(() => {
            store.commit('common/setSessionModal', true)
        }, this.interval.nine)
        this.timer.ten = window.setTimeout(async () => {
            store.commit('common/setOvertime', true)
            await store.dispatch('auth/getLogoutInfo')
            window.location.href = '/login'
        }, this.interval.ten)
    },
    clear() {
        store.commit('common/setOvertime', false)
        store.commit('common/setOvertime', false)
        window.clearTimeout(this.timer.nine)
        window.clearTimeout(this.timer.ten)
    },
}

/**
 * @title navigatoin guard
 * @description
 * 1. 각 페이지에서 필요한 API를 호출 할 떄 결과 값에 따른 페이지 처리가 필요
 * 2. beforeEach 메서드는 router의 전역 가드 이므로 여기서 공통으로 처리하기보다 각 페이지 router에서 처리하는 것이 낮다고 판단됨
 *      2-1. 개별 router의 beforeEnter 가드
 *      2-2. 컴포넌트 내부의 beforeRouteEnter 가드
 */
const navigationGuard: SellyNavigationGuard = {
    async beforeEach(to, from, next) {
        const referrer = CommonModule.referrerData
        let pageTransitionDirection = to.name === referrer ? 'prev' : 'next'

        if (from.name === 'Navigation') {
            pageTransitionDirection = 'prev'
        }
        // console.log(pageTransitionDirection, {
        //     to: to.name,
        //     referrer,
        // })
        store.commit('ui/setPageDirection', pageTransitionDirection)

        const exceptioPageList = [Path.Login, Path.AuthCallback, Path.TermsDetail, Path.TermsDetail].map(value => value.name)

        if (process.env.NODE_ENV !== 'production') {
            exceptioPageList.push('Example')
        }

        // 세션 연장
        if (exceptioPageList.every(item => item !== to.name)) {
            sessionTimer.clear()
            await store.dispatch('common/getLoginExtendInfo')
            sessionTimer.create()
        }

        next()
    },
}

export default navigationGuard

import store from '@stores/index'
import { NavigationGuard } from 'vue-router'
import { CommonModule } from '@stores/modules/common'
interface SellyNavigationGuard {
    beforeEach: NavigationGuard
}

/**
 * @title navigatoin guard
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

        /**
         * @description
         * 1. 각 페이지에서 필요한 API를 호출 할 떄 결과 값에 따른 페이지 처리가 필요
         * 2. beforeEach 메서드는 router의 전역 가드 이므로 여기서 공통으로 처리하기보다 각 페이지 router에서 처리하는 것이 낮다고 판단됨
         *      2-1. 개별 router의 beforeEnter 가드
         *      2-2. 컴포넌트 내부의 beforeRouteEnter 가드
         */

        // 세션 연장
        if (['Login', 'Auth Callback'].every(item => item !== to.name)) {
            await store.dispatch('common/getLoginExtendInfo')
        }
        next()
    },
}

export default navigationGuard

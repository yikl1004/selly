import store from '@stores/index'
import { NavigationGuard } from 'vue-router'

/**
 * navigatoin guard
 */
// const exceptionPages = [' ', 'NeedLogin', 'NotFound', 'Join']

interface SellyNavigationGuard {
    beforeEach: NavigationGuard
}

const navigationGuard: SellyNavigationGuard = {
    async beforeEach(to, from, next) {
        /**
         * @description
         * 1. 모든 API에서 로그인 체크를 기본적으로 함.(client에서 할 필요가 없다)
         * 2. 각 페이지에서 필요한 API를 호출 할 떄 결과 값에 따른 페이지 처리가 필요
         * 3. beforeEach 메서드는 router의 전역 가드 이므로 여기서 공통으로 처리하기보다 각 페이지 router에서 처리하는 것이 낮다고 판단됨
         *      3-1. 개별 router의 beforeEnter 가드 (params: to, from, next)
         *      3-2. 컴포넌트 내부의 beforeRouteEnter 가드 (params: to, from, next())
         *      3-3. 위 2가지 방법중 한가지를 택해서 사용하는 것이 나을것 같음...(뇌피셜 by CMK)
         */

        if (to.path !== '/') {
            store.commit('ui/setVisibleHeader', true)
            store.commit('ui/setHeaderType', 'sub')
            store.commit('ui/setHeaderTitle', to.meta.title)
        }

        // 세션 연장
        await store.dispatch('common/getLoginExtendInfo')
        const isMain = to.name === 'Main'
        const needLogin = store.state.common.loginExtendInfo?.rc === '8888'
        next(
            [!isMain, needLogin].every(item => item)
                ? { name: 'Main' }
                : undefined,
        )
    },
}

export default navigationGuard

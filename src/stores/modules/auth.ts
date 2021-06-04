import { Module, VuexModule, MutationAction, Action } from 'vuex-module-decorators'
import AuthService from '@services/auth'
import cookie from 'js-cookie'

export interface AuthState {
    loginInfo: any
    isLogin: boolean
}

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class Auth extends VuexModule {
    public loginInfo: any = {}
    public isLogin: boolean = false

    @MutationAction({ mutate: ['loginInfo', 'isLogin'] })
    async getLoginInfo() {
        const ciNo = 'sdsadsds'
        // 0U4k05hAwCYT0IwN5kvW5leCyQ6QSZFyV2dH6gaNARlMwUUgHodI4jCOWIaU8ySUbfHpJyEAUP7AXj0w9yU40w==',
        const { data: loginInfo } = await AuthService.getLoginInfo({ ciNo })

        return {
            loginInfo: loginInfo.data,
            isLogin: loginInfo.data.mbrBzRegYn === 'Y',
        }
    }

    @MutationAction({ mutate: ['isLogin'] })
    async loginCheck() {
        // TODO: 로그인 체크 API가 있어야 함!!!
        const session = await cookie.get('SELLYJWT')

        return {
            isLogin: !!session,
        }
    }
}

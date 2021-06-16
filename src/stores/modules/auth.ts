import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import AuthService from '@services/auth'
import cookie from 'js-cookie'

export interface AuthState {
    loginInfo: any
    isLogin: boolean
}

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class Auth extends VuexModule {
    public loginInfo: any = {
        mbrBzRegYn: 'N',
    }
    public isLogin: boolean = false
    public ci: string = ''

    @Mutation
    setCI(ci: string) {
        this.ci = ci
    }

    @MutationAction({ mutate: ['loginInfo', 'isLogin'] })
    async getLoginInfo() {
        // test ci: 0U4k05hAwCYT0IwN5kvW5leCyQ6QSZFyV2dH6gaNARlMwUUgHodI4jCOWIaU8ySUbfHpJyEAUP7AXj0w9yU40w==
        let loginInfo = this.loginInfo
        if (this.ci) {
            const res = await AuthService.getLoginInfo({ ciNo: this.ci })
            loginInfo = res.data
        }

        return {
            loginInfo,
            isLogin: loginInfo.mbrBzRegYn === 'Y',
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

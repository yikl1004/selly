import { Module, VuexModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import AuthService, { AuthResponse, AuthParameters } from '@services/auth'

interface APIResponse {}
export interface AuthState {
    loginInfo: LoginInfo
    kakaoUserInfo: UserInfo
    responseCode?: ResponseCode
}

declare global {
    type UserInfo = AuthParameters['loginInfo']
    type LoginInfo = AuthResponse['loginInfo']['data']
}

@Module({ name: 'auth', namespaced: true })
export default class Auth extends VuexModule<AuthState> {
    public loginInfo: LoginInfo | null = null
    public kakaoUserInfo: UserInfo | null = null
    public responseCode: ResponseCode | null = null

    @Mutation
    init() {
        return {
            loginInfo: null,
            kakaoUserInfo: null,
            responseCode: null,
        }
    }

    @Mutation
    setUserInfo(userInfo: UserInfo) {
        this.kakaoUserInfo = userInfo
    }

    @MutationAction
    async getLoginInfo() {
        const state = this.state as AuthState
        const { data } = await AuthService.getLoginInfo(state.kakaoUserInfo)

        return {
            loginInfo: data.data,
            responseCode: data.rc,
        }
    }
}

import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
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
    type MemberWorkplaceInfo = AuthResponse['memberWorkplaceInfo']
    type MainInfo = AuthResponse['mainInfo']
    type BizInfo = AuthResponse['bizInfo']
}

@Module({ name: 'auth', namespaced: true })
export default class Auth extends VuexModule<AuthState> {
    public loginInfo: LoginInfo | null = null
    public kakaoUserInfo: UserInfo | null = null
    public memberWorkplaceInfo: MemberWorkplaceInfo | null = null
    public mainInfo: MainInfo | null = null
    public bizInfo: BizInfo | null = null

    @Mutation
    init() {
        return {
            loginInfo: null,
            kakaoUserInfo: null,
            memberWorkplaceInfo: null,
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
        }
    }

    @MutationAction
    async getMemberWorkplaceInfo() {
        const { data } = await AuthService.getMemberWorkplaceInfo()

        return {
            memberWorkplaceInfo: data,
        }
    }

    @MutationAction
    async getMainInfo() {
        const { data } = await AuthService.getMainInfo()

        return {
            mainInfo: data,
        }
    }

    @MutationAction
    async getBizInfoInput(params: AuthParameters['bizInfo']) {
        const { data } = await AuthService.getBizInfoInput(params)

        return {
            bizInfo: data,
        }
    }

    /**
     * @description
     * getMemberWorkplaceInfo 액션을 통해 store에 적재된 가입가능한 사업장 리스트를 반환
     */
    get workplaceList(): BizInfo['data']['list'] {
        const { memberWorkplaceInfo } = this

        if (memberWorkplaceInfo && memberWorkplaceInfo!.data) {
            return memberWorkplaceInfo!.data.list || []
        } else {
            return []
        }
    }

    /**
     * @description
     * getMemberWorkplaceInfo 액션을 통해 store에 적재된 가입하려는 대상자의 성명을 반환
     */
    get workplaceOwnerName(): string {
        const { memberWorkplaceInfo } = this

        if (memberWorkplaceInfo && memberWorkplaceInfo!.data) {
            return memberWorkplaceInfo!.data.mbrNm || ''
        } else {
            return ''
        }
    }
}

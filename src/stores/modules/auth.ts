import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import AuthService, { AuthResponse, AuthParameters } from '@services/auth'

export interface AuthState {
    loginInfo: LoginInfo | null
    kakaoUserInfo: UserInfo | null
    memberWorkplaceInfo: MemberWorkplaceInfo | null
    mainInfo: MainInfo | null
    bizInfo: BizInfo | null
    logoutInfo: LogoutInfo | null
    inputRecommenderCodeResult: RecommenderCode | null
}

declare global {
    type UserInfo = AuthParameters['loginInfo']
    type LoginInfo = AuthResponse['loginInfo']['data']
    type MemberWorkplaceInfo = AuthResponse['memberWorkplaceInfo']
    type MainInfo = AuthResponse['mainInfo']
    type BizInfo = AuthResponse['bizInfo']
    type LogoutInfo = AuthResponse['logoutInfo']
    type RecommenderCode = AuthResponse['recommenderCode']
}

@Module({ name: 'auth', namespaced: true })
export default class Auth extends VuexModule<AuthState> {
    public loginInfo: LoginInfo | null = null
    public kakaoUserInfo: UserInfo | null = null
    public memberWorkplaceInfo: MemberWorkplaceInfo | null = null
    public mainInfo: MainInfo | null = null
    public bizInfo: BizInfo | null = null
    public logoutInfo: LogoutInfo | null = null
    public inputRecommenderCodeResult: RecommenderCode | null = null

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
        const { data } = await AuthService.getLoginInfo(state.kakaoUserInfo as UserInfo)

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

    @MutationAction
    async getLogoutInfo() {
        const { data } = await AuthService.getLogoutInfo()

        return {
            logoutInfo: data,
        }
    }

    @MutationAction
    async inputRecommenderCode(params: AuthParameters['recommenderCode']) {
        const { data } = await AuthService.inputRecommenderCode(params)

        return {
            inputRecommenderCodeResult: data,
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

    /**
     * @description
     * 사업자 정보 입력 등록이 완료된 리스트를 반환
     */
    get bizInfoList(): BizInfo['data']['list'] {
        const { bizInfo } = this

        if (bizInfo && bizInfo.data && bizInfo.data.list) {
            return bizInfo.data.list
        } else {
            return []
        }
    }

    /**
     * @description
     * 사업자 정보 입력 등록이 완료된 사용자의 성명을 반환
     */
    get bizmanName(): string {
        const { bizInfo } = this

        if (bizInfo && bizInfo.data && bizInfo.data.mbrNm) {
            return bizInfo.data.mbrNm || ''
        } else {
            return ''
        }
    }

    /**
     * @description
     * 추천인 코드 입력 요청 후 결과로 받은 메세지를 반환
     */
    get recommenderCodeMessage(): string {
        const { inputRecommenderCodeResult } = this

        if (inputRecommenderCodeResult && inputRecommenderCodeResult.rsMsg) {
            return inputRecommenderCodeResult.rsMsg || ''
        } else {
            return ''
        }
    }
}

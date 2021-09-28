import { Module, VuexModule, MutationAction, Mutation, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import AuthService from '@services/auth'
import { basicUtil } from '@utils/mixins'
import { $dayjs } from '@utils/plugins/dayjs'
import type {
    BizInfo,
    ChangeBusinessManName,
    ChangeFranchiseDetail,
    DatusLoginInfo,
    LoginInfo,
    MarketingUpdate,
    RecommenderCode,
    Responses,
} from '@services/auth.interface'

export interface AuthState {
    loginInfo: Responses['loginInfo']['data'] | null
    kakaoUserInfo: LoginInfo['Req'] | null
    datusLoginInfo: Responses['datusLoginInfo'] | null
    memberWorkplaceInfo: Responses['memberWorkplaceInfo'] | null
    bizInfo: Responses['memberWorkplaceInfo'] | null
    logoutInfo: Responses['logoutInfo'] | null
    inputRecommenderCodeResult: Responses['recommenderCode'] | null
    memberInfo: Responses['memberInfo'] | null
    withdrawalResult: Responses['withdrawal']['data'] | null
    businessManInfo: Responses['businessMainInfo']['data'] | null
    franchiseDetail: Responses['franchiseDetail']['data'] | null
}

@Module({ name: 'auth', namespaced: true, dynamic: true, store })
export default class Auth extends VuexModule {
    public loginInfo: AuthState['loginInfo'] = null
    public kakaoUserInfo: AuthState['kakaoUserInfo'] = null
    public datusLoginInfo: AuthState['datusLoginInfo'] | null = null
    public memberWorkplaceInfo: AuthState['memberWorkplaceInfo'] = null
    public bizInfo: AuthState['bizInfo'] = null
    public logoutInfo: AuthState['logoutInfo'] = null
    public inputRecommenderCodeResult: AuthState['inputRecommenderCodeResult'] = null
    public memberInfo: AuthState['memberInfo'] = {
        rc: '0000',
        rsMsg: '',
        data: {
            mbrNm: '',
            kkoId: '',
            cellNo: '',
            mrktYn: 'N',
            loanYn: 'N',
            bizLoanYn: 'N',
            datusYn: 'N',
        },
    }
    public withdrawalResult: AuthState['withdrawalResult'] = null
    public cancelGuideList: { text: string }[] = []
    public businessManInfo: AuthState['businessManInfo'] = null
    public franchiseDetail: AuthState['franchiseDetail'] = null

    @Mutation
    selectBusinessMan(bzno: string) {
        this.businessManInfo = {
            ...this.businessManInfo,
            list: this.businessManInfo
                ? this.businessManInfo.list.map(item => {
                      item.selected = item.bzno === bzno
                      return item
                  })
                : [],
        }
    }

    @Mutation
    deleteFranchiseDetail() {
        this.franchiseDetail = null
    }

    @Mutation
    init() {
        this.loginInfo = null
        this.kakaoUserInfo = null
        this.memberWorkplaceInfo = null
    }

    @Mutation
    setUserInfo(userInfo: AuthState['kakaoUserInfo']) {
        this.kakaoUserInfo = userInfo
    }

    @MutationAction
    async getDatusLoginInfo(params: DatusLoginInfo['Req']) {
        const { data } = await AuthService.getDatusLoginInfo(params)
        return {
            datusLoginInfo: data,
        }
    }

    @MutationAction
    async getLoginInfo() {
        const state = this.state as AuthState
        const { data } = await AuthService.getLoginInfo(state.kakaoUserInfo as NonNullable<AuthState['kakaoUserInfo']>)

        if (data && data.rc === '0000') {
            localStorage.setItem('auth', JSON.stringify(Object.assign({}, data.data, { date: $dayjs().format('YYYY-MM-DD HH:mm:ss') })))
        }

        return {
            loginInfo: data ? data.data : null,
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
    async getBizInfoInput(params: BizInfo['Req']) {
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
    async inputRecommenderCode(params: RecommenderCode['Req']) {
        const { data } = await AuthService.inputRecommenderCode(params)

        return {
            inputRecommenderCodeResult: data,
        }
    }

    @MutationAction
    async getMemberInfo() {
        const { data } = await AuthService.getMemberInfo()

        return {
            memberInfo: data,
        }
    }

    @MutationAction
    async setMarketingUpdate(params: MarketingUpdate['Req']) {
        await AuthService.setMarketingUpdate(params)
        return {}
    }

    @MutationAction
    async setWithdrawal() {
        const { data } = await AuthService.setWithdrawal()

        return {
            withdrawalResult: data,
        }
    }

    @MutationAction
    async beforeWithdrawal() {
        const typedState = this.state as AuthState

        if (typedState.memberInfo) {
            const { mrktYn, datusYn, loanYn, bizLoanYn } = typedState.memberInfo?.data
            const params = { mrktYn, datusYn, loanYn, bizLoanYn }
            const { data } = await AuthService.checkBeforeWithdrawal(params)

            return {
                cancelGuideList: data
                    ? (data.data.list || []).map(item => ({
                          text: item.rsgDesc,
                      }))
                    : [],
            }
        } else {
            return {}
        }
    }

    @MutationAction
    async getBusinessManInfo() {
        const { data } = await AuthService.getBusinessManInfo()

        if (data) {
            return {
                businessManInfo: {
                    ...data.data,
                    list: [
                        ...data.data.list.map((item, index) => {
                            if (index === 0) {
                                item.selected = true
                            }
                            return item
                        }),
                    ],
                },
            }
        }
    }

    @MutationAction
    async getFranchiseDetail(mcno: string) {
        const { data } = await AuthService.getFranchiseDetail({ mcno })

        return {
            franchiseDetail: data ? data.data : null,
        }
    }

    @MutationAction
    async updateFranchiseDetail(params: ChangeFranchiseDetail['Req']) {
        await AuthService.updateFranchiseDetail(params)
        return {}
    }

    @MutationAction
    async updateBusinessManName(params: ChangeBusinessManName['Req']) {
        await AuthService.updateBusinessManName(params)
        return {}
    }

    /**
     * @description
     * 사용자 이름
     */
    get userName(): string {
        const authLocalStorage = JSON.parse(localStorage.getItem('auth') || '')
        let cachedName = ''

        if (authLocalStorage && authLocalStorage.dgNm) {
            cachedName = authLocalStorage.dgNm
        }

        return cachedName
    }

    /**
     * @description
     * getMemberWorkplaceInfo 액션을 통해 store에 적재된 가입가능한 사업장 리스트를 반환
     */
    get workplaceList(): Responses['bizInfo']['data']['list'] {
        const { memberWorkplaceInfo } = this

        if (memberWorkplaceInfo && memberWorkplaceInfo.data) {
            return memberWorkplaceInfo.data.list || []
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

        if (memberWorkplaceInfo && memberWorkplaceInfo.data) {
            return memberWorkplaceInfo.data.mbrNm || ''
        } else {
            return ''
        }
    }

    /**
     * @description
     * 사업자 정보 입력 등록이 완료된 리스트를 반환
     */
    get bizInfoList(): Responses['bizInfo']['data']['list'] {
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

    /**
     * @description
     * 회원정보 데이터를 반환
     */
    get memberViewInfo(): Responses['memberInfo']['data'] | null {
        const { memberInfo } = this

        return memberInfo ? memberInfo.data : null
    }

    /**
     * @description
     * 마케팅, 대출, 장기카드biz론, 유쇼데 유/무
     */
    get cancelGuideParams(): Pick<Responses['memberInfo']['data'], 'datusYn' | 'loanYn' | 'bizLoanYn' | 'mrktYn'> | null {
        if (this.memberInfo) {
            const { data } = this.memberInfo

            return {
                mrktYn: data.mrktYn,
                datusYn: data.datusYn,
                bizLoanYn: data.bizLoanYn,
                loanYn: data.loanYn,
            }
        } else {
            return null
        }
    }

    /**
     * @description
     * 사업자정보 리스트
     */
    get businessManList(): BottomSheetOptionItem[] {
        // const { list } = this.businessManInfo as BusinessManInfo
        const list = this.businessManInfo?.list ?? null

        return list
            ? list.map(item => ({
                  displayName: `${item.bzmanNm} (${basicUtil.convertBizNoFormatter({ bizNo: item.bzno })})`,
                  value: item.bzno,
                  selected: item.selected,
              }))
            : []
    }

    /**
     * @description
     * 사업자 정보
     */
    get businessManInfoData() {
        return this.businessManInfo
    }

    /**
     * @description
     * 가맹점상세 정보
     */
    get franchiseDetailData() {
        return this.franchiseDetail
    }

    /**
     * @description
     * 탈퇴 전 내용확인 정보
     */
    get cancelGuideListData() {
        return this.cancelGuideList
    }

    /**
     * @description
     * 로그인 정보
     */
    get loginInfoData() {
        return this.loginInfo
    }

    /**
     * @description
     * 로그아웃 정보
     */
    get logoutInfoData() {
        return this.logoutInfo
    }

    /**
     * @description
     * 비즈넵 토큰
     */
    get biznavToken(): string {
        const cachedLoginInfo = JSON.parse(localStorage.getItem('auth') || '')
        if (cachedLoginInfo && cachedLoginInfo.bzNavToken) {
            return cachedLoginInfo.bzNavToken
        } else {
            return ''
        }
    }

    /**
     * @description
     * 유쇼데 로그인 정보
     */
    get datusLoginInfoData() {
        return this.datusLoginInfo
    }
}

export const AuthModule = getModule(Auth)

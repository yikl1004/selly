import { axiosInstance, createApi } from '@services/http'
import type { APIList } from '@services/http'
import type {
    AuthAPIList,
    ChangeBusinessManName,
    ChangeFranchiseDetail,
    FranchiseDetail,
    BusinessManInfo,
    BeforeWithdrawalInfo,
    WithdrawalInfo,
    MarketingUpdate,
    MemberInfo,
    RecommenderCode,
    LogoutInfo,
    BizInfo,
    MemberWorkplaceInfo,
    LoginInfo,
    DatusLoginInfo,
} from './auth.interface'

class AuthService {
    private apiList: APIList<keyof AuthAPIList> = {
        /** 유쇼대 로그인/카카오최초인입 */
        datusLogin: createApi('/API/LGN/SELGNAA002'),
        /** 로그인/카카오최초인입 */
        login: createApi('/API/LGN/SELGNAA001'),
        /** my>회원사업장정보(최초로그인시 사업자 정보) */
        memberWorkplaceInfo: createApi('/API/MBR/SEMBRAA002'),
        /** my>최초로그인시 사업자정보 입력 내용 */
        bizInfoInput: createApi('/API/MBR/SEMBRAA004'),
        /** my>회원정보>로그아웃 */
        logout: createApi('/API/MBR/SEMBRBA001'),
        /** my>사업자정보>추천인코드입력 */
        recommenderCode: createApi('/API/MBR/SEMBRAA006'),
        /** my>회원정보요청 */
        memberInfo: createApi('/API/MBR/SEMBRAA001'),
        /** my>회원정보>마케팅동의정보업데이트 */
        marketingUpdate: createApi('/API/MBR/SEMBRAA008'),
        /** 회원탈퇴 */
        withdrawal: createApi('/API/MBR/SEMBRBA002'),
        /** my>회원정보>회원탈퇴전 내용확인 */
        beforeWithdrawal: createApi('/API/MBR/SEMBRBA003'),
        /** my > 사업자정보 및 가맹점 정보 */
        businessManInfo: createApi('/API/MBR/SEMBRAA003'),
        /** my>가맹점상세조회 */
        franchiseDetail: createApi('/API/MBR/SEMBRAA009'),
        /** my>사업자정보>가맹점주소/전화번호변경 */
        changeFranchiseDetail: createApi('/API/MBR/SEMBRAA007'),
        /** my>사업자정보>사업자명변경 */
        changeBusinessManName: createApi('/API/MBR/SEMBRAA005'),
    }

    /**
     * 유쇼대 로그인/카카오최초인입
     * @param {AuthInterfaces.DatusLoginInfo.Req} data
     * @returns {AuthInterfaces.AuthInterfaces.DatusLoginInfo.Res}
     */
    async getDatusLoginInfo(data: DatusLoginInfo['Req']): DatusLoginInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.datusLogin,
            data,
        })
    }

    /**
     * 로그인 카카오 최초 인입
     * @param {AuthInterfaces.LoginInfo.Req} data
     * @returns {AuthInterfaces.LoginInfo.Res}
     */
    async getLoginInfo(data: LoginInfo['Req']): LoginInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.login,
            data,
        })
    }

    /**
     * 회원 사업장 정보(최초 로그인 사업자 정보 요청)
     * @returns {AuthInterfaces.MemberWorkplaceInfo.Res}
     */
    async getMemberWorkplaceInfo(): MemberWorkplaceInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.memberWorkplaceInfo,
        })
    }

    /**
     * my>최초로그인시 사업자정보 입력 요청
     * @param {AuthParameters['bizInfo']}data
     * @returns {BizInfoRes}}
     */
    async getBizInfoInput(data: BizInfo['Req']): BizInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.bizInfoInput,
            data,
        })
    }

    /**
     * my>회원정보>로그아웃
     * @returns {LogoutInfoRes}
     */
    async getLogoutInfo(): LogoutInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.logout,
        })
    }

    /**
     * my>사업자정보>추천인코드입력
     * @param {AuthParameters['recommenderCode']} params
     * @returns {RecommenderCodeRes}
     */
    async inputRecommenderCode(params: RecommenderCode['Req']): RecommenderCode['Res'] {
        return await axiosInstance.request({
            ...this.apiList.recommenderCode,
            params,
        })
    }

    // my>회원정보요청
    async getMemberInfo(): MemberInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.memberInfo,
        })
    }

    // my>회원정보>마케팅동의정보업데이트
    async setMarketingUpdate(params: MarketingUpdate['Req']) {
        return await axiosInstance.request({
            ...this.apiList.marketingUpdate,
            params,
        })
    }

    // my > 회원탈퇴
    async setWithdrawal(): WithdrawalInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.withdrawal,
        })
    }

    // 탈퇴 전 내용확인
    async checkBeforeWithdrawal(params: BeforeWithdrawalInfo['Req']): BeforeWithdrawalInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.beforeWithdrawal,
            params,
        })
    }

    // my > 사업자정보 및 가맹점정보
    async getBusinessManInfo(): BusinessManInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.businessManInfo,
        })
    }

    // my>가맹점상세조회
    async getFranchiseDetail(params: FranchiseDetail['Req']): NonNullable<FranchiseDetail['Res']> {
        return await axiosInstance.request({
            ...this.apiList.franchiseDetail,
            params,
        })
    }

    // my>사업자정보>가맹점주소/전화번호변경
    async updateFranchiseDetail(params: ChangeFranchiseDetail['Req']): ChangeFranchiseDetail['Res'] {
        return await axiosInstance.request({
            ...this.apiList.changeFranchiseDetail,
            params,
        })
    }

    // my>사업자정보>사업자명변경
    async updateBusinessManName(params: ChangeBusinessManName['Req']): ChangeBusinessManName['Res'] {
        return await axiosInstance.request({
            ...this.apiList.changeBusinessManName,
            params,
        })
    }
}

export default new AuthService()

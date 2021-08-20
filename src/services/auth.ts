import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface BizInfoItem {
    bzno: string
    ltRgyn: YN
}

export interface FranchiseItem {
    mcno: string
    mcNm: string
    psno: string
    pnadd: string
    bpsnoAdd: string
    ddd: string
    exno: string
    tlno: string
}

export interface BusinessManInfoListItem {
    bzno: string
    bzmanNm: string
    mbrNm: null | string
    locaMcYn: YN
    subList: FranchiseItem[]
    selected?: boolean // API에는 없는 추가된 필드
}

export interface BusinessPlaceListItem {
    // 사업자 번호
    bzno: string
    // 사업자 이름
    bzmanNm: string
    // 사업자 등록 여부
    ltRgyn: YN
    // 로카 가맹점 여부
    locaMcYn: YN
}

/**
 * 회원정보관련 API 요청 파라미터
 */
export interface AuthParameters {
    /**
     * @description 로그인 / 카카오 최초 인입자 셀리 가입처리
     */
    loginInfo: {
        // 카카오로 전달 받은 ci
        ciNo: string
        // 카카오로 전달 받은 휴대폰번호
        cellNo?: string
        // 카카오로 전달 받은 이메일
        email?: string
        // 카카오 유저 정보 중 id
        // kkoId: string
        // 약관 동의 항목
        list?: {
            agTag: string
            agDtti?: string
        }[]
    }
    /**
     * @description my>최초로그인시 사업자정보 입력 내용
     */
    bizInfo: {
        list: BizInfoItem[]
    }
    /**
     * @description 추천인코드 입력 요청
     */
    recommenderCode: {
        rfnSn: string
    }
    /**
     * @description 마케팅 동의 업데이트(카카오 친구톡, 마케팅 SMS)
     */
    marketingUpdate: {
        mrktKkofrndAgYn?: YN
        mrktSmsAgYn?: YN
    }
    /**
     * @description 회원 탈퇴전 안내문구 요청
     */
    checkBeforeWithdrawal: {
        mrktYn?: YN
        loadYn?: YN
        bizLoanYn?: YN
        datusYn?: YN
    }
    franchiseDetail: {
        mcno: string
    }
    changeFranchiseDetail: {
        // 가맹점우편번호외주소
        bpsnoAdd?: string
        // 전화지역번호
        ddd?: string
        // 국번
        exno: string
        // 가맹점번호
        mcno?: string
        // 가맹점우편번호주소
        pnadd?: string
        // 우편번호
        psno?: string
        // 전화개별번호
        tlno?: string
    }
    changeBusinessManName: {
        bzno: string
        bzmanNm: string
    }
}

export interface AuthResponse {
    loginInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            // 01: 로그인 완료(메인으로 이동), 02: 회원가입 후 등록한 사업자번호 없음(회원가입 절차 진행)
            rspDc: '01' | '02' | '03' | ''
            // S: 정회원, J: 준회원
            mbrDc: 'S' | 'J' | ''
        } | null
    }
    memberWorkplaceInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            list: [
                {
                    bzno: string
                    bzmanNm: string
                    ltRgyn: YN
                    locaMcYn: YN
                },
            ]
            mbrNm: string
        }
    }
    // FIXME: 변경 예정
    mainInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            dgNm: string
            scrapAgYn: YN | null
            list2: string[] | null
            totalSl: string | null
            list1: string | null
            lmBizYn: YN
            locaCoin: number
            todBilAm: number
        }
    }
    bizInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            // 회원 이름
            mbrNm: string
            // 사업자 리스트
            list: BusinessPlaceListItem[]
        }
    }
    logoutInfo: {
        rc: ResponseCode
        rsMsg: string
        data: null
    }
    recommenderCode: {
        rc: ResponseCode
        rsMsg: string
        data: null | object
    }
    memberInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            mbrNm: string
            kkoId: string
            cellNo: string
            mrktYn: YN
            loanYn: YN
            bizLoanYn: YN
            datusYn: YN
        }
    }
    withdrawal: {
        rc: ResponseCode
        rsMsg: string
        data: null
    }
    beforeWithdrawal: {
        rc: ResponseCode
        rsMsg: string
        data: {
            list: { rsgDesc: string }[]
        }
    }
    businessMainInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            list: BusinessManInfoListItem[]
        }
    }
    franchiseDetail: {
        rc: ResponseCode
        rsMsg: string
        data: {
            mcno: string
            mcNm: string
            psno: string
            pnadd: string
            bpsnoAdd: string
            ddd: string
            exno: string
            tlno: string
        }
    }
    changeBusinessManName: {
        rc: ResponseCode
        rsMsg: string
        data: {
            list: {
                bzno: string
                bzmanNm: string
                ltRgyn: YN
                locaMcYn: YN
            }[]
            mbrNm: string
        }
    }
}

type LoginInfoRes = Promise<AxiosResponse<AuthResponse['loginInfo']>>
type MemberWorkplaceInfoRes = Promise<AxiosResponse<AuthResponse['memberWorkplaceInfo']>>
type MainInfoRes = Promise<AxiosResponse<AuthResponse['mainInfo']>>
type BizInfoRes = Promise<AxiosResponse<AuthResponse['bizInfo']>>
type LogoutInfoRes = Promise<AxiosResponse<AuthResponse['logoutInfo']>>
type RecommenderCodeRes = Promise<AxiosResponse<AuthResponse['recommenderCode']>>
type MemberInfoRes = Promise<AxiosResponse<AuthResponse['memberInfo']>>
type WithdrawalInfoRes = Promise<AxiosResponse<AuthResponse['withdrawal']>>
type BeforeWithdrawalInfoRes = Promise<AxiosResponse<AuthResponse['beforeWithdrawal']>>
type BusinessManInfoRes = Promise<AxiosResponse<AuthResponse['businessMainInfo']>>
type FranchiseDetailRes = Promise<AxiosResponse<AuthResponse['franchiseDetail']>>
type ChangeBusinessManNameRes = Promise<AxiosResponse<AuthResponse['changeBusinessManName']>>

class AuthService {
    // 로그인/카카오최초인입
    private login: API = {
        url: '/API/LGN/SELGNAA001',
        method: 'post',
    }

    // 메인화면 정보
    private mainInfo: API = {
        url: '/API/MAI/SEMAIAA001',
        method: 'post',
    }

    // my>회원사업장정보(최초로그인시 사업자 정보)
    private memberWorkplaceInfo: API = {
        url: '/API/MBR/SEMBRAA002',
        method: 'post',
    }

    // my>최초로그인시 사업자정보 입력 내용
    private bizInfoInput: API = {
        url: '/API/MBR/SEMBRAA004',
        method: 'post',
    }

    // my>회원정보>로그아웃
    private logout: API = {
        url: '/API/MBR/SEMBRBA001',
        method: 'post',
    }

    // my>사업자정보>추천인코드입력
    private recommenderCode: API = {
        url: '/API/MBR/SEMBRAA006',
        method: 'post',
    }

    // my>회원정보요청
    private memberInfo: API = {
        url: '/API/MBR/SEMBRAA001',
        method: 'post',
    }

    // my>회원정보>마케팅동의정보업데이트
    private marketingUpdate: API = {
        url: '/API/MBR/SEMBRAA008',
        method: 'post',
    }

    // 회원탈퇴
    private withdrawal: API = {
        url: '/API/MBR/SEMBRBA002',
        method: 'post',
    }

    // my>회원정보>회원탈퇴전 내용확인
    private beforeWithdrawal: API = {
        url: '/API/MBR/SEMBRBA003',
        method: 'post',
    }

    // my > 사업자정보 및 가맹점 정보
    private businessManInfo: API = {
        url: '/API/MBR/SEMBRAA003',
        method: 'post',
    }

    // my>가맹점상세조회
    private franchiseDetail: API = {
        url: '/API/MBR/SEMBRAA009',
        method: 'post',
    }

    // my>사업자정보>가맹점주소/전화번호변경
    private changeFranchiseDetail: API = {
        url: '/API/MBR/SEMBRAA007',
        method: 'post',
    }

    // my>사업자정보>사업자명변경
    private changeBusinessManName: API = {
        url: '/API/MBR/SEMBRAA005',
        method: 'post',
    }

    // 로그인 카카오 최초 인입
    async getLoginInfo(data: AuthParameters['loginInfo']): LoginInfoRes {
        return await axiosInstance.request({
            ...this.login,
            data,
        })
    }

    // 회원 사업장 정보(최초 로그인 사업자 정보 요청)
    async getMemberWorkplaceInfo(): MemberWorkplaceInfoRes {
        return await axiosInstance.request({
            ...this.memberWorkplaceInfo,
        })
    }

    // 메인화면 정보요청
    async getMainInfo(): MainInfoRes {
        return await axiosInstance.request({
            ...this.mainInfo,
        })
    }

    // my>최초로그인시 사업자정보 입력 요청
    async getBizInfoInput(data: AuthParameters['bizInfo']): BizInfoRes {
        return await axiosInstance.request({
            ...this.bizInfoInput,
            data,
        })
    }

    // my>회원정보>로그아웃
    async getLogoutInfo(): LogoutInfoRes {
        return await axiosInstance.request({
            ...this.logout,
        })
    }

    // my>사업자정보>추천인코드입력
    async inputRecommenderCode(params: AuthParameters['recommenderCode']): RecommenderCodeRes {
        return await axiosInstance.request({
            ...this.recommenderCode,
            params,
        })
    }

    // my>회원정보요청
    async getMemberInfo(): MemberInfoRes {
        return await axiosInstance.request({
            ...this.memberInfo,
        })
    }

    // my>회원정보>마케팅동의정보업데이트
    async setMarketingUpdate(params: AuthParameters['marketingUpdate']) {
        return await axiosInstance.request({
            ...this.marketingUpdate,
            params,
        })
    }

    // my > 회원탈퇴
    async setWithdrawal(): WithdrawalInfoRes {
        return await axiosInstance.request({
            ...this.withdrawal,
        })
    }

    // 탈퇴 전 내용확인
    async checkBeforeWithdrawal(params: AuthParameters['checkBeforeWithdrawal']): BeforeWithdrawalInfoRes {
        return await axiosInstance.request({
            ...this.beforeWithdrawal,
            params,
        })
    }

    // my > 사업자정보 및 가맹점정보
    async getBusinessManInfo(): BusinessManInfoRes {
        return await axiosInstance.request({
            ...this.businessManInfo,
        })
    }

    // my>가맹점상세조회
    async getFranchiseDetail(params: AuthParameters['franchiseDetail']): FranchiseDetailRes {
        return await axiosInstance.request({
            ...this.franchiseDetail,
            params,
        })
    }

    // my>사업자정보>가맹점주소/전화번호변경
    async updateFranchiseDetail(params: AuthParameters['changeFranchiseDetail']) {
        return await axiosInstance.request({
            ...this.changeFranchiseDetail,
            params,
        })
    }

    // my>사업자정보>사업자명변경
    async updateBusinessManName(params: AuthParameters['changeBusinessManName']): ChangeBusinessManNameRes {
        return await axiosInstance.request({
            ...this.changeBusinessManName,
            params,
        })
    }
}

export default new AuthService()

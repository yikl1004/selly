import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface BizInfoItem {
    bzno: string
    ltRgyn: YN
}
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
}

/**
 * TODO: 공통 코드에 대한 정리
 * 1010: 회원가입 불가 대상입니다.
 */
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
            list2: any[] | null
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
            list: {
                // 사업자 번호
                bzno: string
                // 사업자 이름
                bzmanNm: string
                // 사업자 등록 여부
                ltRgyn: YN
                // 로카 가맹점 여부
                locaMcYn: YN
            }[]
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
}

type LoginInfoRes = Promise<AxiosResponse<AuthResponse['loginInfo']>>
type MemberWorkplaceInfoRes = Promise<AxiosResponse<AuthResponse['memberWorkplaceInfo']>>
type MainInfoRes = Promise<AxiosResponse<AuthResponse['mainInfo']>>
type BizInfoRes = Promise<AxiosResponse<AuthResponse['bizInfo']>>
type LogoutInfoRes = Promise<AxiosResponse<AuthResponse['logoutInfo']>>
type RecommenderCodeRes = Promise<AxiosResponse<AuthResponse['recommenderCode']>>

class AuthService {
    // 로그인/카카오최초인입
    private login: API = {
        url: '/API/LGN/SELGNAA001',
        method: 'post',
    }

    // my>회원사업장정보(최초로그인시 사업자 정보)
    private memberWorkplaceInfo: API = {
        url: '/API/MBR/SEMBRAA002',
        method: 'post',
    }

    // 메인화면 정보
    private mainInfo: API = {
        url: '/API/MAI/SEMAIAA001',
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

    // 로그인 카카오 최초 인입
    async getLoginInfo(data: AuthParameters['loginInfo']): LoginInfoRes {
        const { url, method } = this.login

        return await axiosInstance.request({ method, url, data })
    }

    // 회원 사업장 정보(최초 로그인 사업자 정보 요청)
    async getMemberWorkplaceInfo(): MemberWorkplaceInfoRes {
        const { url, method } = this.memberWorkplaceInfo

        return await axiosInstance.request({ method, url })
    }

    // 메인화면 정보요청
    async getMainInfo(): MainInfoRes {
        const { url, method } = this.mainInfo

        return await axiosInstance.request({ method, url })
    }

    // my>최초로그인시 사업자정보 입력 요청
    async getBizInfoInput(data: AuthParameters['bizInfo']): BizInfoRes {
        const { url, method } = this.bizInfoInput

        return await axiosInstance.request({ method, url, data })
    }

    // my>회원정보>로그아웃
    async getLogoutInfo(): LogoutInfoRes {
        const { url, method } = this.logout

        return await axiosInstance.request({ method, url })
    }

    // my>사업자정보>추천인코드입력
    async inputRecommenderCode(params: AuthParameters['recommenderCode']): RecommenderCodeRes {
        const { url, method } = this.recommenderCode

        return await axiosInstance.request({ method, url, params })
    }
}

export default new AuthService()

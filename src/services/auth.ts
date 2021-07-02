import { instance } from '@services/core/http'
import { AxiosResponse } from 'axios'
import { HttpService, SellyServiceResponse } from './core/http'
import { POST, Query, ResponseAdapter } from './core/decorators'
import { SEFINAARVO } from './core/response'

interface API {
    url: string
    method: 'post' | 'get'
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
        kkoId: string
        // 약관 동의 항목
        list?: {
            agTag: string
            agDtti: string
        }[]
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
}

type LoginInfoRes = Promise<AxiosResponse<AuthResponse['loginInfo']>>
type MemberWorkplaceInfoRes = Promise<AxiosResponse<AuthResponse['memberWorkplaceInfo']>>
type MainInfoRes = Promise<AxiosResponse<AuthResponse['mainInfo']>>

class AuthService extends HttpService {
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

    // 로그인 카카오 최초 인입
    async getLoginInfo(params: AuthParameters['loginInfo']): LoginInfoRes {
        const { url, method } = this.login

        return await instance.request({ method, url, params })
    }

    // 회원 사업장 정보(최초 로그인 사업자 정보 요청)
    async getMemberWorkplaceInfo(): MemberWorkplaceInfoRes {
        const { url, method } = this.memberWorkplaceInfo

        return await instance.request({ method, url })
    }

    // 메인화면 정보요청
    async getMainInfo(): MainInfoRes {
        const { url, method } = this.memberWorkplaceInfo

        return await instance.request({ method, url })
    }
}

export default new AuthService()

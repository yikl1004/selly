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
            rspDc: '01' | '02' | ''
            // S: 정회원, J: 준회원
            mbrDc: 'S' | 'J' | ''
        } | null
    }
}

type LoginInfoRes = Promise<AxiosResponse<AuthResponse['loginInfo']>>

class AuthService extends HttpService {
    private login: API = {
        url: '/API/LGN/SELGNAA001', // [Post] 로그인/카카오최초인입
        method: 'post',
    }

    async getLoginInfo(params: AuthParameters['loginInfo']): LoginInfoRes {
        const { url, method } = this.login
        console.log({ method, url, params })
        return await instance.request({ method, url, params })
    }
}

export default new AuthService()

# Sample code

```ts
import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface CommonParameters {
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
}

export interface CommonResponse {
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
}

type LoginInfoRes = Promise<AxiosResponse<CommonResponse['loginInfo']>>

class CommonService {
    // 로그인/카카오최초인입
    private login: API = {
        url: '/API/LGN/SELGNAA001',
        method: 'post',
    }

    // 로그인 카카오 최초 인입
    async getLoginInfo(data: CommonParameters['loginInfo']): LoginInfoRes {
        const { url, method } = this.login

        return await axiosInstance.request({ method, url, data })
    }
}

export default new CommonService()
```
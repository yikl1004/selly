import { instance } from '@services/core/http'
import { AxiosResponse } from 'axios'
import { HttpService, SellyServiceResponse } from './core/http'
import { POST, Query, ResponseAdapter } from './core/decorators'
import { SEFINAARVO } from './core/response'

interface API {
    url: string
    method: 'post' | 'get'
}
interface Parameters {
    // FIXME: 자세한 설명이 아직 나오지 않았음 - 2021-06-04
    loginInfo: {
        cellNo?: string
        ciNo: string
        email?: string
    }
}

interface Response {
    loginInfo: {
        data: {
            mbrBzRegYn: 'Y'
        }
        rc: '0000' | '9999'
        rsMsg: null | string
    }
}

type LoginInfoRes = Promise<AxiosResponse<Response['loginInfo']>>

class AuthService extends HttpService {
    private loginInfo: API = {
        url: '/API/LGN/SELGNAA001', // [Post] 로그인/카카오최초인입
        method: 'post',
    }

    async getLoginInfo(params: Parameters['loginInfo']): LoginInfoRes {
        const { url, method } = this.loginInfo
        return await instance.request({ method, url, params })
    }
}

export default new AuthService()

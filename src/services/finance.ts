import { instance } from '@services/core/http'
import { AxiosResponse } from 'axios'
import { HttpService, SellyServiceResponse } from './core/http'
import { POST, Query, ResponseAdapter } from './core/decorators'
import { SEFINAARVO } from './core/response'

interface Parameters {
    mainInfo: {
        aplPhc?: string // FIXME: 미정
        crno?: string // 카드번호
        pcDv?: string // FIXME: 미정
        rrno?: string // 주민번호
    }
    policy: {
        aplPhc?: string // FIXME: 미정
        crno?: string // 카드번호
        pcDv?: string // FIXME: 미정
        rrno?: string // 주민번호
    }
    agree: {
        aplPhc?: string // FIXME: 미정
        crno?: string // 카드번호
        pcDv?: string // FIXME: 미정
        rrno?: string // 주민번호
    }
    certPhone: {
        aplPhc?: string // FIXME: 미정
        crno?: string // 카드번호
        pcDv?: string // FIXME: 미정
        rrno?: string // 주민번호
    }
    guide: {
        aplPhc?: string // FIXME: 미정
        crno?: string // 카드번호
        pcDv?: string // FIXME: 미정
        rrno?: string // 주민번호
    }
}

interface Response {
    mainInfo: {}
    policy: {}
    agree: {}
    certPhone: {}
    guide: {}
}

type MainInfoRes = Promise<AxiosResponse<Response['mainInfo']>>
type PolicyRes = Promise<AxiosResponse<Response['policy']>>
type AgreeRes = Promise<AxiosResponse<Response['agree']>>
type CertPhoneRes = Promise<AxiosResponse<Response['certPhone']>>
type GuideRes = Promise<AxiosResponse<Response['guide']>>

class FinacialService extends HttpService {
    private mainInfo: API = {
        url: '/API/FIN/SEFINAA001', // [Post] 메인화면 - 대출 정보 조회
        method: 'post',
    }
    private policy: API = {
        url: '/API/FIN/SEFINAB001', // [Post] 대출신청 - 약관조회
        method: 'post',
    }
    private agree: API = {
        url: '/API/FIN/SEFINAB002', // [Post] 대출신청 - 약관동의
        method: 'post',
    }
    private certPhone: API = {
        url: '/API/FIN/SEFINAB003', // [Post] 대출신청 - 휴대폰인증
        method: 'post',
    }
    private guide: API = {
        url: '/API/FIN/SEFINBA001', // [Post] 대출 신청 - 안내 화면
        method: 'post',
    }

    async getMainInfo(params?: Parameters['mainInfo']): MainInfoRes {
        const { url, method } = this.mainInfo
        return await instance.request({ method, url, params })
    }

    async getPolicy(params?: Parameters['policy']): PolicyRes {
        const { url, method } = this.policy
        return await instance.request({ method, url, params })
    }

    async getAgree(params?: Parameters['agree']): AgreeRes {
        const { url, method } = this.agree
        return await instance.request({ method, url, params })
    }

    async getCertPhone(params?: Parameters['certPhone']): CertPhoneRes {
        const { url, method } = this.certPhone
        return await instance.request({ method, url, params })
    }

    async getGuide(params?: Parameters['guide']): GuideRes {
        const { url, method } = this.guide
        return await instance.request({ method, url, params })
    }
}

export default new FinacialService()

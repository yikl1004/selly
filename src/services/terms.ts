import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface TermsParameters {
    /** 이용약관 상세 조회 */
    termsDetail: {
        // 이용약관 일련번호
        prvSeq: string
    }
}

export interface TermsResponse {
    /** 이용약관 상세 조회 결과 */
    termsDetail: DefaultResponse<{}>
}

// type LoginInfoRes = Promise<AxiosResponse<CommonResponse['loginInfo']>>

class TermsService {
    /** 이용약관 목록 */
    private termsList: API = {
        url: '/API/ETC/SEETCCA001',
        method: 'post',
    }

    /** 이용약관 상세 */
    private termsDetail: API = {
        url: '/API/ETC/SEETCCA002',
        method: 'post',
    }

    async getTermsDetail(params: TermsParameters['termsDetail']) {
        return await axiosInstance.request({
            ...this.termsDetail,
            params,
        })
    }
}

export default new TermsService()

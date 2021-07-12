import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface CommonParameters {
    /**
     * @description 세션연장
     */
    loginExtend: void
}

export interface CommonResponse {
    loginExtend: {
        rc: ResponseCode
        rsMsg: string
        data: null | {}
    }
}

type LoginExtendRes = Promise<AxiosResponse<CommonResponse['loginExtend']>>

class CommonService {
    // 세션연장
    private loginExtend: API = {
        url: '/API/CMN/SECMNFA001',
        method: 'post',
    }

    // 세션연장
    async getLoginExtend(): LoginExtendRes {
        const { url, method } = this.loginExtend

        return await axiosInstance.request({ method, url })
    }
}

export default new CommonService()

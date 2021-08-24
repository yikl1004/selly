import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface MainResponse {
    // FIXME: 계속 업데이트 중
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
}

type MainInfoRes = Promise<AxiosResponse<MainResponse['mainInfo']>>

class MainService {
    // 메인화면 정보
    private mainInfo: API = {
        url: '/API/MAI/SEMAIAA001',
        method: 'post',
    }

    // 메인화면 정보요청
    async getMainInfo(): MainInfoRes {
        return await axiosInstance.request({
            ...this.mainInfo,
        })
    }
}

export default new MainService()

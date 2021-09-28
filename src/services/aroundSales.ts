import { APIList, axiosInstance } from '@services/http/index'
import { createApi } from '@services/http'
import { APINames, InquiryDistrict } from '@services/aroundSales.interface'

class AroundSalesService {
    private apiList: APIList<keyof APINames> = {
        /** 행정동 지역 정보 조회 */
        inquiryDistrict: createApi('/API/MRT/SEMRKBZ001'),
    }

    async getInquiryDistrict(params: InquiryDistrict['Req']): InquiryDistrict['Res'] {
        return await axiosInstance.request({
            ...this.apiList.inquiryDistrict,
            params,
        })
    }
}

export default new AroundSalesService()

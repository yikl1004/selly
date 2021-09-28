import { axiosInstance, createApi } from '@services/http'
import type { APIList } from '@services/http'
import { APINames, CreateCouponDefaultInfo, FranchiseInfo, FranchiseInfoSave, PossibleApplyUser } from '@services/newMarketing.interface'

class MarketingService {
    private apiList: APIList<keyof APINames> = {
        /** 마케팅 신청 가능 여부 */
        possibleApplyUser: createApi('/API/MRKT/SEMRKTA001'),
        /** 매장정보 조회 */
        franchiseInfo: createApi('/API/MRKT/SEMRKTA002'),
        /** 매장 정보 저장 */
        franchiseInfoSave: createApi('/API/MRKT/SEMRKTA003'),
        /** 쿠폰 기본 정보 조회 */
        createCouponDefaultInfo: createApi('/API/MRKT/SEMRKTA004'),
        /** 5. 예상결과 조회 */
        /** 6. 추천인 코드 검증 */
        /** 7. step2 저장 */
        /** 8. 저장정보 조회 */
        /** 9. 신청 */
    }

    /** 마케팅 신청 가능 여부 */
    async getPossibleApply(params?: PossibleApplyUser['Req']): PossibleApplyUser['Res'] {
        return await axiosInstance.request({
            ...this.apiList.possibleApplyUser,
        })
    }

    /** 매장정보 조회 */
    async getFranchiseInfo(params?: FranchiseInfo['Req']): FranchiseInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.franchiseInfo,
        })
    }

    /** 매장 정보 저장 */
    async setFranchiseInfoSave(params: FranchiseInfoSave['Req']): FranchiseInfoSave['Res'] {
        return await axiosInstance.request({
            ...this.apiList.franchiseInfoSave,
            params,
        })
    }

    /** 쿠폰 기본 정보 조회 */
    async getCreateCouponDefaultInfo(params?: CreateCouponDefaultInfo['Req']): CreateCouponDefaultInfo['Res'] {
        return await axiosInstance.request({
            ...this.apiList.createCouponDefaultInfo,
        })
    }
}

export default new MarketingService()

import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface MarketingParameters {
    /**
     * @description 마케팅 신청 가능 가맹점 유효성 검사
     */
    validatePossibleApplyFranchiseList: {
        // 가맹점 번호
        mcno: string
    }
}

export interface MarketingResponse {
    /** 마케팅 신청 가능 가맹점 목록 */
    possibleApplyFranchiseList: DefaultResponse<{
        list: {
            // 업종명
            btNm: string
            // 사업자번호
            bzno: string
            // 가맹점 주소
            mcAdd: string
            // 가맹점 명
            mcNm: string
            // 가맹점 전화번호
            mcTlno: string
            // 가맹점 번호
            mcno: string
            // FIXME: 유해 업종 여부 추가 예정
        }[]
    }>
    /** 마케팅 신청 가능 가맹점 유효성 검사 */
    validatePossibleApplyFranchiseList: DefaultResponse<{
        // 업무 응담 코드
        rspDc:
            | '3101' // 유해업종
            | '3102' // 접속당일 가맹점 정보 변경
            | '3103' // 위도/경도 정보 없음
        // 업무 응답 메세지
        rspDcMsg: string
    }>
}

type LoginInfoRes = Promise<AxiosResponse<MarketingResponse['possibleApplyFranchiseList']>>

class MarketingService {
    // 마케팅 신청 가능 가맹점 목록
    private possibleApplyFranchiseList: API = {
        url: '/API/MRT/SEMRKAA001',
        method: 'post',
    }

    // 마케팅 신청 가능 가맹점 유효성 검사
    private validatePossibleApplyFranchiseList: API = {
        url: '/API/MRT/SEMRKAA002',
        method: 'post',
    }

    async getPossibleApplyFranchiseList() {
        return await axiosInstance.request({
            ...this.possibleApplyFranchiseList,
        })
    }

    async getValidatePossibleApplyFranchiseList(params: MarketingParameters['validatePossibleApplyFranchiseList']) {
        return await axiosInstance.request({
            ...this.validatePossibleApplyFranchiseList,
            params,
        })
    }
}

export default new MarketingService()

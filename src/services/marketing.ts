import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

type MarketingResponseCode =
    | '0000' // 정상
    | '3101' // 유해업종
    | '3102' // 접속당일 가맹점 정보 변경
    | '3103' // 위도/경도 정보 없음
    | '9999' // 시스템 에러

export interface MarketingParameters {
    /**
     * @description 마케팅 신청 가능 가맹점 유효성 검사
     */
    validatePossibleApplyFranchiseList: {
        // 가맹점 번호
        mcno: string
    }
    /**
     * @description 마케팅 행사대상자 수
     */
    marketingTarget: {
        mcno: string
        bzno: string
    }
    /** 전년 동기간 매출 평균 */
    lastYearSalesAverage: {
        // 가맹점 번호
        mcno: string
        // 행사 시작일자
        evSdt: string
        // 행사 종료일자
        evEdt: string
    }
}

export interface MarketingResponse {
    /** 마케팅 신청 가능 가맹점 목록 */
    possibleApplyFranchiseList: DefaultResponse<{
        list: {
            // 우편번호 외 주수
            bpsnoAdd: string
            // 업종명
            btNm: string
            // 사업자번호
            bzno: string
            // 가맹점 명
            mcNm: string
            // 가맹점 전화번호
            mcTlno: string
            // 가맹점 번호
            mcno: string
            // 마케팅 제외 업종 여부(Y이면 라디오버튼 비활성화)
            mrktXBtYn: YN
            // 우편번호 주소
            pnadd: string
            // 우편번호
            mcPsno: string
        }[]
    }>
    /** 마케팅 신청 가능 가맹점 유효성 검사 */
    validatePossibleApplyFranchiseList: DefaultResponse<{
        // 업무 응담 코드
        rspDc: MarketingResponseCode
        // 업무 응답 메세지
        rspDcMsg: string
    }>
    /** 마케팅 행사대상자 */
    marketingTarget: DefaultResponse<{
        // 신규 행사 대상자 수
        newEvOjpT: string
        // 신규 PUSH 대상자 수
        newPushOjpT: string
        // 기존 행사 대상자 수
        odEvOjpT: string
        // 기존 PUSH 대상자 수
        odPushOjpT: string
    }>
    /** 전년 동기간 매출 평균 */
    lastYearSalesAverage: DefaultResponse<{
        // 매출 총액
        slTam: string
        // 매출 건수
        slCt: string
        // 매출 평균
        slAv: string
    }>
}

type PossibleApplyFranchiseListRes = Promise<AxiosResponse<MarketingResponse['possibleApplyFranchiseList']>>
type MarketingTargetRes = Promise<AxiosResponse<MarketingResponse['marketingTarget']>>
type LastYearSalesAverageRes = Promise<AxiosResponse<MarketingResponse['lastYearSalesAverage']>>

class MarketingService {
    // 마케팅 신청 가능 회원 여부
    private possibleApplyUser: API = {
        url: '/API/MRT/SEMRKAA008',
        method: 'post',
    }

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

    // 마케팅 행사대상자 조회
    private marketingTarget: API = {
        url: '/API/MRT/SEMRKAA003',
        method: 'post',
    }

    /** 전년 동기간 매출 평균 */
    private lastYearSalesAverage: API = {
        url: '/API/MRT/SEMRKAA004',
        method: 'post',
    }

    // 마케팅 신청 추천인 코드 확인
    private checkRecommenderCode: API = {
        url: '/API/MRT/SEMRKAA005',
        method: 'post',
    }

    async getPossibleApplyUser() {
        return await axiosInstance.request({
            ...this.possibleApplyUser,
        })
    }

    async getPossibleApplyFranchiseList(): PossibleApplyFranchiseListRes {
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

    async getMarketingTarget(params: MarketingParameters['marketingTarget']): MarketingTargetRes {
        // TODO: 현재 시스템 에러, 담당자(김아름 책임) 확인 중
        return await axiosInstance.request({
            ...this.marketingTarget,
            params,
        })
    }

    async getLastYearSalesAverage(params: MarketingParameters['lastYearSalesAverage']): LastYearSalesAverageRes {
        return await axiosInstance.request({
            ...this.lastYearSalesAverage,
            params,
        })
    }
}

export default new MarketingService()

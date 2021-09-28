import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export type MarketingStatus =
    | '01' // 접수완료
    | '02' // 준비중
    | '03' // 진행예정
    | '04' // 진행중
    | '05' // 종료
    | '08' // 재검토 필요
    | '09' // 취소

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
    /** 추천인 코드 확인 */
    checkRecommenderCode: {
        // 추천인 코드
        rfeC: string
    }
    /** 마케팅 신청 유효성 검사 */
    applyValidateCheck: {
        // 가맹점 번호
        mcno: string
        // 추천인 입력 여부
        refInYn: string
        // 추천인 코드
        refC: string
        // 집계 구분별 신청 정보
        list: {
            // 집계 구분코드
            ggDc: '1' | '2'
            // 행사 시작일자
            evSdt: string
            // 행사 종료일자
            evEdt: string
        }[]
    }
    /** 최종 신청 */
    apply: {
        mcno: string
        refInYn: YN
        refC: string
        list: {
            ggDc: '1' | '2'
            evSdt: string
            evEdt: string
            evBefSlAv: string
            bnfDcR: string
            trgOjCstt: string
        }[]
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
    /** 추천인 코드 확인 */
    checkRecommenderCode: DefaultResponse<{
        // 업무 응답 코드
        rspDc: string
        // 업무 응답 메세지
        rspDcMsg: string
    }>
    /** 마케팅 신청 유효성 검사 */
    applyValidateCheck: DefaultResponse<{
        rspDc:
            | '3101' // 유해업종
            | '3102' // 접속 당일 가맹점 정보 변경
            | '3203' // 추천인 미입력
            | '3202' // 추천인 코드 불일치
            | '3301' // 첫고객 행사기간 유효성 탈락
            | '3311' // 첫고객 유쇼데 행사기간 중복
            | '3321' // 첫고객 셀리 중복(이미 진행중인 행사기간과 중복)
            | '3302' // 단골 행사기간 유효성 탈락
            | '3312' // 단골 유쇼데 행사기간 중복
            | '3322' // 단골 셀리 중복(이미 진행중인 행사기간과 중복)
            | '0000'
        rspDcMsg: string
    }>
    /** 최종 신청 결과 */
    applyResult: DefaultResponse<{
        rspDc: '0000'
        rspDcMsg: '정상처리 되었습니다.'
    }>
}

// response data
type PossibleApplyFranchiseListRes = Promise<AxiosResponse<MarketingResponse['possibleApplyFranchiseList']>>
type MarketingTargetRes = Promise<AxiosResponse<MarketingResponse['marketingTarget']>>
type LastYearSalesAverageRes = Promise<AxiosResponse<MarketingResponse['lastYearSalesAverage']>>
type CheckRecommenderCodeRes = Promise<AxiosResponse<MarketingResponse['checkRecommenderCode']>>
type ApplyValidateCheckRes = Promise<AxiosResponse<MarketingResponse['applyValidateCheck']>>
type ApplyResultRes = Promise<AxiosResponse<MarketingResponse['applyResult']>>

// request parameter
type ValidatePossibleApplyFranchiseList = MarketingParameters['validatePossibleApplyFranchiseList']
type MarketingTarget = MarketingParameters['marketingTarget']
type LastYearSalesAverage = MarketingParameters['lastYearSalesAverage']
type CheckRecommenderCode = MarketingParameters['checkRecommenderCode']
type ApplyValidateCheck = MarketingParameters['applyValidateCheck']
type LastApplyParameter = MarketingParameters['apply']

const createApi = (url: string, method?: 'get' | 'post'): API => ({
    url,
    method: method || 'post',
})

type APINames =
    | 'possibleApplyUser' // * 마케팅 신청 가능 회원 여부
    | 'possibleApplyFranchiseList' //마케팅 신청 가능 가맹점 목록
    | 'validatePossibleApplyFranchiseList' //마케팅 신청 가능 가맹점 유효성 검사
    | 'marketingTarget' //마케팅 행사대상자 조회
    | 'lastYearSalesAverage' //전년 동기간 매출 평균
    | 'checkRecommenderCode' //마케팅 신청 추천인 코드 확인
    | 'applyValidateCheck' // 마케팅 신청 유효성 검사
    | 'apply' // 마케팅 신청
type APIList = Record<APINames, API>

class MarketingService {
    private apiList: APIList = {
        possibleApplyUser: createApi('/API/MRT/SEMRKAA008'),
        possibleApplyFranchiseList: createApi('/API/MRT/SEMRKAA001'),
        validatePossibleApplyFranchiseList: createApi('/API/MRT/SEMRKAA002'),
        marketingTarget: createApi('/API/MRT/SEMRKAA003'),
        lastYearSalesAverage: createApi('/API/MRT/SEMRKAA004'),
        checkRecommenderCode: createApi('/API/MRT/SEMRKAA005'),
        applyValidateCheck: createApi('/API/MRT/SEMRKAA006'),
        apply: createApi('/API/MRT/SEMRKAA007'),
    }

    /** 마케팅 신청 가능 회원 여부 */
    async getPossibleApplyUser() {
        return await axiosInstance.request({
            ...this.apiList.possibleApplyUser,
        })
    }

    /** 마케팅 신청 가능 가맹점 목록 */
    async getPossibleApplyFranchiseList(): PossibleApplyFranchiseListRes {
        return await axiosInstance.request({
            ...this.apiList.possibleApplyFranchiseList,
        })
    }

    /** 마케팅 신청 가능 가맹점 유효성 검사 */
    async getValidatePossibleApplyFranchiseList(params: ValidatePossibleApplyFranchiseList) {
        return await axiosInstance.request({
            ...this.apiList.validatePossibleApplyFranchiseList,
            params,
        })
    }

    /** 마케팅 행사대상자 조회 */
    async getMarketingTarget(params: MarketingTarget): MarketingTargetRes {
        // TODO: 현재 시스템 에러, 담당자(김아름 책임) 확인 중
        return await axiosInstance.request({
            ...this.apiList.marketingTarget,
            params,
        })
    }

    /** 전년 동기간 매출 평균 */
    async getLastYearSalesAverage(params: LastYearSalesAverage): LastYearSalesAverageRes {
        return await axiosInstance.request({
            ...this.apiList.lastYearSalesAverage,
            params,
        })
    }

    /** 마케팅 신청 추천인 코드 확인 */
    async getCheckRecommenderCode(params: CheckRecommenderCode): CheckRecommenderCodeRes {
        return await axiosInstance.request({
            ...this.apiList.checkRecommenderCode,
            params,
        })
    }

    /** 마케팅 신청 유효성 검사 */
    async applyValidateCheck(params: ApplyValidateCheck): ApplyValidateCheckRes {
        return await axiosInstance.request({
            ...this.apiList.applyValidateCheck,
            data: params,
        })
    }

    /** 최종 신청 */
    async apply(params: LastApplyParameter): ApplyResultRes {
        return await axiosInstance.request({
            ...this.apiList.apply,
            data: params,
        })
    }
}

export default new MarketingService()

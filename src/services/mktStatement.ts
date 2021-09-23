import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'
import type { MarketingStatus } from '@services/marketing'

export interface MktStatementParameters {
    /** 마케팅 신청 내역 목록 */
    statementList?: {
        // 가맹점 번호
        mcno?: string
        // 페이지 번호
        pageNo?: string
    }
    /** 마케팅 신청내역 상세 - 마케팅 진행 전 */
    beforeApply: {
        // 마케팅 신청 번호
        mrktCtsSeq: string
    }
    /** 마케팅 신청내역 상세 - 마케팅 진행 중 */
    applying: {
        // 마케팅 신청 번호
        mrktCtsSeq: string
    }
    /** 마케팅 신청내역 상세 - 마케팅 종료 */
    endApply: {
        // 마케팅 신청 번호
        mrktCtsSeq: string
    }
}

export interface MktStatementResponse {
    appliedFranchiseList: DefaultResponse<{
        list: {
            // 가맹점 명
            mcNm: string
            // 가맹점 번호
            mcno: string
        }[]
    }>
    statementList: DefaultResponse<{
        list: {
            // 할인율
            dcR: '5' | '10' | '15'
            // 행사시작일자
            evEdt: string
            // 행사종료일자
            evSdt: string
            // 집계 구분 명
            ggDNm: string
            // 집계 구분 코드
            ggDc: '1' | '2'
            // 가맹점 명
            mcNm: string
            // 마케팅 신청 일자
            mrktAplDt: string
            // 마케팅 혜택 내용
            mrktBnfCn: string
            // 마케팅 신청 일련 번호
            mrktCtsSeq: string
            // 마케팅 상태 코드
            mrktStc: MarketingStatus
            // 마케팅 상태 코드 명
            mrktStcNm: string
        }[]
        moreYn: YN
        pageNo: string
    }>
    beforeApply: DefaultResponse<{
        // 혜택 할인율
        bnfDcR: string
        // 마케팅 일련번호
        mrktCtsSeq: string
        // 가맹점 번호
        mcno: string
        // 가맹점 명
        mcNm: string
        // 우편번호 주소
        pnadd: string
        // 우편번호 외 주소
        bpsnoAdd: string
        // 가맹점 전화번호
        mcTlno: string
        // 마케팅 혜택 내용
        mrktBnfCn: string
        // 집계구분 코드
        ggDc: '1' | '2'
        // 집계 구분 명
        ggDNm: string
        // 목표 대상 고객수
        trgOjCstt: string
        // 행사 시작일자
        evSdt: string
        // 행사 종료일자
        evEdt: string
        // 마케팅 상태 코드
        mrktStc: MarketingStatus
        // 상태명(마케팅 상태 코드에 따른)
        mrktStcNm: string
        // 마케팅 상태 메세지 (mrktStc가 08일 경우 노출)
        mrktStMsg: string
        // 추천인 코드
        refC: string
        // 행사전 매출 평균
        evBefSlAv: string
    }>
    applying: DefaultResponse<{}>
    endApply: DefaultResponse<{}>
}

type AppliedFranchiseListRes = Promise<AxiosResponse<MktStatementResponse['appliedFranchiseList']>>
type StatementListRes = Promise<AxiosResponse<MktStatementResponse['statementList']>>
type BeforeApplyRes = Promise<AxiosResponse<MktStatementResponse['beforeApply']>>
type ApplyingRes = Promise<AxiosResponse<MktStatementResponse['applying']>>
type EndApplyRes = Promise<AxiosResponse<MktStatementResponse['endApply']>>

const createApi = (url: string, method?: 'get' | 'post'): API => ({
    url,
    method: method || 'post',
})

class MktStatementService {
    // 마케팅 신청 가맹점 목록
    private appliedFranchiseList: API = createApi('/API/MRT/SEMRKAB001')

    async getAppliedFranchiseList(): AppliedFranchiseListRes {
        return await axiosInstance.request({
            ...this.appliedFranchiseList,
        })
    }

    // 마케팅 신청내역 목록
    private statementList: API = createApi('/API/MRT/SEMRKAB002')

    async getStatementList(params: MktStatementParameters['statementList']): StatementListRes {
        return await axiosInstance.request({
            ...this.statementList,
            params,
        })
    }

    // 마케팅 신청내역 상세 - 마케팅 진행 전(01, 02, 03, 08)
    private beforeApply: API = createApi('/API/MRT/SEMRKAB004')

    async getBeforeApply(params: MktStatementParameters['beforeApply']): BeforeApplyRes {
        return await axiosInstance.request({
            ...this.beforeApply,
            params,
        })
    }

    // 마케팅 신청내역 상세 - 마케팅 진행 중 (04)
    private applying: API = createApi('/API/MRT/SEMRKAB005')

    async getApplying(params: MktStatementParameters['applying']): ApplyingRes {
        return await axiosInstance.request({
            ...this.applying,
            params,
        })
    }

    // 마케팅 신청내역 상세 - 마케팅 종료(05)
    private endApply: API = createApi('/API/MRT/SEMRKAB006')

    async getEndApply(params: MktStatementParameters['endApply']): EndApplyRes {
        return await axiosInstance.request({
            ...this.applying,
            params,
        })
    }
}

export default new MktStatementService()

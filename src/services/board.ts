import { axiosInstance } from '@services/http'
import { AxiosResponse } from 'axios'

export interface BoardParameters {
    /** @description 공지사항 목록 */
    noticeList: {
        // 페이지 번호
        pageNo: string
    }

    /** @description 공지사항 상세 */
    noticeDetail: {
        // 공지사항 일련번호
        anSeq: string
    }

    /** @description FAQ 조회 */
    faqList: {
        // 페이지 번호
        pageNo: string
        // 카테고리 구분 코드
        faqCtgDc?: string
    }

    /** @description FAQ카테고리 조회 */
    faqCategory: {}

    /** @description 이용약관 목록 */
    policyList: {
        // 페이지 번호
        pageNo: string
        // 그룹코드
        comGrpC: string
    }

    /** @description 이용약관 상세 */
    policyDetail: {
        prvSeq: string
    }
}

export interface BoardResponse {
    noticeList: DefaultResponse<{
        list: {
            // 게시물 일련번호
            anSeq: string
            // 제목
            anTitNm: string
            // 주요공지 여부
            mnAnYn: string
            // 최초생성 일시
            fstCrtDtti: string
        }[]
        // 더보기 여부
        moreYn: YN
        // 총 게시물 갯수
        totalCnt: number
    }>
    noticeDetail: DefaultResponse<{
        anCn: string
        anTitNm: string
        fstCrtDtti: number | string
    }>
    faqList: DefaultResponse<{
        // FAQ 목록
        list: {
            // 카테고리 구분 코드
            faqCtgDc: string
            // 카테고리 명
            faqCtgNm: string
            // 제목
            faqTitNm: string
            // 내용
            faqCnV: string
        }[]
        moreYn: YN
        totalCnt: number
    }>
    faqCategory: DefaultResponse<{
        // FAQ 카테고리 목록
        list: {
            // 카테고리 구분 코드
            faqCtgDc: string
            // 카테고리명
            faqCtgNm: string
        }[]
    }>
    policyList: DefaultResponse<{
        // 이용약관 목록
        list: {
            // 일련번호
            prvSeq: string
            // 제목
            prvTitNm: string
        }[]
        // 더보기 여부
        moreYn: YN
        // 총 갯수
        totalCnt: number
    }>
    policyDetail: DefaultResponse<{
        prvCn: string
        prvTitNm: string
    }>
}

type NoticeListRes = Promise<AxiosResponse<BoardResponse['noticeList']>>
type NoticeDetailRes = Promise<AxiosResponse<BoardResponse['noticeDetail']>>
type FaqListRes = Promise<AxiosResponse<BoardResponse['faqList']>>
type FaqCategoryRes = Promise<AxiosResponse<BoardResponse['faqCategory']>>
type PolicyListRes = Promise<AxiosResponse<BoardResponse['policyList']>>
type PolicyDetailRes = Promise<AxiosResponse<BoardResponse['policyDetail']>>

class BoardService {
    // 공지사항 목록
    private noticeList: API = {
        url: '/API/ETC/SEETCAA001',
        method: 'post',
    }

    // 공지사항 상세
    private noticeDetail: API = {
        url: '/API/ETC/SEETCAA002',
        method: 'post',
    }

    // FAQ 조회
    private faqList: API = {
        url: '/API/ETC/SEETCBA001',
        method: 'post',
    }

    // FAQ카테고리 조회
    private faqCategory: API = {
        url: '/API/ETC/SEETCBA002',
        method: 'post',
    }

    // 이용약관 목록
    private policyList: API = {
        url: '/API/ETC/SEETCCA001',
        method: 'post',
    }

    // 이용약관 상세
    private policyDetail: API = {
        url: '/API/ETC/SEETCCA002',
        method: 'post',
    }

    // 공지사항 목록
    async getNoticeList(params: BoardParameters['noticeList']): NoticeListRes {
        return await axiosInstance.request({ ...this.noticeList, params })
    }

    // 공지사항 상세
    async getNoticeDetail(params: BoardParameters['noticeDetail']): NoticeDetailRes {
        return await axiosInstance.request({ ...this.noticeDetail, params })
    }

    // FAQ 조회
    async getfaqList(params: BoardParameters['faqList']): FaqListRes {
        return await axiosInstance.request({ ...this.faqList, params })
    }

    // FAQ카테고리 조회
    async getFaqCategory(params?: BoardParameters['faqCategory']): FaqCategoryRes {
        return await axiosInstance.request({ ...this.faqCategory, params })
    }

    // 이용약관 목록
    async getPolicyList(params: BoardParameters['policyList']): PolicyListRes {
        return await axiosInstance.request({ ...this.policyList, params })
    }

    // 이용약관 상세
    async getPolicyDetail(params: BoardParameters['policyDetail']): PolicyDetailRes {
        return await axiosInstance.request({ ...this.policyDetail, params })
    }
}

export default new BoardService()

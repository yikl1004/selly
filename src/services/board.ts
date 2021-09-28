import { APIList, axiosInstance, createApi } from '@services/http'
import {
    BoardAPIList,
    FaqCategory,
    FaqList,
    NoticeDetail,
    NoticeList,
    PolicyDetail,
    PolicyDetailDirect,
    PolicyList,
} from './board.interface'

class BoardService {
    private apiList: APIList<keyof BoardAPIList> = {
        // 공지사항 목록
        noticeList: createApi('/API/ETC/SEETCAA001'),
        // 공지사항 상세
        noticeDetail: createApi('/API/ETC/SEETCAA002'),
        // FAQ 조회
        faqList: createApi('/API/ETC/SEETCBA001'),
        // FAQ카테고리 조회
        faqCategory: createApi('/API/ETC/SEETCBA002'),
        // 이용약관 목록
        policyList: createApi('/API/ETC/SEETCCA001'),
        // 이용약관 상세
        policyDetail: createApi('/API/ETC/SEETCCA002'),
        // 이용약관 상세 - 직접 호출
        policyDetailDirect: createApi('/API/ETC/SEETCCA003'),
    }

    // 공지사항 목록
    async getNoticeList(params: NoticeList['Req']): NoticeList['Res'] {
        return await axiosInstance.request({ ...this.apiList.noticeList, params })
    }

    // 공지사항 상세
    async getNoticeDetail(params: NoticeDetail['Req']): NoticeDetail['Res'] {
        return await axiosInstance.request({ ...this.apiList.noticeDetail, params })
    }

    // FAQ 조회
    async getfaqList(params: FaqList['Req']): FaqList['Res'] {
        return await axiosInstance.request({ ...this.apiList.faqList, params })
    }

    // FAQ카테고리 조회
    async getFaqCategory(params?: FaqCategory['Req']): FaqCategory['Res'] {
        return await axiosInstance.request({ ...this.apiList.faqCategory, params })
    }

    // 이용약관 목록
    async getPolicyList(params: PolicyList['Req']): PolicyList['Res'] {
        return await axiosInstance.request({ ...this.apiList.policyList, params })
    }

    // 이용약관 상세
    async getPolicyDetail(params: PolicyDetail['Req']): PolicyDetail['Res'] {
        return await axiosInstance.request({ ...this.apiList.policyDetail, params })
    }

    // 이용약관 상세 - 직접 호출
    async getPolicyDetailDirect(params: PolicyDetailDirect['Req']): PolicyDetailDirect['Res'] {
        return await axiosInstance.request({ ...this.apiList.policyDetailDirect, params })
    }
}

export default new BoardService()

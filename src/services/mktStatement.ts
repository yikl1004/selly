import { APIList, axiosInstance, createApi } from '@services/http'
import { AxiosResponse } from 'axios'
import type { APINames, ApplyHistory, ApplyInitialHistory } from '@services/mktStatement.interface'

class MktStatementService {
    private apiList: APIList<keyof APINames> = {
        /** 신청내역 (초기목록) */
        applyInitialHistory: createApi('/API/MRKT/SEMRKTB001'),
        applyHistory: createApi('/API/MRKT/SEMRKTB002'),
    }

    /** 신청내역 (초기목록) */
    async getInitialApplyHistory(): ApplyInitialHistory['Res'] {
        return await axiosInstance.request({
            ...this.apiList.applyInitialHistory,
        })
    }

    /** 신청내역 (더보기, 가맹점 선택) */
    async getApplyHistory(params: ApplyHistory['Req']): ApplyHistory['Res'] {
        return await axiosInstance.request({
            ...this.apiList.applyHistory,
            params,
        })
    }
}

export default new MktStatementService()

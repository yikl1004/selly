import { HttpService, SellyServiceResponse } from './core/http'
import { GET, Path, POST, ResponseAdapter } from './core/decorators'
import { SEFINAARVO } from './core/response'

export interface FinancialQuery {
    /* 카드번호 */
    crno?: string
    /* 주민번호 */
    rrno?: string
}

export default class FinacialService extends HttpService {
    @POST('/API/FIN/SEFINAA001')
    async getData(query: FinancialQuery): Promise<any> {
        return await null
    }
}

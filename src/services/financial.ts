import { HttpService, SellyServiceResponse } from './core/http'
import { GET, Path, POST, Query, ResponseAdapter } from './core/decorators'
import { SEFINAARVO } from './core/response'

export interface FinancialQuery {
    /* 카드번호 */
    crno?: string
    /* 주민번호 */
    rrno?: string
}

class FinacialService extends HttpService {
    @POST('/API/FIN/SEFINAA001')
    async getData(@Query('ciNo') ciNo: string): Promise<any> {
        console.log('FinacialService.getData', ciNo)
        return await null
    }
}

export default new FinacialService()

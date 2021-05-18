import { instance } from '@services/core/http'
import { HttpService, SellyServiceResponse } from './core/http'
import { POST, Query, ResponseAdapter } from './core/decorators'
import { SEFINAARVO } from './core/response'

const api = '/API/LGN/SELGNAA001'
export interface FinancialQuery {
    /* 카드번호 */
    crno?: string
    /* 주민번호 */
    rrno?: string
}

class FinacialService extends HttpService {
    @POST(api)
    async getData(@Query('ciNo') ciNo: string): Promise<any> {
        console.log(ciNo)
        await null
    }
}

export default new FinacialService()

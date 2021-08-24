import { axiosInstance } from '@services/http'
import { IncreaseValue } from '@stores/modules/sales'
import { AxiosResponse } from 'axios'

type SalesOrDeposit =
    | '0' // 매출
    | '1' // 입금
type Scrapping =
    | '0' // 연동 하지 않았고 연동 데이터 없음
    | '1' // 연동 후 데이터 수집 및 연동이 안되어 있는 상태
    | '2' // 연동 데이터 있음(연동 되었고 데이터도 있는 상태)
export interface MainResponse {
    // FIXME: 계속 업데이트 중
    mainInfo: {
        rc: ResponseCode
        rsMsg: string
        data: {
            // 메인 카드 정보
            cardinf: {
                // LOCA 2.0 신용카드 신청 URL
                cardUrl: string
                // 로카머니 비즈니스 카드 보유 여부
                lmBizYn: YN
                // 로카코인
                locaCoin: number
                // LOCA 2.0 로카코인 URL
                locaCoinUrl: null | string
                // 결제 예정 금액 URL
                todBilAm: number
                // LOCA 2.0 결제 예정 금액 URL
                todBilAmUrl: null | string
            }
            // 매출/입금 정보 리스트
            list2: {
                // 금액
                am: string
                // 전일 대비 매출 증감
                bfdCmrSlIcrDcr: IncreaseValue['increase']
                // 기준날짜
                date: string
                // 매출/입금 구분
                slDc: SalesOrDeposit
            }[]
            // 매출/입금 스크래핑 구분 코드
            scrapDc: Scrapping
            // 대표자명
            dgNm: string
        }
    }
}

type MainInfoRes = Promise<AxiosResponse<MainResponse['mainInfo']>>

class MainService {
    // 메인화면 정보
    private mainInfo: API = {
        url: '/API/MAI/SEMAIAA001',
        method: 'post',
    }

    // 메인화면 정보요청
    async getMainInfo(): MainInfoRes {
        return await axiosInstance.request({
            ...this.mainInfo,
        })
    }
}

export default new MainService()

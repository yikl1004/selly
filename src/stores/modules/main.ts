import { Module, VuexModule, MutationAction, Mutation, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import MainService, { MainResponse } from '@services/main'

export interface MainState {
    mainInfo: MainInfo | null
}

export type MainInfo = MainResponse['mainInfo']

@Module({
    name: 'main',
    namespaced: true,
    dynamic: true,
    store,
})
export default class Main extends VuexModule {
    public mainInfo: MainInfo | null = null

    @MutationAction
    async getMainInfo() {
        const { data } = await MainService.getMainInfo()

        return {
            mainInfo: data,
        }
    }

    @Mutation
    init() {
        this.mainInfo = null
    }

    /**
     * @description API 응답 코드
     */
    get isResponseSuccess(): boolean {
        return this.mainInfo?.rc === '0000'
    }

    /**
     * @description 사용자 이름
     */
    get userName(): string {
        return this.mainInfo?.data.dgNm || ''
    }

    /**
     * @description 매출/입금 스크래핑 구분 코드
     */
    get salesScrappingCode() {
        return this.mainInfo?.data.scrapDc || '0'
    }

    /**
     * @description 매춣/입금 리스트
     */
    get salesList(): MainResponse['mainInfo']['data']['list2'] {
        return this.mainInfo?.data.list2 || []
    }

    /**
     * @description 메인 카드 정보
     */
    get cardInfo(): MainResponse['mainInfo']['data']['cardinf'] | null {
        return this.mainInfo?.data.cardinf || null
    }

    /**
     * @description 금융 영역
     */
    get financialData() {
        return this.mainInfo?.data.fininf || null
    }

    /**
     * @description 마케팅(쿠폰 만들기) 영역
     */
    get marketingData() {
        return this.mainInfo?.data.list1 || []
    }

    /**
     * @description 제휴사 배너 정보 리스트
     */
    get affiliateBannerList() {
        return this.mainInfo?.data.list3 || []
    }
}

export const MainModule = getModule(Main)

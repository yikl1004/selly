import { Module, VuexModule, MutationAction, getModule, Mutation } from 'vuex-module-decorators'
import store from '@stores/index'
import MarketingService from '@services/marketing'
import type { MarketingParameters, MarketingResponse } from '@services/marketing'

export type PossibleApplyFranchiseListRes = MarketingResponse['possibleApplyFranchiseList']
export type ValidatePossibleApplyFranchiseListRes = MarketingResponse['validatePossibleApplyFranchiseList']
export type MarketingTargetRes = MarketingResponse['marketingTarget']
export type LastYearSalesAverageRes = MarketingResponse['lastYearSalesAverage']
export type CheckRecommenderRes = MarketingResponse['checkRecommenderCode']
export type ApplyValidateCheckRes = MarketingResponse['applyValidateCheck']
export type ApplyResultRes = MarketingResponse['applyResult']

interface MarketingState {
    possibleApplyFranchiseList: PossibleApplyFranchiseListRes | null
    validatePossibleApplyFranchiseList: ValidatePossibleApplyFranchiseListRes | null
    marketingTarget: MarketingTargetRes | null
    lastYearSalesAverage: {
        first: LastYearSalesAverageRes['data'] | null
        regular: LastYearSalesAverageRes['data'] | null
    }
    franchiseInfo: Partial<FranchiseInfo>
    theLastForm: ApplyParameter
}

export interface ListOfCustomer {
    // 집계구분 코드
    ggDc:
        | '1' // 첫 고객 만들기
        | '2' // 단골 만들기
    // 행사 시작일자
    evSdt: string
    // 행사 종료일자
    evEdt: string
    // 행사전 매출 평균
    evBefSlAv: string
    // 혜택 할인율
    bnfDcR: string
    // 목표 대상 고객수
    trgOjCstt: string
}
interface ApplyParameter {
    // 가맹점 번호
    mcno: string
    // 추천인 입력 여부
    refInYn: YN
    // 추천인 코드
    refC: string
    // 집계구분별 신청정보
    list: ListOfCustomer[]
}

interface FranchiseInfo {
    mcNm: string
    pnadd: string
    mcTlno: string
    promotionMethod: string[]
    bzno: string
    mcno: string
    bpsnoAdd: string
    btNm: string
    mrktXBtYn: YN
    mcPsno: string
}

export interface CustomerItem {
    ggDc: '1' | '2'
    evSdt: string
    evEdt: string
    bnfDcR: string
    trgOjCstt: string
    // 행사전 매출 평균
    evBefSlAv: string
}

const defaultForm: ApplyParameter = {
    mcno: '',
    refInYn: 'N',
    refC: '',
    list: [
        // 첫 고객: 1
        // 단골 고객: 2
    ],
}

@Module({ name: 'marketing', namespaced: true, dynamic: true, store })
export default class Marketing extends VuexModule {
    public possibleApplyFranchiseList: PossibleApplyFranchiseListRes | null = null
    public validatePossibleApplyFranchiseList: ValidatePossibleApplyFranchiseListRes | null = null
    public marketingTarget: MarketingTargetRes | null = null
    public lastYearSalesAverage: MarketingState['lastYearSalesAverage'] = {
        first: null,
        regular: null,
    }
    public franchiseInfo: Partial<FranchiseInfo> | null = null
    /** step 3 최종 신청 양식 */
    public theLastForm: ApplyParameter = defaultForm
    public checkRecommender: CheckRecommenderRes | null = null
    public applyValidateResult: ApplyValidateCheckRes | null = null
    public applyResult: ApplyResultRes | null = null

    @Mutation
    setFranchiseInfo(value: Partial<FranchiseInfo>) {
        this.franchiseInfo = {
            ...this.franchiseInfo,
            ...value,
        }
    }

    get franchiseInfoData() {
        return this.franchiseInfo
    }

    @Mutation
    setTheLastData(value: Partial<ApplyParameter>) {
        this.theLastForm = {
            ...this.theLastForm,
            ...value,
        }
    }

    @Mutation
    setInitTheLastData() {
        this.theLastForm = defaultForm
    }

    get theLastFormData() {
        return this.theLastForm
    }

    @Mutation
    setCustomerList(item: CustomerItem) {
        const targetList = this.theLastForm.list
        const has = targetList.some(listItem => listItem.ggDc === item.ggDc)
        this.theLastForm = {
            ...this.theLastForm,
            list: has
                ? targetList.map(listItem => {
                      if (listItem.ggDc === item.ggDc) {
                          listItem = { ...listItem, ...item }
                      }
                      return listItem
                  })
                : this.theLastForm.list.concat(item),
        }
    }

    @Mutation
    removeCustomerListItem(type: '1' | '2') {
        this.theLastForm = {
            ...this.theLastForm,
            list: this.theLastForm.list.filter(item => item.ggDc !== type),
        }
    }

    @Mutation
    setRecommender(code?: string) {
        this.theLastForm = {
            ...this.theLastForm,
            refInYn: code ? 'Y' : 'N',
            refC: code || '',
        }
    }

    @MutationAction
    async getPossibleApplyUser() {
        const { data } = await MarketingService.getPossibleApplyUser()
        console.log('@@@@@', data)
        return {}
    }

    @MutationAction
    async getPossibleApplyFranchiseList() {
        const { data } = await MarketingService.getPossibleApplyFranchiseList()

        return {
            possibleApplyFranchiseList: data,
        }
    }

    /** 가맹점 리스트 */
    get franchiseList() {
        const origin = this.possibleApplyFranchiseList
        return origin ? origin.data.list : []
    }

    @MutationAction
    async getValidatePossibleApplyFranchiseList(params: MarketingParameters['validatePossibleApplyFranchiseList']) {
        const { data } = await MarketingService.getValidatePossibleApplyFranchiseList(params)

        return {
            validatePossibleApplyFranchiseList: data,
        }
    }

    /** 마케팅 신청 가능 유효성 검사 */
    get step1ValidateResult() {
        return this.validatePossibleApplyFranchiseList?.data
    }

    @MutationAction
    async getMarketingTarget(params: MarketingParameters['marketingTarget']) {
        // const { data } = await MarketingService.getMarketingTarget(params)
        await console.log('[마케팅 행사 대상자 조회, fallback 처리]', params)

        return {
            marketingTarget: {
                data: {
                    newEvOjpT: '20000',
                    newPushOjpT: '10000',
                    odEvOjpT: '10000',
                    odPushOjpT: '5000',
                },
            },
        }
    }

    /** 마케팅 행사 대상자 조회 결과 값 */
    get marketingTargetData() {
        return this.marketingTarget?.data
    }

    @MutationAction
    async getLastYearSalesAverage(value: { type: 'first' | 'regular'; params: MarketingParameters['lastYearSalesAverage'] }) {
        const originData = (this.state as MarketingState).lastYearSalesAverage
        const { data } = await MarketingService.getLastYearSalesAverage(value.params)

        return {
            lastYearSalesAverage: {
                ...originData,
                [value.type]: data.data,
            },
        }
    }

    /** 전대 동일기간 매출 평균 값 반환 */
    get lastYearSalesAverageData() {
        return this.lastYearSalesAverage
    }

    /** 추천인 코드 확인 */
    @MutationAction
    async getCheckRecommenderCode(params: MarketingParameters['checkRecommenderCode']) {
        const { data } = await MarketingService.getCheckRecommenderCode(params)

        return {
            checkRecommender: data,
        }
    }

    /** 추천인 코드 확인 결과 반환 */
    get checkRecommenderResult() {
        return this.checkRecommender?.data
    }

    /** 마케팅 신청 유효성 검사 */
    @MutationAction
    async applyValidateCheck() {
        const origin = (this.state as MarketingState).theLastForm
        const { mcno, refInYn, refC, list } = origin

        const params: MarketingParameters['applyValidateCheck'] = {
            mcno,
            refInYn,
            refC,
            list: list.map(item => {
                const { ggDc, evEdt, evSdt } = item
                return { ggDc, evEdt, evSdt }
            }),
        }

        const { data } = await MarketingService.applyValidateCheck(params)

        return {
            applyValidateResult: data,
        }
    }

    /** 마케팅 신청 유효성 검사 반환 */
    get applyValidateResultData() {
        return this.applyValidateResult
    }

    /** 최종 신청 */
    @MutationAction
    async apply() {
        const params = (this.state as MarketingState).theLastForm

        const { data } = await MarketingService.apply(params)

        return {
            applyResult: data,
        }
    }

    /** 최종 신청 결과 */
    get applyResultData() {
        return this.applyResult
    }
}

export const MarketingModule = getModule(Marketing)

import { Module, VuexModule, MutationAction, getModule, Mutation } from 'vuex-module-decorators'
import MktStatementService from '@services/mktStatement'
import store from '@stores/index'
import toNumber from 'lodash/toNumber'
import type { Parameters, Responses, FranchiseItem, ApplyHistoryItem, ApplyHistory } from '@services/mktStatement.interface'

interface MktStatementState {
    franchiseList: DropdownBoxList /* FranchiseItem[] */
    applyHistory: ApplyHistoryItem[]
    currentHistoryPage: string
    moreYN: YN
}
@Module({ name: 'mktStatement', namespaced: true, dynamic: true, store })
export default class MktStatement extends VuexModule {
    // public applyInitialHistory: MktStatementState['applyInitialHistory'] = null
    public franchiseList: MktStatementState['franchiseList'] = []
    public applyHistory: MktStatementState['applyHistory'] = []
    public currentHistoryPage = ''
    public moreYN: YN = 'N'

    /** 신청내역(초기내역) - 가맹점 정보와 함께 불러오는 API */
    @MutationAction
    async getInitialApplyHistory() {
        const { data } = await MktStatementService.getInitialApplyHistory()
        const franchiseList: DropdownBoxList = [
            {
                displayName: '전체',
                value: '',
                selected: true,
            },
        ]
        if (data) {
            return {
                franchiseList: franchiseList.concat(
                    data.data.mcList.map(item => ({
                        displayName: item.mcNm,
                        value: item.mcno,
                        selected: false,
                    })),
                ),
                applyHistory: data.data.mrktAplList,
                moreYN: data.data.moreYn,
                currentHistoryPage: data.data.psPagNo,
            }
        } else {
            return {
                franchiseList,
                applyHistory: [],
                moreYN: 'N',
                currentHistoryPage: '',
            }
        }
    }

    /** 현재 페이지 번호 */
    get currentHistoryPageNo() {
        return this.currentHistoryPage
    }

    /** 가맹점 리스트 */
    get franchiseListData() {
        return this.franchiseList
    }

    @Mutation
    selectFranchiseList(mcno: string) {
        this.franchiseList = this.franchiseList.map(item => {
            return {
                ...item,
                selected: item.value === mcno,
            }
        })
    }

    /** 신청내역 리스트 */
    get applyList() {
        return this.applyHistory
    }

    /** 신청내역 불러오기 */
    @MutationAction
    async getApplyHistory(params: ApplyHistory['Req']) {
        const typedState = this.state as MktStatementState
        const isNext = toNumber(params.psPagNo) > 0
        const { data } = await MktStatementService.getApplyHistory(params)

        if (data) {
            return {
                applyHistory: isNext ? typedState.applyHistory.concat(data.data.mrktAplList) : data.data.mrktAplList,
                moreYN: data.data.moreYn,
                currentHistoryPage: data.data.psPagNo,
            }
        }
    }
}

export const MktStatementModule = getModule(MktStatement)

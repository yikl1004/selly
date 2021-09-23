import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators'
import MktStatementService, { MktStatementResponse, MktStatementParameters } from '@services/mktStatement'
import store from '@stores/index'
import toNumber from 'lodash/toNumber'

export interface MktStatementState {
    appliedFranchiseList: AppliedFranchiseListRes | null
    statementList: StatementListRes
}

type AppliedFranchiseListRes = MktStatementResponse['appliedFranchiseList']
type StatementListRes = MktStatementResponse['statementList']
type BeforeApplyRes = MktStatementResponse['beforeApply']
type ApplyingRes = MktStatementResponse['applying']
type EndApplyRes = MktStatementResponse['endApply']

@Module({ name: 'mktStatement', namespaced: true, dynamic: true, store })
export default class MktStatement extends VuexModule {
    public appliedFranchiseList: AppliedFranchiseListRes | null = null
    public statementList: StatementListRes = {
        rc: '0000',
        rsMsg: '',
        data: {
            list: [],
            pageNo: '0',
            moreYn: 'N',
        },
    }
    public beforeApply: BeforeApplyRes | null = null
    public applying: ApplyingRes | null = null
    public endApply: EndApplyRes | null = null

    @MutationAction
    async getAppliedFranchiseList() {
        const { data } = await MktStatementService.getAppliedFranchiseList()

        return {
            appliedFranchiseList: data,
        }
    }

    get appliedFranchiseListData() {
        return this.appliedFranchiseList?.data.list || []
    }

    @MutationAction
    async getStatementList(params?: MktStatementParameters['statementList']) {
        const state = this.state as MktStatementState
        const { data } = await MktStatementService.getStatementList(params)

        let statementList: MktStatementState['statementList']

        if (params?.pageNo && toNumber(params.pageNo) >= 1) {
            statementList = {
                ...data,
                data: {
                    ...data.data,
                    list: state.statementList.data.list.concat(data.data.list),
                },
            }
        } else {
            statementList = data
        }

        return {
            statementList,
        }
    }

    get statementListData() {
        return this.statementList.data.list
    }

    get statementListPageNo() {
        return this.statementList.data.pageNo
    }

    get statementListMoreYn(): boolean {
        return this.statementList.data.moreYn === 'Y'
    }

    @MutationAction
    async getBeforeApply(params: MktStatementParameters['beforeApply']) {
        const { data } = await MktStatementService.getBeforeApply(params)
        return {
            beforeApply: data,
        }
    }

    get beforeApplyData(): BeforeApplyRes['data'] | null {
        return this.beforeApply?.data || null
    }

    @MutationAction
    async getApplying(params: MktStatementParameters['applying']) {
        const { data } = await MktStatementService.getApplying(params)
        return {
            applying: data,
        }
    }

    get applyingData(): ApplyingRes['data'] | null {
        return this.applying?.data || null
    }

    @MutationAction
    async getEndApply(params: MktStatementParameters['endApply']) {
        const { data } = await MktStatementService.getEndApply(params)
        return {
            endApply: data,
        }
    }

    get endApplyData(): EndApplyRes['data'] | null {
        return this.endApply?.data || null
    }
}

export const MktStatementModule = getModule(MktStatement)

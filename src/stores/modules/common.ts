import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import CommonService, {
    CommonResponse,
    /* CommonParameters, */
} from '@services/common'

export interface CommonState {
    loginExtendInfo: LoginExtendInfo | null
    referrer: string
}

export type LoginExtendInfo = CommonResponse['loginExtend']

@Module({ name: 'common', namespaced: true })
export default class Common extends VuexModule<CommonState> {
    public loginExtendInfo: LoginExtendInfo | null = null
    public referrer = ''

    @Mutation
    changeReferrer(referrer: string) {
        this.referrer = referrer
    }

    @Mutation
    init() {
        this.loginExtendInfo = null
    }

    @MutationAction
    async getLoginExtendInfo() {
        // const state = this.state as CommonState
        const { data } = await CommonService.getLoginExtend()

        return {
            loginExtendInfo: data,
        }
    }
}

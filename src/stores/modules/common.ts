import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import CommonService, { CommonResponse, CommonParameters } from '@services/common'

export interface CommonState {
    loginExtendInfo: LoginExtendInfo | null
}

declare global {
    type LoginExtendInfo = CommonResponse['loginExtend']
}

@Module({ name: 'auth', namespaced: true })
export default class Auth extends VuexModule<CommonState> {
    public loginExtendInfo: LoginExtendInfo | null = null

    @Mutation
    init() {
        return {
            loginExtendInfo: null,
        }
    }

    @MutationAction
    async getLoginExtendInfo() {
        const state = this.state as CommonState
        const { data } = await CommonService.getLoginExtend()

        console.log('세션 연장 API 호출 결과', data)
        return {
            loginExtendInfo: data.data,
        }
    }
}

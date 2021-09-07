import { Module, VuexModule, MutationAction, Mutation, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import CommonService, { CommonResponse } from '@services/common'

export interface CommonState {
    loginExtendInfo: LoginExtendInfo | null
    referrer: string
}

export type LoginExtendInfo = CommonResponse['loginExtend']

@Module({ name: 'common', namespaced: true, dynamic: true, store })
export default class Common extends VuexModule {
    public loginExtendInfo: LoginExtendInfo | null = null
    public referrer = ''

    @Mutation
    changeReferrer(referrer: string) {
        localStorage.setItem('referrer', referrer)
        this.referrer = referrer
    }

    @Mutation
    init() {
        this.loginExtendInfo = null
    }

    @MutationAction
    async getLoginExtendInfo() {
        const { data } = await CommonService.getLoginExtend()

        return {
            loginExtendInfo: data,
        }
    }

    // document.referrer 대체
    get referrerData() {
        return this.referrer
    }

    get loginExtendInfoData() {
        return this.loginExtendInfo
    }
}

export const CommonModule = getModule(Common)

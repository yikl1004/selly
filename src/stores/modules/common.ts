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
    public sessionExtendModal = false
    public overtime = false

    @Mutation
    setOvertime(value: boolean) {
        this.overtime = value
    }

    @Mutation
    changeReferrer(referrer: string) {
        localStorage.setItem('referrer', referrer)
        this.referrer = referrer
    }

    @Mutation
    init() {
        this.loginExtendInfo = null
    }

    @Mutation
    setSessionModal(value: boolean) {
        this.sessionExtendModal = value
    }

    @MutationAction
    async getLoginExtendInfo() {
        const { data } = await CommonService.getLoginExtend()

        return {
            loginExtendInfo: data,
        }
    }

    /** document.referrer 대체 */
    get referrerData() {
        return this.referrer
    }

    /** 세션 연장 후 결과 데이터 */
    get loginExtendInfoData() {
        return this.loginExtendInfo
    }

    /** 자동 로그아웃 모달 노출 여부 */
    get isSessionExtendModal() {
        return this.sessionExtendModal
    }

    /** 자동로그아웃 시간 초과 여부 */
    get overtimeData() {
        return this.overtime
    }
}

export const CommonModule = getModule(Common)

import { Module, VuexModule, MutationAction, Mutation, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import MainService, { MainResponse } from '@services/main'
// import { basicUtil } from '@utils/mixins'
// import { $dayjs } from '@utils/plugins/dayjs'

export interface MainState {
    mainInfo: MainInfo | null
}

export type MainInfo = MainResponse['mainInfo']

@Module({ name: 'main', namespaced: true, dynamic: true, store })
export default class Main extends VuexModule {
    public mainInfo: MainInfo | null = null

    @MutationAction
    async getMainInfo() {
        const { data } = await MainService.getMainInfo()

        return {
            mainInfo: data,
        }
    }

    /**
     * @description
     * 메인화면 정보
     */
    get mainInfoData() {
        return this.mainInfo?.data
    }
}

export const MainModule = getModule(Main)

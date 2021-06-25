import { Module, VuexModule, MutationAction, getModule, Action, Mutation } from 'vuex-module-decorators'
import { axiosInstance } from '@services/core'

export interface UiState {
    gnbOpen: boolean
    gnbList: GnbItem[]
}

@Module({ name: 'ui', namespaced: true, stateFactory: true })
export default class Ui extends VuexModule {
    gnbOpen: UiState['gnbOpen'] = false
    gnbList: UiState['gnbList'] = []

    @Mutation
    setGnb(gnbOpen: boolean) {
        console.log('gnbOpen', gnbOpen)
        this.gnbOpen = gnbOpen
    }

    @MutationAction({ mutate: ['gnbList'] })
    async getGnbList() {
        const { data: gnbList } = await axiosInstance.get('/assets/static/dummy/menu.json')

        return {
            gnbList,
        }
    }
}

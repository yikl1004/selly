import { Module, VuexModule, MutationAction, getModule, Action, Mutation } from 'vuex-module-decorators'
import { axiosInstance } from '@services/core'

export interface UiState {
    gnbOpen: boolean
    gnbList: GnbItem[]
}

@Module({ name: 'ui', namespaced: true, stateFactory: true })
export default class Ui extends VuexModule {
    public gnbOpen: UiState['gnbOpen'] = false
    public gnbList: UiState['gnbList'] = []

    @Mutation
    setGnb(gnbOpen: boolean) {
        console.log('gnbOpen', gnbOpen)
        this.gnbOpen = gnbOpen
    }

    @MutationAction({ mutate: ['gnbList'] })
    async getGnbList() {
        const { data } = await axiosInstance.get('/assets/static/dummy/menu.json')
        const { gnbList } = data

        return {
            gnbList,
        }
    }

    @Action
    actionTest() {
        console.log('action test')
    }
}

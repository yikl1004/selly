import { Module, VuexModule, MutationAction, getModule, Action, Mutation } from 'vuex-module-decorators'
import { axiosInstance } from '@services/http'

declare global {
    type HeaderType = 'main' | 'sub' | 'process'
}
export interface UiState {
    gnbOpen: boolean
    gnbList: GnbItem[]
    headerType: HeaderType
    visible: boolean
}

@Module({ name: 'ui', namespaced: true, stateFactory: true })
export default class Ui extends VuexModule {
    public gnbOpen: UiState['gnbOpen'] = false
    public gnbList: UiState['gnbList'] = []
    public headerType: HeaderType = 'main'
    public visible: boolean = false

    @Mutation
    setVisibleHeader(visible: boolean) {
        this.visible = visible
    }

    @Mutation
    setHeaderType(headerType: HeaderType) {
        this.headerType = headerType
    }

    @Mutation
    setGnb(gnbOpen: boolean) {
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
    actionTest() {}
}

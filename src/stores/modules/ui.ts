import { Module, VuexModule, Mutation, MutationAction, getModule } from 'vuex-module-decorators'
import store from '@stores/index'
import { axiosInstance } from '@services/http'

export type HeaderType = 'main' | 'sub' | 'process'

// menu 정보
export interface GnbItem {
    name: string
    path: string
    children?: GnbItem[]
}

export interface UiState {
    gnbList: GnbItem[]
    loading: boolean
    pageDirection: PageDirection
}

export type PageDirection = 'prev' | 'next'

@Module({ name: 'ui', namespaced: true, stateFactory: true, dynamic: true, store })
export default class Ui extends VuexModule {
    public gnbList: UiState['gnbList'] = []
    public loading = false
    public pageDirection: PageDirection = 'next'

    @Mutation
    setPageDirection(pageDirection: PageDirection) {
        this.pageDirection = pageDirection
    }

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @MutationAction
    async getGnbList() {
        const { data } = await axiosInstance.get('/assets/static/dummy/menu.json')
        const { gnbList } = data

        return { gnbList }
    }

    get pageDirectionData() {
        return this.pageDirection
    }

    get loadingData() {
        return this.loading
    }
}

export const UiModule = getModule(Ui)

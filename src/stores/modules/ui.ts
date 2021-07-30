import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import { axiosInstance } from '@services/http'

export type HeaderType = 'main' | 'sub' | 'process'

// menu 정보
export interface GnbItem {
    name: string
    path: string
    children?: GnbItem[]
}

export interface UiState {
    gnbOpen: boolean
    gnbList: GnbItem[]
    headerType: HeaderType
    visible: boolean
    loading: boolean
}

@Module({ name: 'ui', namespaced: true, stateFactory: true })
export default class Ui extends VuexModule {
    public gnbOpen: UiState['gnbOpen'] = false
    public gnbList: UiState['gnbList'] = []
    public headerType: HeaderType = 'main'
    public visible = false
    public headerTitle = ''
    public loading = false

    @Mutation
    setVisibleHeader(visible: boolean) {
        this.visible = visible
    }

    @Mutation
    setHeaderTitle(title: string) {
        this.headerTitle = title
    }

    @Mutation
    setHeaderType(headerType: HeaderType) {
        this.headerType = headerType
    }

    @Mutation
    setGnb(gnbOpen: boolean) {
        this.gnbOpen = gnbOpen
    }

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @MutationAction({ mutate: ['gnbList'] })
    async getGnbList() {
        const { data } = await axiosInstance.get('/assets/static/dummy/menu.json')
        const { gnbList } = data

        return {
            gnbList,
        }
    }
}

export {}

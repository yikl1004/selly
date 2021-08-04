import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'
import { RootStore } from '@stores/index'
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
}

@Module({ name: 'ui', namespaced: true, stateFactory: true })
export default class Ui extends VuexModule<UiState, RootStore> {
    public gnbList: UiState['gnbList'] = []
    public loading = false

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @MutationAction
    async getGnbList() {
        const { data } = await axiosInstance.get('/assets/static/dummy/menu.json')
        const { gnbList } = data

        return {
            gnbList,
        }
    }

    // @MutationAction
    // async getPrefixDigit() {
    //     const { data } = await axiosInstance.get('/assets/static/dummy/prefixDigit.json')
    //     const { prefixDigit } = data

    //     return {
    //         prefixDigit,
    //     }
    // }
}

export {}

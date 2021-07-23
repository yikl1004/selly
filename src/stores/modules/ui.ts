import {
    Module,
    VuexModule,
    MutationAction,
    Mutation,
} from 'vuex-module-decorators'
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
}

@Module({ name: 'ui', namespaced: true, stateFactory: true })
export default class Ui extends VuexModule {
    gnbOpen: UiState['gnbOpen'] = false
    gnbList: UiState['gnbList'] = []
    headerType: HeaderType = 'main'
    visible = false
    headerTitle = ''

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

    @MutationAction({ mutate: ['gnbList'] })
    async getGnbList() {
        const { data } = await axiosInstance.get(
            '/assets/static/dummy/menu.json',
        )
        const { gnbList } = data

        return {
            gnbList,
        }
    }
}

export {}

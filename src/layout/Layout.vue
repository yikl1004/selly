<template>
    <div class="layout">
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutLeft"
        >
            <div class="layout-default">
                <Header v-if="visibleHeader" :header-type="headerType" />
                <Gnb :show="gnbOpen" @close="setGnb(false)" />
                <router-view />
                <Footer v-if="useFooter" />
                <FixedBtnBox v-if="useFloating"></FixedBtnBox>
                <Loading v-if="loading" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import type { HeaderType } from '@stores/modules/ui'

const { State, Mutation } = namespace('ui')

@Component
export default class Layout extends Vue {
    /** @category Stores */
    @State('gnbOpen') readonly gnbOpen!: boolean
    @State('headerType') readonly headerType!: HeaderType
    @State('visible') readonly visibleHeader!: boolean
    @State('loading') readonly loading!: boolean
    @Mutation('setGnb') readonly setGnb!: (gnbOpen: boolean) => void

    /** footer 사용/노출 여부 */
    get useFooter(): boolean {
        return this.$route.meta.footer !== false
    }

    /** floating 버튼 영역 사용/노출 여부 */
    get useFloating(): boolean {
        return this.$route.meta.floating
    }
}
</script>

<style lang="scss" scoped>
.layout {
    --animate-duration: 150ms;
}
</style>

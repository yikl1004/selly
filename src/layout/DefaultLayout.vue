<template>
    <div class="layout-default">
        <Header v-if="visibleHeader" :header-type="headerType" />
        <Gnb :show="gnbOpen" @close="setGnb(false)" />
        <slot />
        <Footer v-if="isFooter" />
        <FixedBtnBox v-else></FixedBtnBox>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const { State, Mutation } = namespace('ui')

@Component
export default class DefaultLayout extends Vue {
    /** @category Stores */
    @State('gnbOpen') readonly gnbOpen!: boolean
    @Mutation('setGnb') readonly setGnb!: (gnbOpen: boolean) => void
    @State('headerType') readonly headerType!: HeaderType
    @State('visible') readonly visibleHeader!: boolean

    get isFooter(): boolean {
        // undefined는 true로 간주
        return this.$route.meta.footer !== false
    }

    mounted() {
        console.log('DefaultLayout MOUNTED', this.$slots)
    }
}
</script>

<style lang="scss">
#layout {
    background-color: #fff;
}
</style>

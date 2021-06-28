<template>
    <div class="layout-default">
        <Header header-type="sub" />
        <Gnb :show="gnbOpen" @close="setGnb(false)" />
        <slot />
        <Footer v-if="isFooter" />
        <FixedBtnBox v-else></FixedBtnBox>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const UiModule = namespace('ui')

@Component
export default class DefaultLayout extends Vue {
    @UiModule.State('gnbOpen')
    readonly gnbOpen!: boolean

    @UiModule.Mutation('setGnb')
    readonly setGnb!: (gnbOpen: boolean) => void

    get isFooter(): boolean {
        // undefined는 true로 간주
        return this.$route.meta.footer !== false
    }

    mounted() {
        console.log('DefaultLayout MOUNTED')
    }
}
</script>

<style lang="scss">
#layout {
    background-color: #fff;
}
</style>

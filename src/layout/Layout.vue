<template>
    <div class="layout">
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutLeft"
        >
            <component :is="layout">
                <router-view />
            </component>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DefaultLayout from '@layout/DefaultLayout.vue'
import NoneLayout from '@layout/NoneLayout.vue'
import { RouteMeta } from 'src/router'

type LayoutType = 'default-layout' | 'none-layout'

const DEFAULT_TRANSITION = 'fade'

@Component({
    components: { DefaultLayout, NoneLayout },
})
export default class Layout extends Vue {
    private transitionName: string = DEFAULT_TRANSITION

    get layout(): string {
        const layout = this.$route.meta.layout as RouteMeta
        return layout ? `${layout}-layout` : 'default-layout'
    }

    mounted(): void {}

    beforeLeave() {}

    enter() {}

    created() {}
}
</script>

<style lang="scss" scoped>
.layout {
    --animate-duration: 150ms;
}
</style>

<template>
    <div class="site-wrapper">
        <component :is="layout">
            <transition
                mode="out-in"
                enter-active-class="animate__animated animate__fadeInRight"
                leave-active-class="animate__animated animate__fadeOutLeft"
            >
                <router-view />
            </transition>
        </component>
        <PortalTarget name="bottomSheet" multiple />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DefaultLayout from '@layout/DefaultLayout.vue'
import NoneLayout from '@layout/NoneLayout.vue'

type LayoutType = 'default' | 'none'

const DEFAULT_TRANSITION = 'fade'

@Component({
    components: {
        default: DefaultLayout,
        none: NoneLayout,
    },
})
export default class Layout extends Vue {
    private transitionName: string = DEFAULT_TRANSITION

    get layout(): LayoutType {
        return this.$route.meta.layout || 'default'
    }

    mounted(): void {}

    beforeLeave() {}

    enter() {}

    created() {
        this.$router.beforeEach((to, from, next) => {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            const transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

            this.transitionName = transitionName || DEFAULT_TRANSITION

            next()
        })
    }
}
</script>

<style lang="scss" scoped>
#layout {
    --animate-duration: 300ms;
}
</style>

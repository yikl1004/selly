<template>
    <component :is="layout">
        <transition :name="transitionName" mode="in-out" @beforeLeave="beforeLeave" @enter="enter">
            <router-view />
        </transition>
    </component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import NoneLayout from '@/layout/NoneLayout.vue'

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

<style lang="scss">
.slide-left-enter-active {
    transition: left cubic-bezier(0.55, 0, 0.1, 1) 0.4s;
    overflow: hidden;
    position: absolute;
    top: 50px;
    left: 0;
}

.slide-left-enter {
    left: 100%;
}

.slide-left-leave-active {
    left: 100%;
}
</style>

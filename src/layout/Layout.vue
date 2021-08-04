<template>
    <div class="layout">
        <transition :name="transitionName" :duration="{ enter: 6000, leave: 6000 }">
            <router-view>
                <template slot-scope="{ Component }">
                    <component :is="Component" />
                </template>
            </router-view>
        </transition>
        <FixedBtnBox v-if="useFloating"></FixedBtnBox>
        <Loading v-if="loading" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import type { Route } from 'vue-router'

const { State: UiState } = namespace('ui')
const { State: CommonState } = namespace('common')

@Component
export default class Layout extends Vue {
    /** @Stores */
    @UiState('loading') readonly loading!: boolean
    @CommonState('referrer') readonly referrer!: string

    /** @Data */
    private transitionName = 'next'

    /** @Computed */
    /** floating 버튼 영역 사용/노출 여부 */
    get useFloating(): boolean {
        return this.$route.meta.floating
    }

    @Watch('$route')
    changeRoute(to: Route, from: Route) {
        console.log('$route change', { to })
        this.transitionName = from.name === this.referrer ? 'prev' : 'next'
    }
}
</script>

<style lang="scss" scoped>
$duration: 6000ms;
.layout {
    display: grid;
    grid-template: 'main';
    background-color: #fff;
}

.layout > * {
    grid-area: main;
}

/* Transitions */

.next-leave-to {
    animation: leaveToLeft $duration both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 0;
}

.next-enter-to {
    animation: enterFromRight $duration both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1;
}

.prev-leave-to {
    animation: leaveToRight $duration both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 1;
}

.prev-enter-to {
    animation: enterFromLeft $duration both cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 0;
}

@keyframes leaveToLeft {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-25%);
        filter: brightness(0.5);
    }
}

@keyframes enterFromLeft {
    from {
        transform: translateX(-25%);
        filter: brightness(0.5);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes leaveToRight {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
}

@keyframes enterFromRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
</style>

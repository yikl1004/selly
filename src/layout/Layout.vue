<template>
    <div class="layout">
        <transition
            :name="pageDirection"
            :duration="{ enter: 500, leave: 500 }"
        >
            <router-view>
                <template slot-scope="{ Component }">
                    <component :is="Component" />
                </template>
            </router-view>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UiModule } from '@stores/modules/ui'
import { CommonModule } from '@stores/modules/common'

/**
 * @description
 * router-view 를 스위칭하며, App.vue 컴포넌트 바로 아래에 있는 컴포넌트
 */
@Component
export default class Layout extends Vue {
    get referrer() {
        return CommonModule.referrerData
    }

    get pageDirection() {
        return UiModule.pageDirectionData
    }
}
</script>

<style lang="scss" scoped>
$duration: 500ms;
.layout {
    display: grid;
    grid-template: 'main';
    background-color: #fff;
}

.layout > * {
    grid-area: main;
    // box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;
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

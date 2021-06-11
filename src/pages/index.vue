<template>
    <div class="container">
        <LoginButton />

        <!-- <scroll-container class="flex" @change="updateState">
            <div class="list">
                <scroll-item v-for="i in 200" :id="i" :key="i" @change="onChange">
                    <p :class="['bloc', getClass(i)]" :style="getStyle(i)">
                        {{ i }}
                    </p>
                </scroll-item>
            </div>
        </scroll-container> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const { ScrollContainer, ScrollItem } = require('vue-scrollmonitor')

@Component({
    components: { ScrollContainer, ScrollItem },
})
export default class LoginPage extends Vue {
    state: any[] = []

    get itemsInViewport() {
        return this._.pickBy(this.state, ({ isInViewport }) => isInViewport)
    }

    getClass(i: number): string {
        const state = this.state[i]
        if (state && (state.isFullyInViewport || state.isAboveViewport)) {
            return 'in'
        } else {
            return 'out'
        }
    }

    getStyle(i: number) {}

    updateState(state: any) {
        this.state = state
    }

    onChange(state: any) {
        console.log('change')
    }
}
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    padding: 24px;
}
.bloc {
    background-color: #fff;
    width: 100%;
    height: 120px;
    border-radius: 8px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    transform: translateY(20%);
    opacity: 0;

    transition: all 300ms ease-in-out;

    &.isaboveviewport,
    &.isfullyinviewport {
        transform: translateY(0);
        opacity: 1;
    }
}

.bloc + .bloc {
    margin-top: 40px;
}
</style>

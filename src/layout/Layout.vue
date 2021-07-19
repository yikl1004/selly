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

@Component({
    components: { DefaultLayout, NoneLayout },
})
export default class Layout extends Vue {
    private layout: string = 'default-layout'
}
</script>

<style lang="scss" scoped>
.layout {
    --animate-duration: 150ms;
}
</style>

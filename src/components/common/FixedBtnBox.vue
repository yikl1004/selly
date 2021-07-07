<template>
    <div v-if="isModal" class="fixed-btn-box">
        <slot />
    </div>
    <PortalTarget v-else name="floating" class="fixed-btn-box" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FixedBtnBox extends Vue {
    /** @category Props */

    /** 용도 설정(layout, modal) */
    @Prop({ type: String })
    readonly target!: 'layout' | 'modal'

    /** @category Computed */

    // 용도가 'modal' 인지 판단
    get isModal(): boolean {
        return this.target === 'modal'
    }
}
</script>

<style lang="scss" scoped src="./FixedBtnBox.scss"></style>

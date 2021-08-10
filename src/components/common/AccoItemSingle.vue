<template>
    <div class="box-acco-single">
        <div :class="['box-acco-item', { active: toggle }]">
            <button type="bubton" class="acco-anchor" :aria-expanded="toggle ? 'true' : 'false'" @click="onToggle">
                <span>{{ title }}</span>
            </button>
            <div class="acco-cont">
                <div class="acco-cont-inner">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AccoItemSingle extends Vue {
    /* 메뉴 타이틀명 */
    @Prop({ type: String, default: '' })
    readonly title!: string

    /**
     * @category Data(State)
     */

    private toggle = false

    /**
     * @category Methods
     */
    onToggle() {
        this.toggle = !this.toggle
    }
}
</script>

<style lang="scss" scoped src="./AccoItemSingle.scss"></style>

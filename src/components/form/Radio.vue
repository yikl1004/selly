<template>
    <label class="radio-box">
        <input type="radio" value="radio" :name="name" :disabled="disabled" :checked="checked" />
        <i>{{ label }}</i>
    </label>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'

export interface RadioProps {
    label: string
    name: string
    checked?: boolean
    disabled?: boolean
    index?: number
}

@Component
export default class Radio extends Vue {
    /**
     * @category Prop
     */

    /** form id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label text */
    @Prop({ type: String, required: true })
    readonly label!: string

    /** name text */
    @Prop({ type: String })
    readonly name!: string

    /** 활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 필수 여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly required!: boolean

    /** 체크된 상태 */
    @Prop({ type: Boolean, default: false })
    readonly checked!: boolean

    /**
     * @category Data
     */

    /** value */
    private value: boolean = this.checked || false

    /**
     * @category Watch
     */

    @Watch('checked')
    changeChecked(newValue: boolean, oldValue: boolean) {
        this.value = newValue
    }

    /**
     * @category Methods
     */

    /** 초기화 */
    init() {
        this.value = this.checked || false
    }

    onChange() {}
}
</script>

<style scoped lang="scss" src="./Radio.scss"></style>

<template>
    <label class="radio-box">
        <input
            type="radio"
            :value="value"
            :name="name"
            :disabled="disabled"
            :checked="checked"
            @change.prevent="onChange($event.target.value)"
        />
        <i>{{ label }}</i>
    </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface RadioProps {
    value: string
    label: string
    checked?: boolean
    disabled?: boolean
    index?: number
}

@Component
export default class Radio extends Vue {
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

    /** value */
    @Prop({ type: String, default: '' })
    readonly value!: string

    onChange(value: boolean) {
        /**
         * @event change
         */
        this.$emit('change', value)
    }
}
</script>

<style scoped lang="scss" src="./Radio.scss"></style>

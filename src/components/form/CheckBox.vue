<template>
    <div :class="['check-box', type]">
        <input :id="id" v-model="value" type="checkbox" :disabled="disabled" :name="name" @change="onChange" />
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'

export type DesignType = 'normal' | 'circle'

export interface CheckboxProps {
    id: string
    label: string
    name: string
    type: DesignType
    defaultValue?: boolean
    require?: boolean
    disabled?: boolean
}

@Component
export default class CheckBox extends Vue {
    /**
     * @category Prop
     */

    /** 디자인 타입 */
    @Prop({ type: String, default: 'normal' })
    readonly type!: DesignType

    /** form id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** name attribute */
    @Prop({ type: String, required: true })
    readonly name!: string

    /** label text */
    @Prop({ type: String, required: true })
    readonly label!: string

    /** 활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 필수 여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly required!: boolean

    /** form value */
    @Prop({ type: Boolean, default: false })
    private defaultValue!: boolean

    /**
     * @category Data
     */

    /** value */
    private value: boolean = this.defaultValue || false

    /**
     * @category Methods
     */

    /** 초기화 */
    init() {
        this.value = this.defaultValue || false
    }

    onChange() {
        /**
         * 변경된 값을 상위로 전달 할수 있음
         * @event change
         */
        this.$emit('change', this.value)
    }
}
</script>

<style scoped lang="scss" src="./CheckBox.scss"></style>

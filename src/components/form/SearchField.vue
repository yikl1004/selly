<template>
    <div class="search-field">
        <label :for="id" class="ir">{{ label }}</label>
        <div class="flex">
            <div class="input-area" :class="{ focus: focusedClass }">
                <input
                    :id="id"
                    ref="input"
                    :value="displayValue"
                    autocomplete="new-password"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    type="text"
                    :readonly="readonly"
                    @input="onInput"
                    @keydown="onKeydown"
                    @focus="onFocus"
                    @blur="onBlur"
                />
                <button v-if="!readonly && !!value.length" type="button" class="clear" @click="clearValue">
                    <i />
                    <span class="ir">전체삭제</span>
                </button>
            </div>
            <button class="search-button" type="submit">
                <span>검색</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'

export interface OnChangeParameters {
    value: string
    maxLength?: number
    index?: number
}
type InputType = 'text' | 'number'
interface Validate {
    (value: string): boolean
}

/**
 * TODO:
 * 2. label에 표시될 tooltip이 아직 공통 컴포넌트가 없음, 해야함
 * 3. 단위 표시할 텍스트 노출방식에 대한 논의가 필요함
 */

@Component
export default class SearchField extends Mixins(Validates) {
    /**
     * @category Refs
     */
    $refs!: Vue['$refs'] & {
        input: HTMLInputElement
    }
    /**
     * @category PROPS
     */

    /** form에 사용될 id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** name 속성 지정 */
    @Prop({ type: String, default: '', required: true })
    readonly name!: string

    /** 최대 자릿수 지정 */
    @Prop({ type: Number, default: 9999 })
    readonly maxlength!: number

    /** 입력 전 표시될 가이드 텍스트 */
    @Prop({ type: String, default: '' })
    readonly placeholder!: string

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /**
     * @category DATA(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /**
     * @category COMPUTED
     */

    /** 타이핑한 값 */
    get displayValue(): string {
        const conditions = [this.value, this.type === 'seperateNumber']
        return conditions.every(condition => condition) ? this._.toNumber(this.value).toLocaleString() : this.value
    }

    /**
     * @title WATCH
     */

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string, index: number, maxLength: number)
         */
        this.$emit('change', newValue)
    }

    /**
     * @category METHOD
     * @title Custom Methods
     */

    onInput(event: InputEvent) {
        this.value = this.$refs.input.value.replace(/\,/g, '')
    }

    onKeydown(event: KeyboardEvent) {
        this.applyMaxLength(event)
        this.onlyNumber(event)

        /**
         * keydown 이벤트
         * @event keydown
         */
        this.$emit('keydown', event)
    }

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.focusedClass = true
    }

    onBlur(event: FocusEvent) {
        this.focusedClass = false
    }

    clearValue() {
        this.value = ''
        this.$refs.input.focus()
    }

    /**
     * @category METHODS
     * @title Lifecycle
     */
    mounted() {
        /**
         * mounted 이벤트
         * @event mounted
         */
        this.$emit('mounted', this.$refs.input)
    }
}
</script>

<style lang="scss" scoped src="./SearchField.scss"></style>

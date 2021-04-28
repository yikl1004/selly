<template>
    <div class="text-field" :class="isError">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input
                :id="id"
                ref="input"
                :value="displayValue"
                autocomplete="new-password"
                :pattern="pattern"
                :maxlength="maxlength"
                :placeholder="placeholder"
                :type="inputType"
                :readonly="readonly"
                @input="onInput"
                @keydown="onKeydown"
                @focus="onFocus"
                @blur="onBlur"
            />
            <span v-if="unit" class="unit">
                {{ unit }}
            </span>
            <button v-if="!readonly && !!value.length" type="button" class="clear" @click="clearValue">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>
        <p v-if="message" class="message">
            {{ message }}
        </p>
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

@Component<TextField>({})
export default class TextField extends Mixins(Validates) {
    /**
     * @category PROPS
     */

    /** type 속성 */
    @Prop({ type: String, default: 'text' })
    readonly type!: 'text' | 'number' | 'seperateNumber'

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

    /** 단위 표시 */
    @Prop({ type: String, default: '' })
    readonly unit!: string

    /** 유효성 검사 */
    @Prop(Function)
    readonly validate!: Validate

    /** 에러 메세지 */
    @Prop(String)
    readonly errorMessage!: string

    /** 성공 메세지 */
    @Prop(String)
    readonly successMessage!: string

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
    get pattern(): string {
        return this.inputType === 'number' ? '\\d*' : ''
    }

    get index(): number {
        return this._.toNumber(this.$attrs['data-index'])
    }

    get inputType(): InputType {
        const dictionary: { [key: string]: InputType } = {
            text: 'text',
            number: 'number',
            seperateNumber: 'text',
        }
        return dictionary[this.type]
    }

    /** 타이핑한 값 */
    get displayValue(): string {
        const conditions = [this.value, this.type === 'seperateNumber']
        return conditions.every(condition => condition) ? this._.toNumber(this.value).toLocaleString() : this.value
    }

    /** 에러 여부 */
    get isError(): string | undefined {
        const conditions = [this.value.length, typeof this.validate === 'function']
        if (conditions.every(condition => condition)) {
            return this.validate(this.value) ? 'success' : 'error'
        }
    }

    /** 에러 메세지 */
    get message(): string | undefined {
        const conditions = [this.value.length, typeof this.validate === 'function']
        if (conditions.every(condition => condition)) {
            return this.validate(this.value) ? this.successMessage : this.errorMessage
        }
    }

    /** 숫자만 입력 받는 타입인지 여부 */
    get isNumberType(): boolean {
        return ['number', 'seperateNumber'].some(type => type === this.type)
    }

    /**
     * @title WATCH
     */

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string, index: number, maxLength: number)
         */
        this.$emit('change', newValue, this.index, this.maxlength)
    }

    /**
     * @category METHOD
     * @title Custom Methods
     */

    applyMaxLength(event: KeyboardEvent) {
        const isMetaKeys = this.isMetaKeys(event)
        const target = event.target as HTMLInputElement
        const value = target.value

        const conditions = [this.isNumberType, value.length >= this.maxlength, !isMetaKeys]

        conditions.every(condition => condition) && event.preventDefault()
    }

    onlyText(event: KeyboardEvent) {
        /**
         * TODO: 숫자가 아닌 텍스트만 입력 가능하게...
         */
    }

    onlyNumber(event: KeyboardEvent) {
        /**
         * @description 텍스트가 아닌 숫자만 입력 가능하게...
         */
        if (this.isNumberType) {
            const conditions = [this.isString(event), !this.isMetaKeys(event)]
            conditions.every(condition => condition) && event.preventDefault()
        }
    }

    onInput(event: InputEvent) {
        const target = event.target as HTMLInputElement
        this.value = target.value.replace(/\,/g, '')
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

    onFocus() {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', this.index)

        this.focusedClass = true
    }

    onBlur() {
        this.focusedClass = false
    }

    clearValue() {
        /**
         * @description value를 초기화하고, onFocus 함
         */

        this.value = ''
        ;(this.$refs.input as HTMLInputElement).focus()
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

        console.log(this)
    }
}
</script>

<style lang="scss" scoped src="./TextField.scss"></style>

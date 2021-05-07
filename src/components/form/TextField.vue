<template>
    <div class="text-field" :class="isError">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass, 'select-type': isSelectType }">
            <template v-if="isSelectType">
                <button type="button" class="select-button" @click="openBottomSheet">
                    {{ selectedValue.displayName }}
                    <i class="open" />
                </button>
                <portal to="bottomSheet">
                    <BottomSheet
                        :show="bottomSheetVisible"
                        :title="label"
                        :list="list"
                        @close="closeBottomSheet"
                        @select-option="onSelectOption"
                    />
                </portal>
            </template>
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
import { OptionItem } from '../common/BottomSheet.vue'

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
export default class TextField extends Mixins(Validates) {
    /**
     * @category Refs
     */
    $refs!: Vue['$refs'] & {
        input: HTMLInputElement
    }
    /**
     * @category PROPS
     */

    /** type 속성 */
    @Prop({ type: String, default: 'text' })
    readonly type!: 'text' | 'number' | 'seperateNumber' | 'select'

    /** form에 사용될 id */
    @Prop({ type: String })
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

    /** select 타입일 경우 option list를 주입해함!! */
    @Prop({ type: Array, default: [] })
    readonly list!: OptionItem[]

    /**
     * @category DATA(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 선택영역 노춣 여부 */
    private bottomSheetVisible: boolean = false

    /** 선택영역에서 선택한 값 */
    private selectedValue: OptionItem = this.list[0]

    /**
     * @category COMPUTED
     */
    get pattern(): string {
        return this.inputType === 'number' ? '\\d*' : ''
    }

    get inputType(): InputType {
        const dictionary: { [key: string]: InputType } = {
            text: 'text',
            number: 'number',
            seperateNumber: 'text',
        }
        return dictionary[this.type]
    }

    get isSelectType(): boolean {
        return this.type === 'select'
    }

    /** 타이핑한 값 */
    get displayValue(): string {
        const conditionsSeperateNumbe = [this.value, this.type === 'seperateNumber']
        const conditionSelectType = [this.value, this.type === 'select']
        if (conditionsSeperateNumbe.every(condition => condition)) {
            return this._.toNumber(this.value).toLocaleString()
        } else if (conditionSelectType.every(condition => condition)) {
            return this.phoneNumber(this.value)
        } else {
            return this.value
        }
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
        this.value = this.$refs.input.value.replace(/\,|\-/gi, '')
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

    openBottomSheet() {
        this.bottomSheetVisible = true
    }

    closeBottomSheet() {
        this.bottomSheetVisible = false
    }

    onSelectOption(value: string) {
        this.selectedValue = this.list.find(item => item.value === value) as OptionItem

        /**
         * 선택된 값은 전달
         * @event select
         */
        this.$emit('select', this.selectedValue)
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

<style lang="scss" scoped src="./TextField.scss"></style>

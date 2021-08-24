<template>
    <div class="email-field" :class="isError">
        <LabelTitle
            :id="id"
            title-type="label"
            :hidden-label="hiddenLabel"
            :label="label"
        />

        <div class="email-input-box">
            <div
                class="input-area"
                :class="{
                    focus: focusedClass,
                    readonly: readonly,
                    disabled: disabled,
                }"
            >
                <input
                    :id="id"
                    ref="input"
                    :name="_.camelCase(id)"
                    :value="displayValue"
                    placeholder="ID 입력"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-bind="restProps"
                    @input="onInput"
                    @keydown="onKeydown"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </div>
            <span class="icon">@</span>

            <div
                class="input-area"
                :class="{
                    focus: focusedClass,
                    readonly: readonly,
                    disabled: disabled,
                }"
            >
                <input
                    ref="input"
                    :name="_.camelCase(id)"
                    :value="displayValue"
                    placeholder="주소입력"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-bind="restProps"
                    @input="onInput"
                    @keydown="onKeydown"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </div>
        </div>
        <!-- 드롭박스 라벨이 안없어지넹...라벨없애주세여 -->
        <div class="email-domain-select">
            <DropdownBox
                id="dropdown-box01"
                label="이메일 도메인 선택"
                :hidden-label="true"
                :list="list"
                :default-value="null"
                :disabled="false"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch, Ref } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'
import type { BottomSheetOptionItem } from '@components/common/BottomSheet.vue'
import type { DropdownBoxList } from './DropdownBox.vue'

export interface OnChangeParameters {
    value: string
    maxLength?: number
    index?: number
}
type InputType = 'text' | 'number'
interface Validate {
    (value: string): boolean
}

@Component
export default class EmailForm extends Mixins(Validates) {
    @Ref() readonly input!: HTMLInputElement

    /** type 속성 */
    @Prop({ type: String, default: 'text' })
    declare readonly type

    /** form에 사용될 id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** 비활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 유효성 검사 */
    @Prop(Function)
    readonly validate!: Validate

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /** select 타입일 경우 option list를 주입해함!! */
    @Prop({ type: Array, default: () => [] })
    readonly list!: DropdownBoxList

    /**
     * @DATA (State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass = false

    /** 선택영역 노춣 여부 */
    private bottomSheetVisible = false

    /** 선택영역에서 선택한 값 */
    private selectedValue: BottomSheetOptionItem = this.list[0]

    /**
     * @Computed
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
        const conditionsSeperateNumbe = [
            this.value,
            this.type === 'seperateNumber',
        ]
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
        const conditions = [
            this.value.length,
            typeof this.validate === 'function',
        ]
        if (conditions.every(condition => condition)) {
            return this.validate(this.value) ? 'success' : 'error'
        }
        return 'error'
    }

    /** 기타 props */
    get restProps() {
        const props: { [key: string]: string | RegExp | number } = {}

        if (this.pattern) {
            props.pattern = this.pattern
        }

        return props
    }

    /**
     * @Watch
     */

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string, index: number, maxLength: number)
         */
        this.$emit('change', {
            value: newValue,
            fieldName: this._.camelCase(this.id),
        })
    }

    /** @Methods */

    onInput(/* event: InputEvent */) {
        // eslint-disable-next-line no-useless-escape
        this.value = this.input.value.replace(/\,|\-/gi, '')
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

    onBlur(/* event: FocusEvent */) {
        this.focusedClass = false
    }

    clearValue() {
        this.value = ''
        this.input.focus()
    }

    openBottomSheet() {
        this.bottomSheetVisible = true
    }

    closeBottomSheet() {
        this.bottomSheetVisible = false
    }

    onSelectOption(value: string) {
        this.selectedValue = this.list.find(
            option => option.value === value,
        ) as BottomSheetOptionItem
        const changedList = this.list.map(option => {
            option.selected = option.value === value
            return option
        })

        /**
         * 선택된 값은 전달
         * @event select
         */
        this.$emit('select', this.selectedValue)

        /**
         * .sync 수식어를 통한 업데이트
         * @event update:list
         */
        this.$emit('update:list', changedList)
    }

    /** @Lifecycle */
    mounted() {
        /**
         * mounted 이벤트
         * @event mounted
         */
        this.$emit('mounted', this.input)
    }
}
</script>

<style lang="scss" scoped src="./EmailForm.scss"></style>

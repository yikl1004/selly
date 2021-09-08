<template>
    <div class="search-field field-box">
        <LabelTitle
            :id="id"
            label-type="label"
            :hidden-label="hiddenLabel"
            :label="label"
        />
        <div class="flex">
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
                    :value="value"
                    :name="_.camelCase(id)"
                    autocomplete="new-password"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    type="text"
                    :readonly="readonly"
                    :disabled="disabled"
                    @keypress.enter="onKeypressEnter"
                    @input="onInput"
                    @focus="onFocus"
                    @blur="onBlur"
                />
                <Timer
                    v-if="cert"
                    class="counter"
                    :count="timer.count"
                    :unit="timer.unit"
                    :format="timer.format"
                />
                <button
                    v-if="!readonly && !!value.length"
                    type="button"
                    class="clear"
                    @click="clearValue"
                >
                    <i />
                    <span class="ir">전체삭제</span>
                </button>
            </div>
            <button
                class="search-button"
                :disabled="disabled"
                type="button"
                @click="onSearch"
            >
                <span>{{ buttonText }}</span>
            </button>
        </div>

        <TextInputMessage
            v-if="errorMessage"
            :message="errorMessage"
            message-type="error"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins, Ref } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'
import { FormBus } from '@components/form/FormProvider.vue'

export interface OnChangeParameters {
    value: string
}

// interface Validate {
//     (value: string): boolean
// }

interface Timer {
    count: number
    unit: 'minute' | 'second'
    format?: string
}

/**
 * TODO:
 * 2. label에 표시될 tooltip이 아직 공통 컴포넌트가 없음.해야함
 * 3. 단위 표시할 텍스트 노출방식에 대한 논의가 필요함
 */

@Component
export default class ButtonField extends Mixins(Validates) {
    /**
     * @Refs
     */
    @Ref() readonly input!: HTMLInputElement

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

    /** 최대 자릿수 지정 */
    @Prop({ type: Number, default: 9999 })
    readonly maxlength!: number

    /** 입력 전 표시될 가이드 텍스트 */
    @Prop({ type: String, default: '' })
    readonly placeholder!: string

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** 비활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /** 버튼에 들어갈 텍스트 */
    @Prop({ type: String, required: true })
    readonly buttonText!: string

    /** 유형 */
    @Prop({ type: Boolean, default: false })
    readonly cert!: boolean

    /** 타이머 */
    @Prop({ type: Object, default: () => ({ count: 3, unit: 'minute' }) })
    private timer!: Timer

    /** 에러 메세지 */
    @Prop(String)
    readonly errorMessage!: string

    /**
     * @category DATA(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass = false

    /**
     * @title Watch
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

        FormBus.$emit('form:update', {
            value: newValue,
            fieldName: this._.camelCase(this.id),
        })
    }

    @Watch('defaultValue')
    changeDefaultValue(value: string /* oldValue: string */) {
        this.value = value
    }

    /**
     * @category METHOD
     * @title Custom Methods
     */

    toggleFocus() {
        this.focusedClass = !this.focusedClass
    }

    onSearch() {
        /**
         * keydown 이벤트
         * @event search
         */
        this.$emit('search', this.value)
    }

    onKeypressEnter(/* event: KeyboardEvent */) {
        this.onSearch()
    }

    onInput(/* event: InputEvent */) {
        // eslint-disable-next-line no-useless-escape
        this.value = this.input.value.replace(/\,/g, '')
    }

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.toggleFocus()
    }

    onBlur(/* event: FocusEvent */) {
        this.toggleFocus()
    }

    clearValue() {
        this.value = ''
        this.input.focus()
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
        this.$emit('mounted', this.input)

        this.value = this.defaultValue || ''
    }
}
</script>

<style lang="scss" scoped src="./ButtonField.scss"></style>

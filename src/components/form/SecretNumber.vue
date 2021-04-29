<template>
    <div class="text-field">
        <label :for="`${id}-front`" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input
                :id="`${id}-front`"
                ref="front"
                :value="frontValue"
                autocomplete="new-password"
                :pattern="/\d*/"
                :maxlength="6"
                placeholder="생년월일 6자리"
                type="tel"
                :readonly="readonly"
                @input="onInputFront"
                @keydown="onKeydownFront"
                @focus="onFocus"
                @blur="onBlur"
            />
            <span class="dash" />
            <div class="fake-input">
                <div class="fake" @click="onClickFake">
                    <template v-if="backLength === 7">
                        <span v-for="index in backLength" :key="index" :class="{ on: index <= backValue.length }" />
                    </template>
                    <template v-else-if="backLength === 1">
                        <span :class="{ on: backValue.length }" />
                        <span v-for="index in 6" :key="index" class="on" />
                    </template>
                </div>
                <input
                    :id="`${id}-back`"
                    ref="back"
                    class="back"
                    :value="backValue"
                    :pattern="/\d*/"
                    :maxlength="backLength"
                    type="tel"
                    :readonly="readonly"
                    @input="onInputBack"
                    @keydown="onKeydownBack"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins, Watch } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'

@Component
export default class PersonalNumber extends Mixins(Validates) {
    /**
     * @category Types
     */
    $refs!: Vue['$refs'] & {
        front: HTMLInputElement
        back: HTMLInputElement
    }

    /**
     * @category PROPS
     */

    /** form에 사용될 id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 뒷자리 자릿수 */
    @Prop({ type: Number, default: 7 })
    readonly backLength!: number

    /**
     * @category DATA(State)
     */

    /** 실제 값(앞자리) */
    private frontValue: string = ''

    /** 실제 값(뒷자리) */
    private backValue: string = ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /**
     * @category COMPUTED
     */
    get value(): string {
        return `${this.backValue}${this.frontValue}`
    }

    /**
     * @category WATCH
     */
    @Watch('value')
    changeValue() {
        /**
         * 값이 변경 되면 변경된 값을 반환
         * @event change
         */
        this.$emit('change', this.value)
    }

    /**
     * @category METHODS
     */

    onInputFront(event: InputEvent) {
        const { value, maxLength } = this.$refs.front
        const conditions = [value.length === maxLength]

        this.frontValue = value
        conditions.every(condition => condition) && this.$refs.back.focus()
    }

    onInputBack(event: InputEvent) {
        const { value } = this.$refs.back
        this.backValue = value
    }

    onKeydownFront(event: KeyboardEvent) {}

    onKeydownBack(event: KeyboardEvent) {
        const { value } = this.$refs.back
        const conditions = [value.length === 0, event.key.toLowerCase() === 'backspace']

        conditions.every(condition => condition) && this.$refs.front.focus()
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

    onClickFake() {
        this.$refs.back.focus()
    }
}
</script>

<style lang="scss" scoped src="./SecretNumber.scss"></style>

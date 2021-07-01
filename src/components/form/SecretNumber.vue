<template>
    <div class="secret-number" :class="{ password: type === 'card' || type === 'card2' }">
        <LabelTitle id="labelid" title-type="label" :hidden-label="hiddenLabel" :label="label" />
        <div class="input-area" :class="{ focus: focusedClass }">
            <template v-if="isRegistType">
                <input
                    :id="`${id}-front`"
                    ref="front"
                    :value="frontValue"
                    autocomplete="new-password"
                    pattern="[0-9]{6}"
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
            </template>
            <div class="fake-input">
                <div class="fake" @click="onClickFake">
                    <span v-for="index in digit.blank" :key="`regist-blank-${index}`" :class="{ on: index <= secretValue.length }" />
                    <span v-for="index in digit.fill" :key="`regist-fill-${index}`" class="on" />
                </div>
                <input
                    :id="`${id}-back`"
                    ref="back"
                    class="back security"
                    :value="secretValue"
                    :pattern="/\d*/"
                    :maxlength="digit.blank"
                    type="tel"
                    :readonly="readonly"
                    @input="onInputSecret"
                    @keydown="onKeydownBack"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </div>
        </div>

        <TextInputMessage :message="errorMessage" message-type="error" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins, Watch } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'

@Component
export default class SecretNumber extends Mixins(Validates) {
    /**
     * @category Types
     */
    $refs!: Vue['$refs'] & {
        front: HTMLInputElement
        back: HTMLInputElement
    }

    /**
     * @category Props
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

    /** label 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** type */
    @Prop({ type: String, required: true })
    readonly type!: SecretNumberType

    /** 에러 메세지 */
    @Prop(String)
    readonly errorMessage!: string

    /** 성공 메세지 */
    @Prop(String)
    readonly successMessage!: string

    /**
     * @category Data(State)
     */

    /** 실제 값(앞자리) */
    private frontValue: string = ''

    /** 실제 값(뒷자리) */
    private secretValue: string = ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /**
     * @category Computed
     */
    get value(): string {
        return `${this.secretValue}${this.frontValue}`
    }

    /** 마스킹 자릿 수 */
    get digit(): { blank: number; fill: number } {
        const dictionary: { [key: string]: { blank: number; fill: number } } = {
            regist: { blank: 7, fill: 0 },
            registGender: { blank: 1, fill: 6 },
            card: { blank: 4, fill: 0 },
            card2: { blank: 2, fill: 2 },
        }

        return dictionary[this.type]
    }

    /** 주민등록번호 입력 타입인지 확인 */
    get isRegistType(): boolean {
        return ['regist', 'registGender'].some(type => type === this.type)
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
        this.$emit('change', {
            value: this.value,
        })
    }

    /**
     * @category Methods
     */

    private onInputFront(event: InputEvent) {
        const { value, maxLength } = this.$refs.front
        const conditions = [value.length === maxLength]

        this.frontValue = value
        conditions.every(condition => condition) && this.$refs.back.focus()
    }

    private onInputSecret(event: InputEvent) {
        const { value } = this.$refs.back
        this.secretValue = value
    }

    private onKeydownFront(event: KeyboardEvent) {
        this.onlyNumber(event)
    }

    private onKeydownBack(event: KeyboardEvent) {
        const { value } = this.$refs.back
        const conditions = [value.length === 0, event.key.toLowerCase() === 'backspace', this.$refs.front]

        this.onlyNumber(event)
        conditions.every(condition => condition) && this.$refs.front.focus()
    }

    private onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)
        this.focusedClass = true
    }

    private onBlur(event: FocusEvent) {
        this.focusedClass = false
    }

    private onClickFake() {
        this.$refs.back.focus()
    }
}
</script>

<style lang="scss" scoped src="./SecretNumber.scss"></style>

<template>
    <div class="text-field">
        <label :for="`${id}-front`" :class="{ ir: hiddenLabel }">{{ label }}</label>
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
                    <template v-if="isRegist">
                        <span v-for="index in digit" :key="`regist-blank-${index}`" :class="{ on: index <= secretValue.length }" />
                    </template>
                    <template v-else-if="isRegisteGender">
                        <span :class="{ on: secretValue.length }" />
                        <span v-for="index in 6" :key="`regist-fill-${index}`" class="on" />
                    </template>
                    <template v-else-if="isCard">
                        <span v-for="index in 4" :key="`regist-blank-${index}`" :class="{ on: index <= secretValue.length }" />
                    </template>
                    <template v-else-if="isCard2">
                        <span v-for="index in 2" :key="`card-blank-${index}`" :class="{ on: index <= secretValue.length }" />
                        <span v-for="index in 2" :key="`card-fill-${index}`" class="on" />
                    </template>
                </div>
                <input
                    :id="`${id}-back`"
                    ref="back"
                    class="back security"
                    :value="secretValue"
                    :pattern="/\d*/"
                    :maxlength="digit"
                    type="tel"
                    :readonly="readonly"
                    @input="onInputSecret"
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
import { SecretType } from '@/types'

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

    /** label 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** type */
    @Prop({ type: String, required: true })
    readonly type!: SecretType

    /** 마스킹 자릿수 */
    // @Prop({ type: Number, default: 7 })
    // readonly backLength!: number

    /**
     * @category DATA(State)
     */

    /** 실제 값(앞자리) */
    private frontValue: string = ''

    /** 실제 값(뒷자리) */
    private secretValue: string = ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /**
     * @category COMPUTED
     */
    get value(): string {
        return `${this.secretValue}${this.frontValue}`
    }

    /** 마스킹 자릿 수 */
    get digit(): number {
        const dictionary = {
            regist: 7,
            registeGender: 1,
            card: 4,
            card2: 2,
        }

        return dictionary[this.type]
    }

    /** 주민등록번호 입력 타입인지 확인 */
    get isRegistType(): boolean {
        return ['regist', 'registGender'].some(type => type === this.type)
    }
    /** 주민등록번호 7자리 */
    get isRegist(): boolean {
        return this.type === 'regist'
    }
    /** 주민등록번호 성별 1자리 */
    get isRegisteGender(): boolean {
        return this.type === 'registeGender'
    }
    /** 카드번호 전체 */
    get isCard(): boolean {
        return this.type === 'card'
    }
    /** 카드번호 앞 2자리 */
    get isCard2(): boolean {
        return this.type === 'card2'
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

<template>
    <div class="text-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area">
            <input
                :id="id"
                ref="input"
                :value="displayValue"
                autocomplete="new-password"
                :pattern="pattern"
                v-bind="$attrs"
                :maxlength="maxlength"
                :placeholder="placeholder"
                :type="inputType"
                :readonly="readonly"
                @input="onInput"
                @keydown="onKeydown"
                @focus="onFocus"
            />
            <span v-if="unit" class="unit">
                {{ unit }}
            </span>
            <button v-show="!!value.length" type="button" class="clear" @click="clearValue">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>
        <p v-if="value.length > 0" class="message">
            {{ isError ? errorMessage : successMessage }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import _ from 'lodash'

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
 * TODO
 * 1. validation에 따른 success, failed 스타일 처리 해야함
 * 2. label에 표시될 tooltip이 아직 공통 컴포넌트가 없음, 해야함
 * 3. 단위 표시할 텍스트 노출방식에 대한 논의가 필요함
 */

const MESSAGE = {
    error: '희망한도를 입력해 주세요.',
    success: '성공메시지 입니다',
}

@Component
export default class TextField extends Vue {
    /**
     * @category PROPS
     */

    /** type 속성 */
    @Prop({ type: String, default: 'text', required: false })
    readonly type!: 'text' | 'number' | 'seperateNumber'

    /** form에 사용될 id */
    @Prop({ type: String, default: 'textField', required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly hiddenLabel!: boolean

    /** name 속성 지정 */
    @Prop({ type: String, default: '', required: true })
    readonly name!: string

    /** 최대 자릿수 지정 */
    @Prop({ type: Number, default: Infinity, required: false })
    readonly maxlength!: number

    /** 입력 전 표시될 가이드 텍스트 */
    @Prop({ type: String, default: '', required: false })
    readonly placeholder!: string

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly readonly!: boolean

    /** 단위 표시 */
    @Prop({ type: String, default: '', required: false })
    readonly unit!: string

    /** 유효성 검사 */
    @Prop({ type: Function, required: false })
    readonly validate!: Validate

    /** 에러 메세지 */
    @Prop({ type: String })
    readonly errorMessage!: string

    /** 성공 메세지 */
    @Prop({ type: String })
    readonly successMessage!: string

    /**
     * @category DATA(State)
     */

    /** 실제 값 */
    private value: string = ''

    /** 에러 메세지 */
    private message: string = MESSAGE.error

    /**
     * @category COMPUTED
     */
    get pattern(): string {
        return this.inputType === 'number' ? '\\d*' : ''
    }

    get index(): number {
        return _.toNumber(this.$attrs['data-index'])
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
        if (this.value && this.type === 'seperateNumber') {
            return _.toNumber(this.value).toLocaleString()
        }
        return this.value
    }

    /** 에러 여부 */
    get isError(): boolean {
        if (this.validate(this.value)) {
            return false
        }

        return true
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
        const { shiftKey, ctrlKey, metaKey, altKey } = event
        const target = event.target as HTMLInputElement
        const value = target.value
        const isBackspace = event.key.toLowerCase() === 'backspace'

        const conditions = [
            this.type === 'number' || this.type === 'seperateNumber',
            value.length >= this.maxlength,
            !(shiftKey || ctrlKey || metaKey || altKey || isBackspace),
        ]

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
    }

    onInput(event: InputEvent) {
        const target = event.target as HTMLInputElement
        this.value = target.value.replace(/\,/g, '')
    }

    onKeydown(event: KeyboardEvent) {
        this.applyMaxLength(event)

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
    }

    clearValue() {
        /**
         * @description value를 초기화하고, onFocus 함
         */

        const target = this.$refs.input as HTMLInputElement
        this.value = ''
        target.focus()
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

<style lang="scss" scoped>
.text-field {
    position: relative;

    label {
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: -0.5px;
        color: #666;
        display: block;
        margin-bottom: 7px;
    }

    .input-area {
        position: relative;
        /* max-width: 600px; */

        input {
            border-radius: 10px;
            border: solid 1px #ebebeb;
            font-size: 16px;
            font-weight: 500;
            line-height: normal;
            letter-spacing: -0.5px;
            color: #222;
            height: 56px;
            box-sizing: border-box;
            width: 100%;
            padding: 19px 20px 18px;

            &::-webkit-input-placeholder {
                color: #bbb;
            }

            &:focus {
                outline: none;
                border-color: #544944;
            }

            &:read-only {
                background-color: #f3f3f3;
                border: 0;
            }
        }

        button.clear {
            width: 24px;
            height: 24px;
            background: transparent;
            position: absolute;
            bottom: 16px;
            right: 16px;

            i {
                width: 16px;
                height: 16px;
                background-color: #bbb;
                display: block;
                border-radius: 8px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) rotate(45deg);

                &:before,
                &:after {
                    content: '';
                    display: block;
                    background-color: #fff;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                &:before {
                    width: 11px;
                    height: 2px;
                }
                &:after {
                    width: 2px;
                    height: 11px;
                }
            }
        }
    }

    &.error {
        .input-area {
            input {
                border: solid 1px #ee1100;
            }
        }
        .message {
            color: #ee1100;
            background-image: url('/assets/icon/icon-info-outline.svg');
        }
    }
    &.success {
        .input-area {
            input {
                border: solid 1px #5089ca;
            }
        }
        .message {
            color: #5089ca;
            background-image: url('/assets/icon/icon-check-outline.svg');
        }
    }

    .message {
        font-size: 12px;
        letter-spacing: -0.5px;
        font-weight: normal;
        margin-top: 8px;
        display: flex;
        padding-left: 20px;
        background-size: 14px 14px;
        background-repeat: no-repeat;
        background-position: 0px 0px;
    }
}
</style>

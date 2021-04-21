<template>
    <div class="text-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <input
            :id="id"
            ref="input"
            :value="value"
            autocomplete="new-password"
            :pattern="pattern"
            v-bind="$attrs"
            :maxlength="maxlength"
            :placeholder="placeholder"
            @input="onInput"
            @keydown="onKeydown"
            @focus="onFocus"
        />
        <button type="button" class="clear" @click="clearValue">
            <i />
            <span class="ir">전체삭제</span>
        </button>
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

@Component
export default class TextField extends Vue {
    /** type 속성 */
    @Prop({ type: String, default: 'text', required: false })
    readonly type!: 'text' | 'number'

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

    @Prop({ type: String, default: '', required: false })
    readonly placeholder!: string

    /** 타이핑한 값 */
    private value: string = ''

    get pattern(): string {
        // const
        return '\\d*'
    }

    get index(): number {
        return _.toNumber(this.$attrs['data-index'])
    }

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string, index: number, maxLength: number)
         */
        this.$emit('change', newValue, this.index, this.maxlength)
    }

    applyMaxLength(event: KeyboardEvent) {
        const { shiftKey, ctrlKey, metaKey, altKey } = event
        const target = event.target as HTMLInputElement
        const value = target.value
        const isBackspace = event.key.toLowerCase() === 'backspace'

        const conditions = [
            this.type === 'number',
            value.length >= this.maxlength,
            !(shiftKey || ctrlKey || metaKey || altKey || isBackspace),
        ]

        conditions.every(condition => condition) && event.preventDefault()
    }

    onInput(event: InputEvent) {
        const target = event.target as HTMLInputElement
        this.value = target.value
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

    mounted() {
        /**
         * mounted 이벤트
         * @event mounted
         */
        this.$emit('mounted', this.$refs.input)
    }

    clearValue() {
        // TODO: 전체 value 삭제하는 기능 추가해야함
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
        max-width: 600px;
        width: 100%;
        padding: 19px 20px 18px;

        &::-webkit-input-placeholder {
            color: #bbb;
        }

        &:focus {
            outline: none;
            border-color: #544944;
        }
    }

    button.clear {
        width: 24px;
        height: 24px;
        background: transparent;

        i {
        }
    }
}
</style>

<template>
    <button :type="buttonType" class="btn" :class="[type, size]" :disabled="disabled" @click="onClick">
        <span class="text">
            <slot />
        </span>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type Size = 'large' | 'medium' | 'small'
type ButtonType = 'button' | 'submit'
type DesignType = 'basic' | 'line'

@Component
export default class BasicButton extends Vue {
    /** 디자인 타입 */
    @Prop({ type: String, default: 'basic', required: false })
    readonly type!: DesignType

    /** submit 타입 사용여부(true일 경우 props key만 사용, react 처럼) */
    @Prop({ type: Boolean, default: false, required: false })
    readonly submit!: boolean

    /** 활성화 상태 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly disabled!: boolean

    /** 사이즈 */
    @Prop({ type: String, default: 'large', required: false })
    readonly size!: Size

    /** submit props에 따라 button tag의 attribute를 결정 */
    get buttonType(): ButtonType {
        return this.submit ? 'submit' : 'button'
    }

    onClick(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('onClick', event)
    }
}
</script>

<style lang="scss" scoped>
$bg: #544944;
$bg-active: #302a28;
$bg-disabled: #ebebeb;
$bg-small: #5089ca;
$bg-small-active: #2d4f76;
$text: #fff;
$text-disabled: #bbb;

.btn {
    width: 100%;
    letter-spacing: -0.5px;
    text-align: center;
    color: $text;
    display: flex;
    justify-content: center;
    align-items: center;

    &.large {
        max-width: 312px;
        font-size: 16px;
        font-weight: 500;
        padding: 19px 40px 18px;
        border-radius: 10px;
        background-color: $bg;

        &:active {
            background-color: $bg-active;
        }

        &:disabled {
            background-color: $bg-disabled;
            color: $text-disabled;
        }
    }

    &.medium {
        max-width: 312px;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 40px 12px;
        border-radius: 24px;
        background-color: $bg;

        &:active {
            background-color: $bg-active;
        }

        &:disabled {
            background-color: $bg-disabled;
            color: $text-disabled;
        }
    }

    &.small {
        min-width: 64px;
        width: auto;
        font-size: 12px;
        font-weight: bold;
        line-height: 1.5;
        padding: 7px 16px 7px;
        border-radius: 16px;
        background-color: $bg-small;

        &:active {
            background-color: $bg-small-active;
        }

        &:disabled {
            background-color: $bg-disabled;
        }
    }

    &.line {
        box-sizing: border-box;
        border: 1px solid #999;
        background-color: #fff;
        color: #222;

        &:active {
            background-color: #fafafa;
        }

        &.disabled {
            color: #bbb;
            border: solid 1px #ebebeb;
        }
    }
}
</style>

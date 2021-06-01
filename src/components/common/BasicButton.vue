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

@Component
export default class BasicButton extends Vue {
    /**
     * @category Props
     */
    /** 디자인 타입 */
    @Prop({ type: String, default: 'basic' })
    readonly type!: BasicButtonDesignType

    /** submit 타입 사용여부(true일 경우 props key만 사용, react 처럼) */
    @Prop({ type: Boolean, default: false })
    readonly submit!: boolean

    /** 활성화 상태 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 사이즈 */
    @Prop({ type: String, default: 'large' })
    readonly size!: Size

    /**
     * @category Computed
     */
    /** submit props에 따라 button tag의 attribute를 결정 */
    get buttonType(): ButtonType {
        return this.submit ? 'submit' : 'button'
    }

    /**
     * @category Methods
     */
    onClick(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('onClick', event)
    }
}
</script>

<style lang="scss" scoped>
.btn {
    width: 100%;
    letter-spacing: -0.5px;
    text-align: center;
    color: $button-text-color;
    display: flex;
    justify-content: center;
    align-items: center;

    &.large {
        max-width: 400px;
        font-size: 16px;
        font-weight: 500;
        padding: 19px 40px 18px;
        border-radius: 10px;
        background-color: $button-bg;

        &:active {
            background-color: $button-bg-active;
        }

        &:disabled {
            background-color: $button-bg-disabled;
            color: $button-text-disabled-color;
        }
    }

    &.medium {
        max-width: 400px;
        font-size: 14px;
        font-weight: bold;
        padding: 15px 40px 12px;
        border-radius: 24px;
        background-color: $button-bg;

        &:active {
            background-color: $button-bg-active;
        }

        &:disabled {
            background-color: $button-bg-disabled;
            color: $button-text-disabled-color;
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
        background-color: $button-bg-small;

        &:active {
            background-color: $button-bg-small-active;
        }

        &:disabled {
            background-color: $button-bg-disabled;
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

    /* &.with {
        padding: 22px;
        border-radius: 10px;
        background-color: #5089ca;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: -0.5px;
        text-align: center;
        color: #ffffff;

        &:active {
            background-color: #2d4f76;
        }

        &:disabled {
            background-color: #ebebeb;
            color: #bbb;
        }
    } */
}
</style>

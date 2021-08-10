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

/**
 * @description 디자인타입을 결정합니다.
 */
export type BasicButtonDesignType =
    | 'basic' // 기본
    | 'with' // 버튼과 함께 쓰이는 형태
    | 'textBlue' // 텍스트버튼_파랑
    | 'textGray' // 텍스트버튼_회색
    | 'dialogBlue' // dialog버튼_파랑
    | 'dialogWhite' // dialog버튼_흰색
    | 'more' // 더보기

@Component
export default class BasicButton extends Vue {
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
    @Prop({ type: String })
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
        this.$emit('click', event)
    }
}
</script>

<style lang="scss" scoped src="./BasicButton.scss"></style>

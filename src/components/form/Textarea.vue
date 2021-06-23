<template>
    <div class="textarea-box" :class="isError">
        <LabelTitle id="labelid" title-type="label" :hidden-label="hiddenLabel" label="lable" />
        <div class="input-area" :class="{ focus: focusedClass, readonly: readonly, disabled: disabled }">
            <textarea
                :id="id"
                ref="textarea"
                :name="_.camelCase(id)"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                @focus="onFocus"
            />
            <div class="text-counter">
                <span>0/200</span>
            </div>
        </div>
        <!--//유효성 검사가 되어 메시지 노출할때만 보여줌. -->
        <TextInputMessage :message="errorMessage" message-type="error" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'

interface Validate {
    (value: string): boolean
}

@Component
export default class Textarea extends Mixins(Validates) {
    /**
     * @category Refs
     */
    $refs!: Vue['$refs'] & {
        input: HTMLInputElement
    }

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

    /** 입력 전 표시될 가이드 텍스트 */
    @Prop({ type: String, default: '' })
    readonly placeholder!: string

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** 비활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 유효성 검사 */
    @Prop(Function)
    readonly validate!: Validate

    /** 에러케이스_퍼블확인용 */
    @Prop({ type: String })
    readonly isError!: string

    /** 에러 메세지 */
    @Prop(String)
    readonly errorMessage!: string

    /** 성공 메세지 */
    @Prop(String)
    readonly successMessage!: string

    /**
     * @category DATA(State)
     */

    /** focus 상태 */
    private focusedClass: boolean = false

    /**
     * @category METHOD
     * @title Custom Methods
     */

    toggleFocus() {
        this.focusedClass = !this.focusedClass
    }

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.toggleFocus()
    }
}
</script>

<style lang="scss" scoped src="./Textarea.scss"></style>

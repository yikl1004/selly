<template>
    <div class="address-field">
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="address-box">
            <BasicButton size="medium" @click="openPopup">
                주소 찾기
            </BasicButton>
        </div>
        <div class="flex">
            <div class="input-area readonly">
                <input
                    :id="id"
                    ref="input"
                    :value="zipcode"
                    :name="_.camelCase(id)"
                    autocomplete="new-password"
                    :maxlength="maxlength"
                    type="text"
                    disabled
                    @input="onInput"
                    @blur="onBlur"
                />
            </div>
            <button class="search-button" :disabled="disabled" type="button" @click="openPopup">
                <span>검색</span>
            </button>
        </div>

        <div class="input-area readonly">
            <input
                ref="input"
                :value="road"
                :name="_.camelCase(id)"
                autocomplete="new-password"
                :maxlength="maxlength"
                type="text"
                disabled
                @input="onInput"
                @blur="onBlur"
            />
        </div>
        <div class="input-area" :class="{ focus: focusedClass, readonly: readonly, disabled: disabled }">
            <input
                :id="id"
                ref="input"
                :value="value"
                :name="_.camelCase(id)"
                :maxlength="maxlength"
                placeholder="상세주소 입력"
                required
                autocomplete="new-password"
                type="text"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
            />
            <button v-if="!readonly && !!value.length" type="button" class="clear" @click="clearValue">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>

        <!-- popup : 주소찾기 -->
        <FullPopup :show.sync="show" title="주소 찾기" type="popup">
            <PopupAddressFind @select="onJusoSelect" />
        </FullPopup>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'
import { FormBus } from '@components/form/FormProvider.vue'

export interface OnChangeParameters {
    value: string
}

interface Validate {
    (value: string): boolean
}

@Component
export default class AddressField extends Mixins(Validates) {
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

    /** 최대 자릿수 지정 */
    @Prop({ type: Number, default: 9999 })
    readonly maxlength!: number

    /** 읽기전용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** 비활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    // s: popup
    private show: boolean = false
    openPopup() {
        this.show = true
    }
    onConfirm() {
        this.show = false
    }

    onCancel() {
        console.log('after close modal')
    }
    // e: popup

    /**
     * @category DATA(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 우편번호 */
    private zipcode: string = ''

    /** 도로명 주소 */
    private road: string = ''

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

    /**
     * @category METHOD
     * @title Custom Methods
     */

    toggleFocus() {
        this.focusedClass = !this.focusedClass
    }

    onInput(event: InputEvent) {
        this.value = this.$refs.input.value.replace(/\,/g, '')
    }

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.toggleFocus()
    }

    onBlur(event: FocusEvent) {
        this.toggleFocus()
    }

    clearValue() {
        this.value = ''
        this.$refs.input.focus()
    }

    /** 주소를 선택 했을 떄 */
    onJusoSelect({ zipcode, road }: { zipcode: string; road: string }) {
        this.zipcode = zipcode
        this.road = road
        this.show = false
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
    }
}
</script>

<style lang="scss" scoped src="./AddressField.scss"></style>

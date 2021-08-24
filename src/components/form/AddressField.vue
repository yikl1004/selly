<template>
    <div class="address-field">
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <!-- <div class="address-box">
            <BasicButton size="medium" @click="openPopup">
                주소 찾기
            </BasicButton>
        </div> -->
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
            <button
                class="search-button"
                :disabled="disabled"
                type="button"
                @click="openPopup"
            >
                <span>검색</span>
            </button>
        </div>

        <div class="input-area readonly">
            <input
                ref="input"
                autocomplete="new-password"
                type="text"
                disabled
                :value="road"
                :name="_.camelCase(id)"
                :maxlength="maxlength"
                @input="onInput"
                @blur="onBlur"
            />
        </div>
        <div
            class="input-area"
            :class="{
                focus: focusedClass,
                readonly: readonly,
                disabled: disabled,
            }"
        >
            <input
                :id="id"
                ref="input"
                placeholder="상세주소 입력"
                required
                autocomplete="new-password"
                type="text"
                :value="value"
                :name="_.camelCase(id)"
                :maxlength="maxlength"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
            />
            <button
                v-if="!readonly && !!value.length"
                type="button"
                class="clear"
                @click="clearValue"
            >
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
import { Component, Prop, Watch, Mixins, Ref } from 'vue-property-decorator'
import Validates from '@utils/mixins/Validates'
import { FormBus } from '@components/form/FormProvider.vue'

// interface Validate {
//     (value: string): boolean
// }

export interface AddressItem {
    fieldName: string
    road: string
    value: string
    zipcode: string
}

@Component
export default class AddressField extends Mixins(Validates) {
    @Ref() readonly input!: HTMLInputElement

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
    @Prop(Object)
    readonly defaultValue!: {
        zipcode?: string
        road?: string
        value?: string
    }

    // s: popup
    private show = false
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
    private value = ''

    /** focus 상태 */
    private focusedClass = false

    /** 우편번호 */
    private zipcode = ''

    /** 도로명 주소 */
    private road = ''

    /**
     * @title Watch
     */

    @Watch('value')
    changeValue(newValue: string) {
        this.changeData({ value: newValue })

        FormBus.$emit('form:update', {
            value: newValue,
            fieldName: this._.camelCase(this.id),
        })
    }

    @Watch('road')
    changeRoad(value: string /* oldValue: string */) {
        this.changeData({ road: value })
    }

    @Watch('zipcode')
    changeZipcode(value: string /* oldValue: string */) {
        this.changeData({ zipcode: value })
    }

    /**
     * @Methods
     */

    changeData(data: { zipcode?: string; road?: string; value?: string }) {
        /**
         * 주소 변경 감지
         * @event change
         */
        this.$emit('change', {
            zipcode: data.zipcode || this.zipcode,
            road: data.road || this.road,
            value: data.value || this.value,
            fieldName: this._.camelCase(this.id),
        })
    }

    toggleFocus() {
        this.focusedClass = !this.focusedClass
    }

    onInput(/* event: InputEvent */) {
        // eslint-disable-next-line no-useless-escape
        this.value = this.input.value.replace(/\,/g, '')
    }

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.toggleFocus()
    }

    onBlur(/* event: FocusEvent */) {
        this.toggleFocus()
    }

    clearValue() {
        this.value = ''
        this.input.focus()
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

    created() {
        console.log('created', JSON.stringify(this.$props))
    }

    mounted() {
        /**
         * mounted 이벤트
         * @event mounted
         */
        this.$emit('mounted', this.input)

        this.value = this.defaultValue.value || ''
        this.zipcode = this.defaultValue.zipcode || ''
        this.road = this.defaultValue.road || ''
    }
}
</script>

<style lang="scss" scoped src="./AddressField.scss"></style>

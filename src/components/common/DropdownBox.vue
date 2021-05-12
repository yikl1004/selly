<template>
    <div class="dropdown-box">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass, 'select-type': true }">
            <input :id="id" type="text" :name="name" readonly @focus="onFocus" @blur="onBlur" @click="onClick" />
            <button type="button" class="select-button">
                {{ label }}
                <i class="open" />
            </button>
            <portal to="bottomSheet">
                <BottomSheet
                    :show="bottomSheetVisible"
                    :title="label"
                    :list="list"
                    :selected-value="{}"
                    @close="closeBottomSheet"
                    @select-option="onSelectOption"
                />
            </portal>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { OptionItem } from './BottomSheet.vue'

@Component
export default class DropdownBox extends Vue {
    /**
     * @category PROPS
     */

    /** form에 사용될 id */
    @Prop({ type: String })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** name 속성 지정 */
    @Prop({ type: String, default: '', required: true })
    readonly name!: string

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /** option list를 주입해함!! */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: OptionItem[]

    /**
     * @category Data(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 선택영역 노춣 여부 */
    private bottomSheetVisible: boolean = false

    /** 선택영역에서 선택한 값 */
    private selectedValue?: OptionItem

    /**
     * @category Methods
     */

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.focusedClass = true
        console.log(11111)
    }

    onBlur(event: FocusEvent) {
        this.focusedClass = false
    }

    openBottomSheet(event: FocusEvent) {
        this.bottomSheetVisible = true
    }

    closeBottomSheet() {
        this.bottomSheetVisible = false
    }

    onSelectOption(value: string) {
        const selectedValue = this.list.find(item => item.value === value) as OptionItem
        this.selectedValue = this.list.find(item => item.value === value) as OptionItem
        console.log(value, selectedValue)

        /**
         * 선택된 값은 전달
         * @event select
         */
        this.$emit('select', this.selectedValue)
    }

    onClick(event: FocusEvent) {
        this.openBottomSheet(event)
    }
}
</script>

<style scoped lang="scss" src="./DropdownBox.scss"></style>

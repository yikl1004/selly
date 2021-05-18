<template>
    <div class="dropdown-box">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass, 'select-type': true }">
            <input :id="id" type="text" :name="name" readonly @focus="onFocus" @blur="onBlur" @click="onClick" />
            <span class="selected-display-name">
                {{ selectedDisplayName }}
            </span>
            <i class="open" />
            <portal to="bottomSheet">
                <BottomSheet
                    :show="bottomSheetVisible"
                    :title="label"
                    :list="list"
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
     * @category Computed
     */

    /** 보여지는 선택된 이름 */
    get selectedDisplayName(): string {
        const name = this.list.find(option => option.selected)
        return (name && name.displayName) || this.label
    }

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
        const selectedValue = this.list.find(option => option.value === value) as OptionItem
        const changedList = this.list.map(option => {
            option.selected = option.value === value
            return option
        })
        this.selectedValue = selectedValue

        /**
         * 선택된 값은 전달
         * @event select
         */
        this.$emit('select', this.selectedValue)

        /**
         * 변경된 option list를 업데이트 합니다
         * @event update:list
         */
        this.$emit('update:list', changedList)

        this.closeBottomSheet()
    }

    onClick(event: FocusEvent) {
        this.openBottomSheet(event)
    }
}
</script>

<style scoped lang="scss" src="./DropdownBox.scss"></style>

<template>
    <div class="dropdown-box">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass, 'select-type': true }">
            <input :id="id" type="text" :name="_.camelCase(id)" readonly @focus="onFocus" @blur="onBlur" @click="onClick" />
            <span class="selected-display-name">
                {{ selectedDisplayName }}
            </span>
            <i class="open" />
            <portal to="bottomSheet">
                <BottomSheet
                    :show="bottomSheetVisible"
                    :title="label"
                    :list="selectList"
                    @close="closeBottomSheet"
                    @select-option="onSelectOption"
                />
            </portal>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FormBus, FormUpdateEvent } from './FormProvider.vue'

@Component
export default class DropdownBox extends Vue {
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

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /** option list를 주입해함!! */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: DropdownBoxList

    /**
     * @category Data(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 선택영역 노춣 여부 */
    private bottomSheetVisible: boolean = false

    /** props로 받은 리스트 */
    private selectList: DropdownBoxList = this.list || []

    /**
     * @category Computed
     */

    /** 보여지는 선택된 이름 */
    get selectedDisplayName(): string {
        const name = this.selectList.find(option => option.selected)
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
        // const selectedValue = this.list.find(option => option.value === value) as BottomSheetOptionItem
        const changedList = this.list.map(option => {
            option.selected = option.value === value
            return option
        })
        this.value = value
        this.selectList = changedList

        /**
         * 선택된 값을 select 이벤트를 통해 전달
         * @event select
         */
        this.$emit('select', this.value)

        /**
         * 변경된 option list를 업데이트(sync 수식어) ****** 보류
         * @event update:list
         */
        // this.$emit('update:list', changedList)

        FormBus.$emit(FormUpdateEvent, {
            value,
            fieldName: this._.camelCase(this.id),
        })

        this.closeBottomSheet()
    }

    onClick(event: FocusEvent) {
        this.openBottomSheet(event)
    }

    init() {
        if (this.defaultValue) {
            this.selectList = this.selectList.map(item => {
                item.selected = this.defaultValue === item.value
                return item
            })
        }
    }

    mounted() {
        this.init()
    }
}
</script>

<style scoped lang="scss" src="./DropdownBox.scss"></style>

<template>
    <div class="check-box-group">
        <h3 class="title">
            {{ title }}
        </h3>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input
                :id="`${id}-all`"
                :checked="allCheck"
                type="checkbox"
                :disabled="disabled"
                :name="name"
                @change="onChangeAllCheck"
                @focus="onFocus"
                @blur="onBlur"
            />
            <label class="display-name" :for="`${id}-all`">전체동의</label>
            <button type="button" :class="['open', { opened: open }]" @click="toggle">
                <span class="ir">{{ open ? '열림' : '닫힘' }}</span>
            </button>
        </div>
        <div v-if="list.length" :class="['check-list', { opened: open }]">
            <div class="check-list-wrapper">
                <div v-for="(check, index) in list" :key="`check-box-group-${name}-${index}`" class="check-list-item">
                    <CheckBox v-bind="getCheckBoxProps(index)" @change="onChangeCheckBox" />
                    <a class="term" href="#">보기</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { CheckboxProps } from '@components/form/CheckBox.vue'

export type CheckListItem = Omit<CheckboxProps, 'id' | 'name' | 'type'> & { value: string }
export type CheckList = CheckListItem[]

/**
 * TODO: 보기 링크를 아직 만들지 않았음...
 */

@Component
export default class CheckBoxGroup extends Vue {
    /**
     * @category Prop
     */

    /** 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** form name */
    @Prop({ type: String, required: true })
    readonly name!: string

    /** id attribute */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** 비활성화 사용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 체크박스 리스트 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: CheckListItem[]

    @Prop({ type: String, default: 'normal' })
    readonly listType!: 'normal' | 'circle'

    /**
     * @category Data(State)
     */

    /** 포커스 상태 관리 */
    private focusedClass: boolean = false

    /** 토글 상태 */
    private open: boolean = false

    /** 전체 체크 여부 */
    private allCheck: boolean = false

    /**
     * @category Computed
     */

    /**
     * @category Watch
     */

    @Watch('list')
    changeList(newValue: CheckListItem[], oldValue: CheckListItem[]) {
        this.allCheck = newValue.every(item => item.checked)
    }

    /**
     * @category Methods
     */

    onFocus() {
        this.focusedClass = true
    }

    onBlur() {
        this.focusedClass = false
    }

    toggle() {
        this.open = !this.open
    }

    getCheckBoxProps(index: number): CheckboxProps {
        const item = this.list[index]
        return {
            id: `${this.name}-${index}`,
            type: this.listType,
            name: `${this.name}-${item.value}`,
            checked: !!item.checked,
            label: item.label,
            index,
        }
    }

    changedValue(checkedList: CheckListItem[]) {
        /**
         * 값이 변경 될때 마다 이벤트 호출
         * @event change
         */
        this.$emit('change', checkedList)
    }

    onChangeCheckBox(checked: boolean, index: number) {
        const checkedList = this._.cloneDeep(this.list).map((item, itemIndex) => {
            item.checked = index === itemIndex ? checked : !!item.checked
            return item
        })

        this.changedValue(checkedList)
    }

    onChangeAllCheck(event: InputEvent) {
        const target = event.target as HTMLInputElement
        const checked = target.checked
        const checkedList = this._.cloneDeep(this.list).map((item, itemIndex) => {
            item.checked = checked
            return item
        })
        this.changedValue(checkedList)
    }

    mounted() {
        console.log('<CheckBoxGroup />', this.list)
    }
}
</script>

<style lang="scss" src="./CheckBoxGroup.scss"></style>

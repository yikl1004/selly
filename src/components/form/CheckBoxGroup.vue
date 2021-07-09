<template>
    <div class="check-box-group">
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="check-box-area">
            <!-- 클래스에 checked 추가시 체크표시 -->
            <button type="button" class="btn-checkbox" :disabled="disabled">
                <i>{{ value }}</i>
            </button>
            <button v-if="list.length" type="button" :class="['open', { opened: open }]" @click="toggle">
                <span class="ir">{{ open ? '열림' : '닫힘' }}</span>
            </button>
        </div>
        <div v-if="list.length" :class="['check-list', { opened: open }]">
            <div class="check-list-wrapper">
                <!-- 동의 리스트가 두개 들어올 경우 동의내용에 대한 타이틀 노출 필요 -->
                <div class="check-list-title">
                    <strong>개인(신용)정보 동의</strong>
                </div>
                <div class="check-list-box">
                    <div v-for="(check, index) in list" :key="`check-box-group-${name}-${index}`" class="check-list-item">
                        <CheckBox v-bind="getCheckBoxProps(index)" @change="onChangeCheckBox" />
                        <BasicButton type="textBlue">
                            보기
                        </BasicButton>
                    </div>
                </div>
                <!-- 체크박스가 2줄로 나오는 케이스가 있음. check-list-box에 col 클래스 추가 -->
                <div class="check-list-title">
                    <strong>개인(신용)정보 동의</strong>
                </div>

                <div class="check-list-box col">
                    <div v-for="(check, index) in list" :key="`check-box-group-${name}-${index}`" class="check-list-item">
                        <CheckBox v-bind="getCheckBoxProps(index)" @change="onChangeCheckBox" />
                    </div>
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

    /** 내용(버튼 텍스트) */
    @Prop({ type: String })
    readonly value!: string

    /** form name */
    @Prop({ type: String, required: true })
    readonly name!: string

    /** id attribute */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** 비활성화 사용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** label */
    @Prop({ type: String })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 체크박스 리스트 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: CheckListItem[]

    @Prop({ type: String, default: 'normal' })
    readonly listType!: 'normal' | 'square'

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
            checked: !!item.checked,
            label: item.label,
            index,
            disabled: this.disabled || this.list[index].disabled,
        }
    }

    changedValue(checkedList: CheckListItem[]) {
        /**
         * 값이 변경 될때 마다 이벤트 호출
         * @event change
         */
        this.$emit('change', checkedList)
    }

    onChangeCheckBox({ value, index }: { value: boolean; index: number }) {
        const checkedList = this._.cloneDeep(this.list).map((item, itemIndex) => {
            item.checked = index === itemIndex ? value : !!item.checked
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
        this.allCheck = this.list.every(item => item.checked)
    }
}
</script>

<style lang="scss" src="./CheckBoxGroup.scss"></style>

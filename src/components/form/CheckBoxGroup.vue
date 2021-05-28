<template>
    <div class="check-box-group">
        <h3 class="title">
            {{ title }}
        </h3>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input :id="`${id}-all`" type="checkbox" :disabled="disabled" :name="name" @focus="onFocus" @blur="onBlur" />
            <label class="display-name" :for="`${id}-all`">
                전체동의
            </label>
            <button type="button" :class="['open', { opened: open }]" @click="toggle">
                <span class="ir">{{ open ? '열림' : '닫힘' }}</span>
            </button>
        </div>
        <div v-if="list.length" :class="['check-list', { opened: open }]">
            <CheckBox
                v-for="(check, index) in list"
                :key="`check-box-group-${name}-${index}`"
                v-bind="getCheckBoxProps(index)"
                @change="onChangeCheckBox"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, ProvideReactive, Vue } from 'vue-property-decorator'
import { CheckboxProps } from '@components/form/CheckBox.vue'

export type CheckListItem = Omit<CheckboxProps, 'id' | 'name' | 'type' | 'defaultValue'> & { value: string }
export type CheckList = CheckListItem[]

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

    /**
     * @category Data(State)
     */

    /** 포커스 상태 관리 */
    private focusedClass: boolean = false

    /** 토글 상태 */
    private open: boolean = false

    /** 전체 체크 여부 */

    /**
     * @category Computed
     */

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
            type: 'normal',
            name: `${this.name}-${item.value}`,
            defaultValue: false,
            label: item.label,
        }
    }

    onChangeCheckBox() {}
}
</script>

<style scoped lang="scss" src="./CheckBoxGroup.scss"></style>

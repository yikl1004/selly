<template>
    <div class="check-box-area">
        <div class="check-box" :class="type">
            <label>
                <input :id="id" v-model="value" value="sdkj" type="checkbox" :name="_.camelCase(id)" @change="onChange" />
                <i>{{ label }}</i>
                <span class="store-name">{{ bizName }}</span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'

export interface CheckboxProps {
    id: string
    label: string
    type: CheckBoxDesignType
    checked?: boolean
    require?: boolean
    disabled?: boolean
    index?: number
}

@Component
export default class CheckBoxBlock extends Vue {
    /**
     * @category Prop
     */

    /** 디자인 타입 */
    @Prop({ type: String, default: 'normal' })
    readonly type!: CheckBoxDesignType

    /** form id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label text */
    @Prop({ type: String, required: true })
    readonly label!: string

    /** 활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 필수 여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly required!: boolean

    /** 체크된 상태 */
    @Prop({ type: Boolean, default: false })
    readonly checked!: boolean

    /** CheckBoxGroup의 하위 인 경우의 index */
    @Prop({ type: Number })
    readonly index!: number

    /** 사업장 명 또는 다른 명칭 */
    @Prop({ type: String, required: true })
    readonly bizName!: string

    /**
     * @category Data
     */

    /** value */
    private value: boolean = this.checked || false

    /**
     * @category Watch
     */

    @Watch('checked')
    changeChecked(newValue: boolean, oldValue: boolean) {
        this.value = newValue
    }

    /**
     * @category Methods
     */

    /** 초기화 */
    init() {
        this.value = this.checked || false
    }

    onChange() {
        /**
         * 변경된 값을 상위로 전달 할수 있음
         * @event change
         */
        this.$emit('change', {
            value: this.value,
            index: this.index,
            fieldName: this._.camelCase(this.id),
        })
    }
}
</script>

<style scoped lang="scss" src="./CheckBoxBlock.scss"></style>

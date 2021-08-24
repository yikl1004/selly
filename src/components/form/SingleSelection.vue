<template>
    <div :class="['single-selection', type]">
        <ul :class="['list', align]">
            <li
                v-for="(item, index) in list"
                :key="`single-selection-item-${index}`"
                class="list-item"
            >
                <input
                    :id="getItemId(id, index)"
                    v-model="value"
                    type="radio"
                    :name="id"
                    :value="item.value"
                    :disabled="item.disabled"
                    :checked="item.checked"
                />
                <label :for="getItemId(id, index)">{{
                    item.displayName
                }}</label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

export type Align = 'col' | 'row'
/**
 * @description 디자인타입을 결정합니다.
 */
export interface SingleSelectionListItem {
    displayName: string
    value: string
    checked?: boolean
    disabled?: boolean
}
/**
 * @description 디자인타입을 결정합니다.
 */
export type SingleSelectionDesignType = 'button' | 'radio'

@Component
export default class SingleSelection extends Vue {
    /** 선택 할 리스트 */
    @Prop({ type: Array, required: true })
    readonly list!: SingleSelectionListItem[]

    /** id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** 정렬 */
    @Prop({ type: String, default: 'col' })
    readonly align!: Align

    /** 디자인 타입 */
    @Prop({ type: String, default: 'radio' })
    readonly type!: SingleSelectionDesignType

    /** 초기값 */
    @Prop(String)
    readonly defaultValue!: string

    /**
     * @category Data(State)
     */

    /** 체크한 리스트 */
    private value: string = this.defaultValue || this.list[0].value

    /**
     * @category Computed
     */

    /** 정렬이 row일 경우의 열  */
    get rowLength(): string {
        return this.align === 'row' ? `${this.list.length % 3}` : ''
    }

    /**
     * @category Watch
     */

    /** value가 변경될때 만다 change emit을 실행 */
    @Watch('value')
    changeValue(newValue: string /* oldValue: string */) {
        /**
         * value가 변경될때 만다 change emit을 실행
         * @event change
         */
        this.$emit('change', {
            value: newValue,
            fieldName: this._.camelCase(this.id),
        })
    }

    /**
     * @category Methods
     */

    /**
     * 개별 id string 반환
     * @param {string} id
     * @param {number} index
     * @return {string}
     */
    getItemId(id: string, index: number): string {
        return `${id}-${index}`
    }
}
</script>

<style scoped lang="scss" src="./SingleSelection.scss"></style>

<template>
    <div :class="['single-selection', type]">
        <ul :class="['list', align]">
            <li v-for="(item, index) in list" :key="`single-selection-item-${index}`" class="list-item">
                <input :id="getItemId(id, index)" v-model="value" type="radio" :name="id" :value="item.value" />
                <label :for="getItemId(id, index)">{{ item.displayName }}</label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

export interface ListItem {
    displayName: string
    value: string
    selected?: boolean
}

export type List = ListItem[]
export type Align = 'col' | 'row'
export type DesignType = 'button' | 'radio'

@Component
export default class SingleSelection extends Vue {
    /**
     * @category Props
     */

    /** 선택 할 리스트 */
    @Prop({ type: Array, required: true })
    readonly list!: List

    /** id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** 정렬 */
    @Prop({ type: String, default: 'col' })
    readonly align!: Align

    /** 디자인 타입 */
    @Prop({ type: String, default: 'radio' })
    readonly type!: DesignType

    /**
     * @category Data(State)
     */

    /** 체크한 리스트 */
    private value: string = this.list[0].value

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
    changeValue(newValue: string, oldValue: string) {
        /**
         * value가 변경될때 만다 change emit을 실행
         * @event change
         */
        this.$emit('change', newValue)
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

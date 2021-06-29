<template>
    <div class="tab" :class="[`col-${col}`, type]">
        <div class="tab-item-list">
            <ul>
                <li
                    v-for="(item, index) in list"
                    :key="`tab-item-${index}`"
                    class="tab-item"
                    :class="{ active: index === currentIndex }"
                    :style="tabItemStyle"
                    @click="onClickItem(index)"
                >
                    <button type="button">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
            <div class="bar" :style="barStyle" />
        </div>
        <slot :active-index="currentIndex" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

export interface List {
    active?: boolean
    name: string
}

@Component
export default class Tab extends Vue {
    /**
     * @category Props
     */

    @Prop({ type: Number, default: 0 })
    readonly active!: number

    @Prop({ type: Array, required: true })
    readonly list!: List[]

    @Prop({ type: String, default: '' })
    readonly type!: string

    /**
     * @category Data(State)
     */

    /** 선택된 항목의 index */
    private currentIndex: number = 0

    /**
     * @category Computed
     */

    /** 갯수 */
    get col(): number {
        return this.list.length
    }

    /** bar 스타일 */
    get barStyle(): CSSObject {
        return {
            // left: `${(100 / this.col) * this.currentIndex}%`,
            // width: `${100 / this.col}%`,
        }
    }

    /** tab item 스타일 */
    get tabItemStyle(): CSSObject {
        return {
            // width: `${100 / this.col}%`,
        }
    }

    /**
     * @category Methods
     */

    onClickItem(index: number) {
        /**
         * currentIndex 변경시 트리거
         * @event change
         */
        this.$emit('change', index)

        this.currentIndex = index
    }

    mounted() {
        const activeIndex = (this.list as List[]).findIndex(item => item.active)
        if (activeIndex >= 0) {
            this.currentIndex = activeIndex
        }
    }
}
</script>

<style scoped lang="scss" src="./Tab.scss"></style>

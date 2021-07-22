<template>
    <div class="tab" :class="[type, { flicking: list.length > 3 }]">
        <div class="tab-item-list">
            <ul>
                <li
                    v-for="(item, index) in list"
                    :key="`tab-item-${index}`"
                    class="tab-item"
                    :class="{ active: index === currentIndex }"
                    @click="onClickItem(index)"
                >
                    <button type="button">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </div>
        <slot :active-index="currentIndex" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

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
    private currentIndex = 0

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

<style lang="scss" src="./Tab.scss"></style>

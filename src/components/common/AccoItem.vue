<template>
    <div class="box-acco-list" :class="type">
        <div
            v-for="(item, index) in list"
            :key="`acco-item-${index}`"
            :class="['box-acco-item', { active: index === currentIndex }]"
        >
            <button
                type="bubton"
                class="acco-anchor"
                :aria-controls="`acco-item-${index}`"
                :aria-expanded="index === currentIndex ? 'true' : 'false'"
                @click="onClick(index)"
            >
                <span v-if="item.category" class="category">
                    {{ item.category }}
                </span>
                <strong class="tit">{{ item.title }}</strong>
            </button>
            <div :id="`acco-item-${index}`" class="acco-cont">
                <div class="acco-cont-inner">
                    {{ item.desc }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface AccordionListItem {
    category?: string
    title: string
    desc: string
}

@Component
export default class AccoItem extends Vue {
    /** 아코디언 제목과 내용 배열로 받음 */
    @Prop({ type: Array, default: () => [] })
    readonly list!: {
        category?: string
        title: string
        desc: string
    }[]

    /** 디자인 타입 */
    @Prop({ type: String, default: '' })
    readonly type!: string

    /**
     * @category Data(State)
     */
    /**  */
    private currentIndex = -1

    /**
     * @category Methods
     */
    onClick(index: number) {
        /**
         * click 토글이벤트 발생
         */
        /**
         * TODO : 클릭시 포커스 이동(스크롤이동) 액션 여부 확인 필요
         */
        this.currentIndex = this.currentIndex === index ? -1 : index
    }
}
</script>

<style lang="scss" scoped src="./AccoItem.scss"></style>

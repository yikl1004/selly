<template>
    <div class="box-info-wrap">
        <div class="info-title">
            <h3 class="title">
                나의 한도
            </h3>
        </div>
        <div class="box-info-list">
            <div class="info-item">
                <div class="info-label">
                    <span>제목</span>
                </div>
                <div class="info-desc">
                    <span>일상환</span>
                    <span>정액 8,000만원</span>
                </div>
            </div>
            <div class="info-item">
                <div class="info-label">
                    <span>제목</span>
                </div>
                <div class="info-desc">
                    <span>일상환</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface AccordionListItem {
    title: string
    desc: string
}

@Component
export default class InfoList extends Vue {
    /**
     * @category Props
     */

    /** 아코디언 제목과 내용 배열로 받음 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: AccordionListItem[]

    /**
     * @category Data(State)
     */
    /**  */
    private currentIndex: number = -1

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

<style lang="scss" scoped src="./InfoList.scss"></style>

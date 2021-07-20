<template>
    <!--[D] 공지사항 상단고정 케이스는 pick 클래스 추가-->
    <button type="button" class="board-item" :class="type" @click="onClick">
        <div class="board-inner">
            <strong class="board-tit">
                {{ title }}
            </strong>
            <div v-if="date" class="board-btm">
                <span class="date">2021.05.28</span>
            </div>
        </div>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BoardItem extends Vue {
    /**
     * @category PROPS
     */
    /** 제목말줄임 케이스 :  ellipsis (2줄 말줄임) */
    @Prop({ type: String })
    readonly type!: string

    /** 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** 날짜 : 날짜가 없는 경우 비노출 */
    @Prop({ type: String })
    readonly date!: string

    /**
     * @category Methods
     */
    onClick(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('click', event)
    }
}
</script>

<style lang="scss" scoped src="./BoardItem.scss"></style>

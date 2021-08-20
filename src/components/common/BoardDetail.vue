<template>
    <section class="board-detail-wrap">
        <div class="title-area">
            <h1 class="board-tit">{{ title }}</h1>
            <div v-if="date" class="board-info">
                <span class="date">{{ date }}</span>
            </div>
        </div>
        <div class="board-text-area">
            <div class="text-inner">{{ content }}</div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BoardDetail extends Vue {
    /** 제목 */
    @Prop(String) readonly title!: string
    /** 최초 등록일 */
    @Prop(String) readonly date!: string
    /** 내용 */
    @Prop(String) readonly content!: string
}
</script>

<style lang="scss" scoped src="./BoardDetail.scss"></style>

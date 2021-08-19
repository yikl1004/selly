<template>
    <div class="faq-view-wrap">
        <AccoItem :list="accordionList" type="board" />
        <BasicButton type="more"> 더보기 </BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccordionListItem } from '@components/common/AccoItem.vue'

@Component
export default class NoticePage extends Vue {
    private accordionList: AccordionListItem[] = [
        {
            category: '매출관리',
            title: '매출내역이 정확하지 않아요.',
            desc:
                '매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다. 매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다.매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다.',
        },
        {
            category: '매출관리',
            title: '아코디언 제목2',
            desc: '아코디언 내용내용..',
        },
        {
            category: '매출관리',
            title: '아코디언 제목3',
            desc: '아코디언 내용내용..',
        },
        {
            category: '매출관리',
            title: '아코디언 제목4',
            desc: '아코디언 내용내용..',
        },
        {
            category: '매출관리',
            title: '아코디언 제목5',
            desc: '아코디언 내용내용..',
        },
        {
            category: '매출관리',
            title: '아코디언 제목6',
            desc: '아코디언 내용내용..',
        },
    ]
}
</script>

<style scoped lang="scss" src="./FaqView.scss" />

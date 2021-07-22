<template>
    <div>
        <h1>card</h1>
        <ProgressBar :progress-number="20" />
        <Title title="제목" sub-text="서브텍스트" />
        <BulletList> </BulletList>
        <AccoItem :list="accordionList" />
        <InfoList />

        <div class="box-">
            <div class="label">
                <em>사업자 등록번호</em>
                <button>텍스트버튼</button>
            </div>
            <div class="input"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccordionListItem } from '@components/common/AccoItem.vue'

@Component
export default class CardPage extends Vue {
    private accordionList: AccordionListItem[] = [
        {
            title: '아코디언 제목1',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목2',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목3',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목4',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목5',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목6',
            desc: '아코디언 내용내용..',
        },
    ]

    /**
     * @category Methods
     */
}
</script>

<style scoped></style>

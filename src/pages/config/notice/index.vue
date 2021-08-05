<template>
    <Page>
        <Header type="sub" title="공지사항" />
        <PageBody>
            <div class="content pd-btm">
                <div class="notice-wrap">
                    <!--[D] 공지사항 게시글 상단 고정 체크 필요-->
                    <BoardItem
                        v-for="(item, index) in noticeList"
                        :key="`board-item-${index}`"
                        :index="index"
                        :title="item.title"
                        :date="item.date"
                        type="ellipsis"
                        @click="toDetail(index)"
                    />
                    <BasicButton type="more"> 더보기 </BasicButton>
                </div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'

@Component
export default class NoticePage extends Mixins(PageView) {
    // 공지사항 정보 샘플
    private noticeList = [
        {
            title:
                '개인사업자 회원표준약관 개정 안내개인사업자 회원표준약관 개정 안내개인사업자 회원표준약관 개정 안내개인사업자 회원표준약관 개정 안내개인사업자 회원표준약관 개정 안내개인사업자 회원표준약관 개정 안내개인사업자 회원표준약관 개정 안내1',
            date: '2021.05.28',
        },
        {
            title: '개인사업자 회원표준약관 개정',
            date: '2021.05.28',
        },
    ]

    /** @Methods */

    // 상세이동
    toDetail(index: number) {
        this.$router.push({ name: 'Notice Detail', params: { no: `${index}` } })
    }
}
</script>

<template>
    <div class="container">
        <div class="content pd-btm">
            <div class="notice-wrap">
                <!--[D] 공지사항 게시글 상단 고정 체크 필요-->
                <BoardItem
                    v-for="(item, index) in noticeList"
                    :key="`board-item-${index}`"
                    :index="index"
                    type="ellipsis"
                    :title="item.title"
                    :date="item.date"
                />
                <BasicButton type="more">
                    더보기
                </BasicButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoticePage extends Vue {
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
}
</script>

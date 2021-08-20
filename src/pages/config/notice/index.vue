<template>
    <Page>
        <Header type="sub" title="공지사항" />
        <PageBody>
            <div class="content pd-btm">
                <div class="notice-wrap">
                    <!--[D] 공지사항 게시글 상단 고정 체크 필요-->
                    <BoardItem
                        v-for="(item, index) in list"
                        :key="`board-item-${index}`"
                        :index="index"
                        :title="item.title"
                        :date="item.date"
                        type="ellipsis"
                        @click="toDetail(item.seq)"
                    />
                    <BasicButton
                        v-if="noticeMoreYN"
                        type="more"
                        @click="onMore"
                    >
                        더보기
                    </BasicButton>
                </div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { BoardModule } from '@stores/modules/board'

@Component
export default class NoticePage extends Mixins(PageView) {
    get list() {
        return BoardModule.noticeListData
    }

    get noticeMoreYN() {
        return BoardModule.noticeMoreYN
    }

    /**
     * 상세로 이동하기
     * @param {number} 상세 일련번호
     */
    toDetail(index: string) {
        this.$router.push({ name: 'Notice Detail', params: { no: `${index}` } })
    }

    /** 더보기 */
    async onMore() {
        await BoardModule.getNoticeList()
    }

    /** @Lifecycle */

    async created() {
        await BoardModule.getNoticeList()
    }
}
</script>

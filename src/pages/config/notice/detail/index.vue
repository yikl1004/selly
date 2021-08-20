<template>
    <Page>
        <Header type="sub" title="공지사항" />
        <PageBody>
            <div class="content">
                <BoardDetail
                    :title="detail.title"
                    :date="detail.date"
                    :content="detail.content"
                />
                <BasicButton type="medium" @click="$router.back()">
                    목록
                </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { BoardModule } from '@stores/modules/board'
import PageView from '@utils/mixins/PageView'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class NoticeDetailPage extends Mixins(PageView) {
    get detail() {
        return BoardModule.noticeDetailData
    }

    async created() {
        const anSeq = this.$route.params.no
        await BoardModule.getNoticeDetail({ anSeq })
    }
}
</script>

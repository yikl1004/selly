<template>
    <Page>
        <Header type="sub" title="이용약관" />
        <PageBody>
            <div class="content">
                <BoardDetail :title="policyDetailData.title" :content="policyDetailData.content" />
                <BasicButton type="medium"> 목록 </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardModule } from '@stores/modules/board'

@Component
export default class TermsDetailPage extends Vue {
    get policyDetailData() {
        return BoardModule.policyDetailData
    }

    async created() {
        const prvSeq = this.$route.params.no
        await BoardModule.getPolicyDetail({ prvSeq })
    }
}
</script>

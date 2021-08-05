<template>
    <Page>
        <Header type="sub" title="이용약관" />
        <PageBody>
            <div class="content">
                <BoardDetail />
                <BasicButton type="medium"> 목록 </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class TermsDetailPage extends Vue {}
</script>

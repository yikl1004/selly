<template>
    <Page>
        <Header type="sub" title="공지사항" />
        <PageBody>
            <div class="content">
                <BoardDetail />
                <BasicButton type="medium" @click="$router.back()"> 목록 </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import PageView from '@utils/mixins/PageView'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class NoticeDetailPage extends Mixins(PageView) {}
</script>

<template>
    <Page floating :footer="false">
        <Header type="sub" title="세무서비스" />
        <PageBody class="floating">
            비즈넵 연동 미개발, EDK 가이드 수급 필요
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'

@Component
export default class TaxServiceGuide extends Mixins(PageView) {
    mounted() {
        this.$edkHost.openInsight({
            orgSyncId: '',
        })
    }
}
</script>

<style scoped></style>

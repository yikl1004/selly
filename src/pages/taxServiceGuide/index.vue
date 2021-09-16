<template>
    <Page floating :footer="false">
        <Header type="sub" title="세무서비스" />
        <PageBody class="floating" />
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import type { LoginInfo } from '@stores/modules/auth'
import { Path } from '@router/routes'

@Component
export default class TaxServiceGuide extends Mixins(PageView) {
    mounted() {
        const auth = JSON.parse(
            localStorage.getItem('auth') || 'null',
        ) as LoginInfo

        const target = document.querySelector('#em_embed') as HTMLDivElement
        if (target) {
            target.style.display = 'block'
        }

        if (auth?.bzNavToken) {
            this.$edkHost.openInsightLoca({
                orgSyncId: auth.bzNavToken || '',
                eventListener: value => {
                    if (value.action === 'close') {
                        this.$router.push(Path.Main)
                    }
                },
            })
        } else {
            this.$modal.open({
                message: '토큰이 유실 되었습니다. 이전 페이지로 이동합니다.',
                buttonText: {
                    confirm: '확인',
                },
                confirm: () => this.$router.back(),
            })
        }
    }

    beforeDestroy() {
        const target = document.querySelector('#em_embed') as HTMLDivElement
        if (target) {
            target.style.display = 'none'
        }
    }
}
</script>

<style scoped></style>

<template>
    <Page>
        <Header type="sub" title="이용약관" />
        <PageBody>
            <div class="content pd-btm">
                <BoardItem
                    v-for="(item, index) in policyList"
                    :key="`board-item-${index}`"
                    :index="index"
                    :title="item.title"
                    @click="toDetail(index)"
                />
                <BasicButton v-if="policyMoreYN" type="more" @click="onMore">
                    더보기
                </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { BoardModule } from '@stores/modules/board'
import { Path } from '@router/routes'

@Component
export default class TermsPage extends Mixins(PageView) {
    get policyList() {
        return BoardModule.policyListData
    }

    get policyMoreYN() {
        return BoardModule.policyMoreYN
    }

    // 상세로 이동
    toDetail(index: number) {
        const seq = this.policyList[index].index
        this.$router.push({
            ...Path.TermsDetail,
            params: { no: seq },
        })
    }

    // 더보기
    async onMore() {
        await BoardModule.getPolicyList({ more: true })
    }

    async created() {
        await BoardModule.getPolicyList()
    }
}
</script>

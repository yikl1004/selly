<template>
    <Page>
        <Header type="sub" title="이용약관" />
        <PageBody>
            <div class="content pd-btm">
                <BoardItem
                    v-for="(item, index) in termsList"
                    :key="`board-item-${index}`"
                    :index="index"
                    :title="item.title"
                    @click="toDetail(index)"
                />
                <BasicButton type="more"> 더보기 </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'

@Component
export default class TermsPage extends Mixins(PageView) {
    // 이용약관 샘플
    private termsList = [
        {
            title: '표준 여신거래 기본약관',
        },
        {
            title: '개인 신용정보 필수/선택적 동의서',
        },
    ]

    /** @Methods */

    // 상세로 이동
    toDetail(index: number) {
        this.$router.push({ name: 'Terms Detail', params: { no: `${index}` } })
    }
}
</script>

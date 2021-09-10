<template>
    <Page>
        <Header type="sub" :title="headerTitle" />
        <PageBody v-if="isMain"> 인트로페이지 각각 생김 </PageBody>
        <router-view v-else />
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { AccordionListItem } from '@components/common/AccoItem.vue'
@Component({
    components: {},
})
export default class FinancePage extends Vue {
    /** 헤더 타이틀 */
    get headerTitle(): string {
        return '로카머니 Biz론'
        // return this.$route.name === 'Sales' ? '매출 내역' : '입금 내역'
    }

    /**
     * @category Data
     */
    onClick() {
        console.log('다음버튼 클릭')
    }

    get isMain() {
        return this.$route.name === 'Finance'
    }
}
</script>

<style scoped lang="scss"></style>

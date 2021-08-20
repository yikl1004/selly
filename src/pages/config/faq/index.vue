<template>
    <Page>
        <Header type="sub" title="자주 묻는 질문" />
        <PageBody>
            <div class="content pd-btm">
                <div class="faq-wrap">
                    <Tab :list="faqCategoryData" :active="0" @change="onChangeCategory">
                        <div>
                            <div class="faq-view-wrap">
                                <AccoItem :list="faqListData" type="board" />
                                <BasicButton v-if="faqMoreYN" type="more" @click="onMore"> 더보기 </BasicButton>
                            </div>
                        </div>
                    </Tab>
                </div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardModule } from '@stores/modules/board'

@Component
export default class FaqPage extends Vue {
    get faqCategoryData() {
        return BoardModule.faqCategoryData
    }

    get faqListData() {
        return BoardModule.faqListData
    }

    get faqMoreYN() {
        return BoardModule.faqMoreYN
    }

    async onChangeCategory(index: number) {
        const faqCtgDc = this.faqCategoryData[index].categoryCode
        BoardModule.changeFaqCategory(faqCtgDc)
        await BoardModule.getFaqList()
    }

    async onMore() {
        BoardModule.changeFaqPageNo({ more: true })
        await BoardModule.getFaqList()
    }

    async created() {
        await BoardModule.getFaqCategory()
        await BoardModule.getFaqList()
    }
}
</script>
<style scoped lang="scss" src="./FaqView.scss" />

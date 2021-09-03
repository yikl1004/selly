<template>
    <Page>
        <Header type="main" />
        <PageBody>
            <div v-if="isResponseSuccess" class="page-main-wrap">
                <!-- s : 매출/입금 -->
                <SalesAndDeposit />
                <!-- e : 매출/입금 -->

                <!-- s : 금융상품 영역 -->
                <!-- <Financial /> -->
                <!-- e : 금융상품-->

                <!-- s : 마케팅 -->
                <!-- <Marketing /> -->
                <!-- e : 마케팅 -->

                <!-- s : 신용카드 -->
                <CreditCard />
                <!--// e : 신용카드 -->

                <!-- s : 세무서비스 -->
                <Anchor :href="toTaxService()" class="banner-tax">
                    <em>가장 간편한 사업 관리</em>
                    <strong>간편하게 세무 관리<br />시작 하세요</strong>
                </Anchor>
                <!--// e : 세무서비스 -->

                <!-- s : 제휴사 - TODO: API 아직 없음, 추가되면 해야 됨 -->
                <AffiliatedBanner />
                <!--// e : 제휴사 -->
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { MainModule } from '@stores/modules/main'
import SalesAndDeposit from '@components/main/SalesAndDeposit.vue'
// import Financial from '@components/main/Financial.vue'
import Marketing from '@components/main/Marketing.vue'
import CreditCard from '@components/main/CreditCard.vue'
import AffiliatedBanner from '@components/main/AffiliatedBanner.vue'

@Component({
    components: {
        SalesAndDeposit,
        // Financial,
        Marketing,
        CreditCard,
        AffiliatedBanner,
    },
})
export default class MainPage extends Mixins(PageView) {
    get isResponseSuccess() {
        return MainModule.isResponseSuccess
    }

    toTaxService() {
        return process.env.VUE_APP_TXA_SERVICE
    }

    created() {
        MainModule.getMainInfo()
    }

    beforeUnmount() {
        MainModule.init()
    }
}
</script>

<style lang="scss" src="./main.scss" />

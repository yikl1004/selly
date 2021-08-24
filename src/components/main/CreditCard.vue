<template>
    <div v-if="cardInfo">
        <Title title="신용 카드" />

        <!-- 신용카드 보유시 -->
        <div v-if="hasCard" class="box-price-info type-credit">
            <div class="box-info-top">
                <span class="date">7월 8일(목) 기준</span>
                <div class="item-info">
                    <strong>결제 금액 한눈에 보기</strong>
                </div>
            </div>
            <div class="price-list">
                <ul>
                    <li>
                        <span class="subject">상환 금액</span>
                        <strong class="price">26,000,000원</strong>
                    </li>
                    <li>
                        <span class="subject">상환 금액</span>
                        <strong class="price">26,000,000원</strong>
                    </li>
                </ul>
            </div>
            <div class="btn-area">
                <BasicButton size="small">결제 금액 조회</BasicButton>
                <BasicButton size="small">로카 코인 조회</BasicButton>
            </div>
        </div>

        <!-- 신용카드 미보유 : 어드민등록 -->
        <Anchor
            v-else
            :href="cardApplyURL"
            class="banner-box banner-credit"
            style="background-image:url('/assets/main/img_credit.png)"
        >
            <div class="banner-title">
                <em>금융이자, 결제대금 납부까지 편리하게!</em>
                <strong> LOCA MONEY<br />Biz 카드 </strong>
            </div>
        </Anchor>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MainModule } from '@stores/modules/main'

@Component
export default class CreditCard extends Vue {
    get cardInfo() {
        return MainModule.cardInfo
    }

    get hasCard() {
        return this.cardInfo?.lmBizYn === 'Y'
    }

    get cardApplyURL() {
        return this.cardInfo?.cardUrl || ''
    }
}
</script>

<style scoped></style>

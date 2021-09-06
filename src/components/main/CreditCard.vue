<template>
    <div v-if="cardInfo">
        <Title title="신용 카드" />

        <!-- 신용카드 보유시 -->
        <div v-if="hasCard" class="box-price-info type-credit">
            <div class="box-info-top">
                <span class="date">{{ '기준일자 데이터 없음' }} 기준</span>
                <div class="item-info">
                    <strong>결제 금액 한눈에 보기</strong>
                </div>
            </div>
            <div class="price-list">
                <ul>
                    <li>
                        <span class="subject">결제 예정 금액</span>
                        <strong class="price">{{ amountToBePaid }}원</strong>
                    </li>
                    <li>
                        <span class="subject">로카 코인</span>
                        <strong class="price">{{ locaCoin }} P</strong>
                    </li>
                </ul>
            </div>
            <div class="btn-area">
                <BasicButton size="small" @click="toInquiryPaid">
                    결제 금액 조회
                </BasicButton>
                <BasicButton size="small" @click="toLocaCoin">
                    로카 코인 조회
                </BasicButton>
            </div>
        </div>

        <!-- 신용카드 미보유 : 어드민등록 -->
        <Anchor
            v-else
            :href="cardApplyURL"
            class="banner-box banner-credit"
            style="background-image: url('/assets/main/img_credit.png')"
        >
            <div class="banner-title">
                <em>
                    개인사업자를 위한 세무지원, <br />국내외 가맹점 적립혜택까지
                </em>
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

    toLocaCoin() {
        this.cardInfo?.locaCoinUrl && window.open(this.cardInfo?.locaCoinUrl)
    }

    toInquiryPaid() {
        this.cardInfo?.todBilAmUrl && window.open(this.cardInfo?.todBilAmUrl)
    }

    amountToBePaid() {
        return this._.toNumber(this.cardInfo?.todBilAm || '0').toLocaleString()
    }

    locaCoin() {
        return this._.toNumber(this.cardInfo?.locaCoin || '0').toLocaleString()
    }
}
</script>

<style scoped></style>

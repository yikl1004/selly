<template>
    <div class="popup-inner">
        <div class="title-coupon-preview">
            <strong>푸시메시지 홍보</strong>
            <p>
                롯데카드 앱 이용 고객에게 푸시메시지가 발송되며, 발송된 메시지는
                앱 내 ‘알림’에서 확인 할 수 있습니다.
            </p>
        </div>
        <div class="touch-coupon-box">
            <div class="touch-coupon-header">
                <div class="touch-coupon-right">
                    <i class="ico">
                        <img
                            src="/assets/marketing/ico-coupon-alarm.png"
                            alt=""
                        />
                    </i>
                    <i class="ico">
                        <img
                            src="/assets/marketing/ico-coupon-menu.png"
                            alt=""
                        />
                    </i>
                </div>
            </div>
            <div class="touch-coupon-cont">
                <strong class="touch-tit">로카알리미</strong>
                <div class="touch-cont-box">
                    <span v-if="period" class="date">{{ startDate }}</span>
                    <div v-if="discountRate" class="touch-message-box">
                        <p class="subject">
                            (광고)
                            <strong>
                                [{{ gubunText }} {{ discountRate }}%할인]
                            </strong>
                        </p>
                        <p>
                            김로카님 주변1km에 있는 {{ franchiseName }}에서
                            결제일 할인을 받아보세요.
                        </p>
                    </div>
                    <div class="img">
                        <!--샘플이미지-->
                        <img
                            src="/assets/marketing/@img-coupon-preview.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="title-coupon-preview">
            <strong>롯데카드 앱 쿠폰 노출</strong>
            <p>
                ‘롯데카드 앱 > 혜택 > TOUCH’에서 신청한 쿠폰을 확인할 수
                있습니다.
            </p>
        </div>
        <div class="coupon-sample-list">
            <div class="touch-coupon-header">
                <i class="ico">
                    <img
                        src="/assets/marketing/ico-preview-arrow2.png"
                        alt=""
                    />
                </i>
                <h3>TOUCH</h3>
                <div class="touch-coupon-right">
                    <i class="ico">
                        <img
                            src="/assets/marketing/ico-preview-menu.png"
                            alt=""
                        />
                    </i>
                </div>
            </div>
            <div class="sample-item-cont">
                <div class="coupon-sample-item">
                    <div class="coupon-sample-inner">
                        <div class="coupon-info">
                            <span class="franchisee-name">
                                [{{ gubunText }}] {{ franchiseName }}
                            </span>
                            <strong class="info">
                                {{ discountRate }}% 결제일 할인
                            </strong>
                            <span class="date">{{ term }}</span>
                            <div class="img-ci">
                                <img
                                    src="/assets/marketing/@ico-ci.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="use-box">
                            <span class="area">#지역명</span>
                            <span class="ico">사용가능</span>
                        </div>
                    </div>
                </div>
                <!--[D]샘플. 해당부분은 하드코딩입니다. 데이터없이 하드코딩-->
                <div class="coupon-sample-item sample">
                    <div class="coupon-sample-inner">
                        <div class="coupon-info">
                            <span class="franchisee-name"> 아이허브 </span>
                            <strong class="info">10% 결제일 할인</strong>
                            <span class="date">21.06.01~21.06.30</span>
                            <div class="img-ci">
                                <img
                                    src="/assets/marketing/icon-ci-sample01.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="use-box">
                            <span class="area">#지역명</span>
                            <span class="ico">사용가능</span>
                        </div>
                    </div>
                </div>
                <div class="coupon-sample-item sample">
                    <div class="coupon-sample-inner">
                        <div class="coupon-info">
                            <span class="franchisee-name">
                                캐치패션 (CATCH)
                            </span>
                            <strong class="info">10% 결제일 할인</strong>
                            <span class="date">21.06.01~21.06.30</span>
                            <div class="img-ci">
                                <img
                                    src="/assets/marketing/icon-ci-sample02.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="use-box">
                            <span class="area">#지역명</span>
                            <span class="ico">사용가능</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface CouponPreviewProps {
    period: {
        start: string
        end: string
    }
    discountRate: string
    franchiseName: string
    gubun: '1' | '2'
}

@Component
export default class PopupCouponPreview extends Vue {
    /** 행사 시작일 */
    @Prop({ type: Object })
    readonly period!: {
        start: string
        end: string
    }

    /** 할인율 */
    @Prop({ type: String })
    readonly discountRate!: string

    /** 가맹점명 */
    @Prop({ type: String })
    readonly franchiseName!: string

    /** 구분 코드 */
    @Prop({ type: String })
    readonly gubun!: '1' | '2'

    get gubunText() {
        return this.gubun === '1' ? '첫 결제' : '재방문'
    }

    get startDate() {
        return this.$dayjs(this.period.start).format('YYYY. MM. DD(ddd)')
    }

    get term() {
        return `${this.$dayjs(this.period.start).format(
            'YYYY.MM.DD',
        )}~${this.$dayjs(this.period.end).format('YYYY.MM.DD')}`
    }
}
</script>

<style lang="scss" scoped src="./PopupCouponPreview.scss"></style>

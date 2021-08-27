<template>
    <div class="popup-inner no-padding">
        <div class="popup-coupon-preview">
            <div class="touch-coupon-box">
                <div class="touch-coupon-header">
                    <h3>
                        <img
                            src="/assets/marketing/logo-touch-coupon.png"
                            alt="touch 로고"
                        />
                    </h3>
                    <div class="touch-coupon-alarm">
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
                    <span class="date">2021. 07. 01(월)</span>
                    <p>
                        <em>[광고]</em>
                        [김로카 고객님의 주변의
                        <strong>이층집 강남점</strong>에서
                        <strong>7월 31일</strong>까지 결제금액의
                        <strong>10% 할인행사</strong>를 진행중이니 혜택을
                        받아보세요.
                    </p>
                    <div class="img">
                        <!--샘플이미지-->
                        <img
                            src="/assets/marketing/logo-touch-coupon.png"
                            alt=""
                        />
                    </div>

                    <BulletList
                        :list="[{ text: '수신거부 : 설정-알림설정-혜택' }]"
                    />
                </div>
            </div>
            <div class="coupon-sample-list">
                <div class="coupon-sample-item">
                    <div class="coupon-sample-inner">
                        <div class="coupon-info">
                            <span class="franchisee-name">
                                [감사쿠폰] 이층집 강남점
                            </span>
                            <strong class="info">10% 결제일 할인</strong>
                            <span class="date">21.06.01~21.06.30</span>
                            <div class="img-ci">
                                <img
                                    src="/assets/marketing/ico-coupon-ci.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="use-box">
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
                                    src="/assets/marketing/ico-coupon-ci.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="use-box">
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
                                    src="/assets/marketing/ico-coupon-ci.svg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="use-box">
                            <span class="ico">사용가능</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PopupCouponPreview extends Vue {}
</script>

<style lang="scss" scoped src="./PopupCouponPreview.scss"></style>

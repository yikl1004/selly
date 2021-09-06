<template>
    <div class="logi-visual-box">
        <div class="intro-box intro01">
            <div class="intro-inner">
                <h2>바쁜 사장님을 위한<br />슬기로운 사업관리</h2>
                <ul>
                    <li>매출/입금 알림</li>
                    <li>금융 상품</li>
                    <li>매장홍보쿠폰</li>
                    <li>내 주변 매출</li>
                </ul>
            </div>
        </div>

        <div class="intro-box intro02">
            <div class="intro-inner">
                <h3>
                    신용카드, 현금, 배달매출까지<br />매일 카카오톡으로 매출
                    알림 받기
                </h3>
                <p>
                    한 번 연동으로 가맹점의 매출 및 입금 정보를<br />편리하게
                    확인해보세요.
                </p>
            </div>
        </div>

        <div class="intro-box intro03">
            <div class="intro-inner">
                <h3>
                    많이 번 날 많이 상환하고,<br />적게 번 날 적게 상환하며<br />이자
                    부담을 줄이는 스마트한 금융
                </h3>
                <p>
                    서류 준비와 지점 방문 없이<br />당일 신청하고 당일 대출
                    받아보세요.
                </p>
            </div>
        </div>

        <div class="intro-box intro04">
            <div class="intro-inner">
                <h3>내 매장 주변 1km 이내 고객만<br />쓸 수 있는 할인 쿠폰</h3>
                <p>
                    쿠폰을 무료로 발송하고,<br />첫 고객과 단골 고객을
                    늘려보세요.
                </p>
            </div>
        </div>

        <div class="intro-box intro05">
            <div class="intro-inner">
                <h3>내 매장 주변 업종의<br />매출 분석하기</h3>
                <p>
                    주변 가맹점의 매출 추이와 고객 속성을 확인하고,<br />매장
                    홍보에 활용해보세요.
                </p>
            </div>
        </div>

        <div class="intro-box intro06">
            <div class="intro-inner">
                <BannerSwiper
                    :options="{
                        slidesPerView: 1,
                        spaceBetween: 20,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        loop: true,
                    }"
                    :isNavigation="true"
                >
                    <swiper-slide>
                        <div class="slide-intro-box">
                            <span class="thumb"> </span>
                            <p>
                                샐리를 사용하면서<br />주변 가맹점의 매출 추이와
                                고객 속성을 <br />확인하고, 매장 홍보에
                                활용하는데 <br />아주 많은 도움을 받았습니다.
                                <strong>IMT 커피집, 광화문점</strong>
                            </p>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="slide-intro-box">
                            <span class="thumb"> </span>
                            <p>
                                샐리를 사용하면서<br />주변 가맹점의 매출 추이와
                                고객 속성을 <br />확인하고, 매장 홍보에
                                활용하는데 <br />아주 많은 도움을 받았습니다.
                                <strong>IMT 커피집, 광화문점</strong>
                            </p>
                        </div>
                    </swiper-slide>
                </BannerSwiper>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SwiperSlide } from 'vue-awesome-swiper'

@Component({
    components: {
        SwiperSlide,
    },
})
export default class LoginVisual extends Vue {}
</script>

<style lang="scss" scoped src="./LoginVisual.scss"></style>

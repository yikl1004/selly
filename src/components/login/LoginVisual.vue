<template>
    <div class="logi-visual-box">
        <div class="intro-box intro01">
            <div class="intro-inner">
                <h1 class="logo">
                    <span class="ir">Selly beta</span>
                </h1>
                <h2>바쁜 사장님을 위한<br />슬기로운 사업관리</h2>
                <div class="tag">
                    <div>
                        <span>#매출/입금 알림</span>
                        <span>#금융 상품</span>
                    </div>
                    <div>
                        <span>#내 주변 매출</span>
                        <span>#매장홍보쿠폰</span>
                    </div>
                </div>
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
                <h3>사장님을 위한<br />한도 우대 신용대출!</h3>
                <p>
                    서류 , 방문없이 편리하고 여유 있는 한도로<br />이용 하는
                    목돈 마련 플랜
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
                            <span class="thumb">
                                <img
                                    src="/assets/intro/thumb_user01.png"
                                    alt=""
                                />
                            </span>
                            <p>
                                제가 직접 대상고객을 설정해서 할인쿠폰을 만들고
                                홍보할 수 있어서 신기했고 우리 가게 주변의 고객
                                속성과 매출 분석도 할 수 있어 가게 운영에 많은
                                도움이 됩니다.
                                <strong>
                                    양고기 전문점 “고구려”사장님 김기수
                                </strong>
                            </p>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="slide-intro-box">
                            <span class="thumb">
                                <img
                                    src="/assets/intro/thumb_user02.png"
                                    alt=""
                                />
                            </span>
                            <p>
                                도로시파스타연정은 배달 전문 프렌차이즈인데 배달
                                매출이 얼마나 발생됐는지 매일매일 카카오톡으로
                                알려줘 정말 편하고 신기해요. 우리 가맹점
                                사장님들도 만족하고 사용하고 있어요.
                                <strong>
                                    (주)탑라이너에프에스 대표 조은상
                                </strong>
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

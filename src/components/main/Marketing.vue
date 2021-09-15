<template>
    <div>
        <!-- s : 마케팅 -->
        <Title title="마케팅" class="flex">
            <div class="box-right">
                <Anchor href="/" class="btn-more">
                    <span class="ir">더보기</span>
                </Anchor>
            </div>
        </Title>

        <!-- 마케팅 신청 하지 않은경우 -->
        <div class="box-banner-marketing">
            <Anchor href="/" class="banner-box banner-marketing default">
                <div class="banner-title">
                    <em>Selly와</em>
                    <strong>
                        가맹점과 고객을<br />
                        연결하는 마케팅
                    </strong>
                </div>
                <div class="box-white">
                    <strong class="txt-application">
                        <span>신청하기</span>
                    </strong>
                </div>
            </Anchor>
        </div>

        <!-- 마케팅 신청한 경우 -->
        <BannerSwiper
            :options="{
                slidesPerView: 1.4,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                },
            }"
        >
            <!-- 등록된 마케팅 배너 -->
            <swiper-slide>
                <Anchor href="/" class="banner-box banner-marketing">
                    <div class="box-event-info">
                        <Flag color="blue" text="진행" />
                        <em class="event-type">첫고객</em>
                        <span class="event-info">5%</span>
                        <p class="franchise-name">
                            연탄 불고기 가맹점연탄 불고기 가맹점연탄 불고기
                            가맹점연탄 불고기 가맹점
                        </p>
                        <span class="event-date">
                            2021. 07. 01 ~
                            <br />
                            2021. 07. 30
                        </span>
                    </div>
                    <div class="box-white">
                        <span class="subject">이용 고객</span>
                        <strong>1,000명</strong>
                    </div>
                </Anchor>
            </swiper-slide>
            <!-- 기본 마케팅 배너 -->
            <swiper-slide>
                <Anchor href="/" class="banner-box banner-marketing default">
                    <div class="banner-title">
                        <em>Selly와</em>
                        <strong> 가맹점이 함께 만드는 쿠폰 </strong>
                    </div>
                    <div class="box-white">
                        <strong class="txt-application">
                            <span>신청하기</span>
                        </strong>
                    </div>
                </Anchor>
            </swiper-slide>
        </BannerSwiper>

        <Anchor href="/" class="banner-box banner-store">
            <em>우리 매장 주변</em>
            <p>분야별 다양한 정보보기!</p>
        </Anchor>
        <!-- e : 마케팅 -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Marketing extends Vue {}
</script>

<style scoped></style>

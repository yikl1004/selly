<template>
    <Page>
        <Header type="main" />
        <PageBody>
            <div class="page-main-wrap">
                <!-- s : 개인화 영역 -->
                <!-- 연동안되어 있음 -->
                <Anchor href="/" class="banner-box banner-user">
                    <div class="banner-title">
                        <em>반가워요 김셀리님</em>
                        <strong> 우리매장 매출을<br />확인하세요. </strong>
                    </div>
                    <span class="txt-underline">자세히 보기</span>
                </Anchor>

                <!-- 연동 후 데이터수집/ 연동안되었음-->
                <Anchor href="/" class="banner-box no-data">
                    <strong>
                        고객님의 매출/입금<br />데이터 수집 및 연동중입니다.
                        <br />
                        조금만 기다려 주세요.
                    </strong>
                    <img src="/assets/icon/ico_loading.svg" alt="로딩중" />
                </Anchor>

                <!-- 연동 데이터 존재시-->
                <BannerSwiper>
                    <swiper-slide>
                        <Anchor href="/" class="box-sales-link">
                            <span class="date">7월 8일(목) 기준</span>
                            <div class="info">
                                <strong class="title">매출</strong>
                                <span class="flag">전일대비 +319,000</span>
                            </div>
                            <div class="price">
                                <strong>42,700,000</strong>원
                            </div>
                        </Anchor>
                    </swiper-slide>
                    <swiper-slide>
                        <Anchor href="/" class="box-sales-link">
                            <span class="date">7월 8일(목) 기준</span>
                            <div class="info">
                                <strong class="title">입금</strong>
                                <span class="flag">전일대비 +319,000</span>
                            </div>
                            <div class="price">
                                <strong>42,700,000</strong>원
                            </div>
                        </Anchor>
                    </swiper-slide>
                </BannerSwiper>
                <!-- e : 개인화 영역 -->

                <!-- s : 금융상품 영역 -->
                <Title title="금융 상품" />
                <!-- 금융_비즈론_대출 미신청-->
                <Anchor href="/" class="banner-box banner-finance type-biz">
                    <div class="banner-title">
                        <em>부담되는 매월 납부 대신</em>
                        <strong> 매출에 따라<br />납부하는 Biz론 </strong>
                    </div>
                    <div class="available-box">
                        <p>이용가능금액 <em>연 5.2%</em></p>
                        <span class="price"> <strong>5,000</strong> 만원 </span>
                    </div>
                </Anchor>

                <!-- 금융_비즈론_대출 미신청 / 한도부족 심사부적격 -->
                <Anchor href="/" class="banner-box banner-finance type-biz">
                    <div class="banner-title">
                        <em>부담되는 매월 납부 대신</em>
                        <strong> 매출에 따라<br />납부하는 Biz론 </strong>
                    </div>
                </Anchor>

                <!-- 금융_비즈론_대출 신청 후 잔여한도가 있는 경우 -->
                <div class="box-price-info">
                    <div class="box-info-top">
                        <span class="date">7월 8일(목) 기준</span>
                        <div class="item-info">
                            <strong>대출(장기카드)</strong>
                            <em>42,700,000원</em>
                        </div>
                    </div>
                    <div class="box-graph">
                        <div class="graph-bg">
                            <!--
                                [D] flag 디자인 케이스 정의 (기준 : 280px)
                                - 그래프의 %가 14% 이하일시 : left
                                - 그래프의 %가 89% 이상일시 : right
                            -->
                            <div class="graph right" style="width: 40%">
                                <!-- flag 화살표 더블클랙스 : left / right -->
                                <span class="point">
                                    <span class="flag">40%</span>
                                </span>
                            </div>
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
                    <div class="btn-area center">
                        <BasicButton size="small">대출내역 확인</BasicButton>
                    </div>
                </div>

                <Anchor href="/" class="banner-box banner-finance type-biz">
                    <div class="available-box type02">
                        <p>추가대출가능 금액</p>
                        <span class="price"> <strong>5,000</strong> 만원 </span>
                        <p>이용가능금액 <em>연 5.2%</em></p>
                    </div>

                    <span class="txt-underline">추가대출받기</span>
                </Anchor>

                <!-- 금융_비즈론_대출 이용거절 -->
                <Anchor
                    href="/"
                    class="banner-box banner-finance type-biz refusal"
                >
                    <div class="banner-title">
                        <em>부담되는 매월 납부 대신</em>
                        <strong> 매출에 따라<br />납부하는 Biz론 </strong>
                    </div>
                    <span class="agree">이용 동의</span>
                    <p class="info">
                        이용동의 하시고 이자율과 이용가능금액을 알아보세요.
                    </p>
                </Anchor>

                <!-- 금융_장기카드론_대출 미신청 -->
                <Anchor href="/" class="banner-box banner-finance type-loan">
                    <div class="banner-title">
                        <em>여유있는 한도!</em>
                        <strong>중도상환 수수료 없는<br />장기카드론</strong>
                    </div>
                    <div class="available-box">
                        <p>이용가능금액 <em>연 5.2%</em></p>
                        <span class="price"> <strong>5,000</strong> 만원 </span>
                    </div>
                </Anchor>

                <!-- 금융_장기카드론_대출 미신청 / 한도부족 심사부적격 -->
                <Anchor href="/" class="banner-box banner-finance type-loan">
                    <div class="banner-title">
                        <em>여유있는 한도!</em>
                        <strong>중도상환 수수료 없는<br />장기카드론</strong>
                    </div>
                </Anchor>

                <!-- 금금융_장기카드론_대출 신청 후 잔여한도가 있는 경우 -->
                <div class="box-price-info">
                    <div class="box-info-top">
                        <span class="date">7월 8일(목) 기준</span>
                        <div class="item-info">
                            <strong>대출(장기카드)</strong>
                            <em>42,700,000원</em>
                        </div>
                    </div>
                    <div class="box-graph">
                        <div class="graph-bg">
                            <!--
                                [D] flag 디자인 케이스 정의 (기준 : 280px)
                                - 그래프의 %가 14% 이하일시 : left
                                - 그래프의 %가 89% 이상일시 : right
                            -->
                            <div class="graph right" style="width: 50%">
                                <!-- flag 화살표 더블클랙스 : left / right -->
                                <span class="point">
                                    <span class="flag">40%</span>
                                </span>
                            </div>
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
                    <div class="btn-area center">
                        <BasicButton size="small">대출내역 확인</BasicButton>
                    </div>
                </div>

                <Anchor href="/" class="banner-box banner-finance type-loan">
                    <div class="available-box type02">
                        <p>추가대출가능 금액</p>
                        <span class="price"> <strong>5,000</strong> 만원 </span>
                        <p>이용가능금액 <em>연 5.2%</em></p>
                    </div>

                    <span class="txt-underline">추가대출받기</span>
                </Anchor>

                <!-- 금융_장기카드론_대출 이용거절 -->
                <Anchor
                    href="/"
                    class="banner-box banner-finance type-loan refusal"
                >
                    <div class="banner-title">
                        <em>여유있는 한도!</em>
                        <strong>중도상환 수수료 없는<br />장기카드론</strong>
                    </div>
                    <span class="agree">이용 동의</span>
                    <p class="info">
                        이용동의 하시고 이자율과 이용가능금액을 알아보세요.
                    </p>
                </Anchor>

                <!-- 금융 예외 케이스-->
                <Anchor
                    href="/"
                    class="banner-box banner-finance type-exception"
                >
                    <div class="banner-title">
                        <em>사장님을 위한</em>
                        <strong>우대신용대출</strong>
                    </div>
                    <p class="info">
                        한도조회는 신용평점에 영향을<br />
                        주지 않습니다.
                    </p>
                </Anchor>

                <!-- 사업자 대출 상환중 + 롯데카드 신청하여 보유한 사용자 -->
                <div class="box-price-info">
                    <div class="box-info-top">
                        <div class="item-info">
                            <strong>신용(사업자 대출)</strong>
                        </div>
                    </div>
                    <div class="price-list">
                        <ul>
                            <li>
                                <span class="subject">대출원금</span>
                                <strong class="price">26,000,000원</strong>
                            </li>
                        </ul>
                    </div>
                </div>

                <Anchor href="/" class="banner-box banner-finance type-loan">
                    <div class="banner-title">
                        <em>여유있는 한도!</em>
                        <strong>중도상환 수수료 없는<br />장기카드론</strong>
                    </div>
                    <div class="available-box">
                        <p>이용가능금액 <em>연 5.2%</em></p>
                        <span class="price"> <strong>5,000</strong> 만원 </span>
                    </div>
                </Anchor>

                <!-- 사업자 대출 상환중 + 장기카드 대출 상환 중 -->
                <div class="box-price-info">
                    <div class="box-info-top">
                        <div class="item-info">
                            <strong>신용(사업자 대출)</strong>
                        </div>
                    </div>
                    <div class="price-list">
                        <ul>
                            <li>
                                <span class="subject">대출원금</span>
                                <strong class="price">26,000,000원</strong>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="box-price-info">
                    <div class="box-info-top">
                        <span class="date">7월 8일(목) 기준</span>
                        <div class="item-info">
                            <strong>대출(장기카드)</strong>
                            <em>42,700,000원</em>
                        </div>
                    </div>
                    <div class="box-graph">
                        <div class="graph-bg">
                            <!--
                                [D] flag 디자인 케이스 정의 (기준 : 280px)
                                - 그래프의 %가 14% 이하일시 : left
                                - 그래프의 %가 89% 이상일시 : right
                            -->
                            <div class="graph right" style="width: 50%">
                                <!-- flag 화살표 더블클랙스 : left / right -->
                                <span class="point">
                                    <span class="flag">40%</span>
                                </span>
                            </div>
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
                    <div class="btn-area center">
                        <BasicButton size="small">대출내역 확인</BasicButton>
                    </div>
                </div>

                <!-- 즉시대출 -->
                <Anchor href="/" class="banner-box banner-finance type-instant">
                    <div class="banner-title">
                        <em>롯데카드 없어도</em>
                        <strong>간편하게 신용대출</strong>
                    </div>
                    <p class="info">
                        한도조회는 신용평점에 영향을<br />
                        주지 않습니다.
                    </p>
                </Anchor>

                <!-- e : 금융상품-->

                <!-- s : 마케팅 -->
                <div class="title-wrap">
                    <h2 class="title">마케팅</h2>
                    <Anchor href="/" class="btn-more">
                        <span class="ir">더보기</span>
                    </Anchor>
                </div>

                <!-- 마케팅 신청 하지 않은경우 -->
                <div class="box-banner-marketing">
                    <Anchor
                        href="/"
                        class="banner-box banner-marketing default"
                    >
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
                                    연탄 불고기 가맹점연탄 불고기 가맹점연탄
                                    불고기 가맹점연탄 불고기 가맹점
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
                        <Anchor
                            href="/"
                            class="banner-box banner-marketing default"
                        >
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

                <!-- s : 신용카드 -->
                <div class="title-wrap">
                    <h2 class="title">신용 카드</h2>
                </div>

                <!-- 신용카드 미보유 : 어드민등록 -->
                <Anchor
                    href="/"
                    class="banner-box banner-credit"
                    style="background-image:url('/assets/main/img_credit.png"
                >
                    <div class="banner-title">
                        <em>금융이자, 결제대금 납부까지 편리하게!</em>
                        <strong> LOCA MONEY<br />Biz 카드 </strong>
                    </div>
                </Anchor>

                <!-- 신용카드 보유시 -->
                <div class="box-price-info type-credit">
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
                <!--// e : 신용카드 -->

                <!-- s : 세무서비스 -->
                <Anchor href="/" class="banner-tax">
                    <em>가장 간편한 사업 관리</em>
                    <strong>간편하게 세무 관리<br />시작 하세요</strong>
                </Anchor>
                <!--// e : 세무서비스 -->

                <!-- s : 제휴사 -->
                <BannerSwiper class="box-banner-affiliate">
                    <swiper-slide>
                        <Anchor href="/" class="banner-box banner-affiliate">
                            <i class="img">
                                <img
                                    src="/assets/main/img_ affiliate.png"
                                    alt="제휴사 이미지"
                                />
                            </i>
                            <div class="affiliate-info">
                                <strong>
                                    알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤
                                </strong>
                                <p>
                                    출/퇴근 관리를 무료로 이용해 보세요.출/퇴근
                                    관리를 무료로 이용해 보세요.
                                </p>
                            </div>
                        </Anchor>
                    </swiper-slide>
                    <swiper-slide>
                        <Anchor href="/" class="banner-box banner-affiliate">
                            <i class="img">
                                <img
                                    src="/assets/main/img_ affiliate.png"
                                    alt="제휴사 이미지"
                                />
                            </i>
                            <div class="affiliate-info">
                                <strong>
                                    알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤
                                </strong>
                                <p>
                                    출/퇴근 관리를 무료로 이용해 보세요.출/퇴근
                                    관리를 무료로 이용해 보세요.
                                </p>
                            </div>
                        </Anchor>
                    </swiper-slide>
                </BannerSwiper>
                <!--// e : 제휴사 -->
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { AuthModule } from '@stores/modules/auth'
import { SwiperSlide } from 'vue-awesome-swiper'

@Component({
    components: {
        SwiperSlide,
    },
})
export default class MainPage extends Mixins(PageView) {
    get mainInfo() {
        return AuthModule.mainInfoData
    }

    /** @Computed */
    get info() {
        return JSON.stringify(this.mainInfo, null, 4)
    }

    created() {
        AuthModule.getMainInfo()
    }
}
</script>

<style scoped lang="scss" src="./main.scss" />

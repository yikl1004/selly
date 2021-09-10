<template>
    <div>
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
        <Anchor href="/" class="banner-box banner-finance type-biz refusal">
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

        <!--[D] 1차 오픈 -->
        <!-- 금융_장기카드론_대출 미신청 / 한도부족 심사부적격 -->
        <Anchor href="/" class="banner-box banner-finance type-loan">
            <div class="banner-title">
                <em>여유있는 한도!</em>
                <strong>중도상환 수수료 없는<br />장기카드 대출</strong>
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
                <p>추가대ㅁ출가능 금액</p>
                <span class="price"> <strong>5,000</strong> 만원 </span>
                <p>이용가능금액 <em>연 5.2%</em></p>
            </div>

            <span class="txt-underline">추가대출받기</span>
        </Anchor>

        <!-- 금융_장기카드론_대출 이용거절 -->
        <Anchor href="/" class="banner-box banner-finance type-loan refusal">
            <div class="banner-title">
                <em>여유있는 한도!</em>
                <strong>중도상환 수수료 없는<br />장기카드론</strong>
            </div>
            <span class="agree">이용 동의</span>
            <p class="info">
                이용동의 하시고 이자율과 이용가능금액을 알아보세요.
            </p>
        </Anchor>

        <!--[D] 1차 오픈 -->
        <!-- 금융 예외 케이스-->
        <Anchor href="/" class="banner-box banner-finance type-exception">
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

        <!--[D] 1차 오픈 -->
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Financial extends Vue {}
</script>

<style scoped></style>

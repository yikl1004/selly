<template>
    <Page floating footer>
        <Header type="sub" title="쿠폰 만들기" />
        <PageBody class="floating gray">
            <div class="content">
                <Title
                    title="고객들이 줄을 서는<br /> 쿠폰 만들기"
                    align="center"
                />
                <div class="box-img">
                    <img
                        src="/assets/marketing/img_application.png"
                        alt="쿠폰 마케팅 이미지"
                    />
                </div>
                <p>
                    사장님께서 롯데카드 회원 대상으로 진행 할 수 있는 쿠폰
                    마케팅으로, 가맹점 주변 롯데카드 회원에게 할인 혜택을
                    제공하여 더 많은 고객을 유치할 수 있습니다.
                </p>

                <!--디자인 수정예정-->
                <div
                    style="
                        width: 100%;
                        height: 200px;
                        margin-top: 48px;
                        background: #222;
                        color: #fff;
                        text-align: center;
                        line-height: 200px;
                    "
                >
                    해당영역 디자인 수정예정
                </div>
                <div class="coupon-info-list" style="display: none">
                    수정예정입니다. 노신경
                    <ul>
                        <li class="box-coupon-info">
                            <img
                                src="/assets/marketing/img_application_info01.png"
                                alt=""
                            />
                            <p>
                                첫 고객과 단골 타겟 설정을 통한<br />더욱
                                효과적인 마케팅
                            </p>
                        </li>
                        <li class="box-coupon-info">
                            <img
                                src="/assets/marketing/img_application_info02.png"
                                alt=""
                            />
                            <p>
                                타겟 고객에게 롯데카드<br />앱 푸시메시지와
                                터치쿠폰 노출
                            </p>
                        </li>
                        <li class="box-coupon-info">
                            <img
                                src="/assets/marketing/img_application_info03.png"
                                alt=""
                            />
                            <p>
                                방문고객 수, 결제금액에 따른<br />합리적인 비용
                            </p>
                        </li>
                        <li class="box-coupon-info">
                            <img
                                src="/assets/marketing/img_application_info04.png"
                                alt=""
                            />
                            <p>
                                행사 매출, 이용 건수, 이용 고객층 등<br />다양한
                                성과 분석 제공
                            </p>
                        </li>
                    </ul>
                </div>
                <!--//디자인 수정예정-->

                <Title
                    title="쿠폰 만들기는 이렇게 진행됩니다."
                    type="h3"
                    align="center"
                />

                <div class="box-coupon-step">
                    <div class="box-img">
                        <img
                            src="/assets/marketing/img_step.png"
                            alt="쿠폰 내용 설정 및 예상 수익 확인 >  신청 및 접수 > 관리자 검토 및 승인 > 행사 진행 및 중간 결과 확인 > 성과 분석 확인"
                        />
                    </div>
                </div>
            </div>

            <portal to="floating">
                <BasicButton size="large">신청하기</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MarketingPage extends Vue {}
</script>

<style scoped lang="scss" src="./Marketing.scss" />

<template>
    <Page floating footer>
        <Header type="sub" title="쿠폰 만들기" />
        <PageBody class="floating gray">
            <div class="content">
                <div class="top-visual">
                    <div class="box-img">
                        <img
                            src="/assets/marketing/img_application.png"
                            alt="쿠폰 마케팅 이미지"
                        />
                    </div>
                    <Title
                        title="고객들이 줄을 서는 쿠폰 만들기"
                        align="center"
                    >
                        <p>
                            우리 매장 주변 롯데카드 회원들에게 할인 쿠폰을
                            제공하여 제공하여 첫 고객과 단골 고객을 늘려보세요.
                        </p>
                    </Title>
                </div>

                <!--디자인 수정예정-->
                <div class="coupon-info-list">
                    <ul>
                        <li class="box-coupon-info">
                            <strong>첫 고객, 단골 고객별 맞춤 쿠폰 설정</strong>
                            <div class="img">
                                <img
                                    src="/assets/marketing/img_application_info01.png"
                                    alt=""
                                />
                            </div>
                            <p>
                                매장 주변의 첫 고객에게는 <br />할인혜택을
                                제공하여 첫 방문 유도를,<br />단골 고객에게는
                                추가혜택을 제공하여 <br />재방문을 유도할 수
                                있습니다.
                            </p>
                        </li>
                        <li class="box-coupon-info">
                            <strong>Selly만의 무료 홍보 서비스</strong>
                            <div class="img">
                                <img
                                    src="/assets/marketing/img_application_info02.png"
                                    alt=""
                                />
                            </div>
                            <ul>
                                <li>ㆍ 롯데카드 앱에 쿠폰 노출</li>
                                <li>
                                    ㆍ 쿠폰 행사 홍보를 위한 앱 푸시 메시지 발송
                                </li>
                                <li>
                                    ㆍ 고객이 매장을 쉽게 찾아갈 수 있도록<br />위치
                                    안내 서비스 제공
                                </li>
                            </ul>
                        </li>
                        <li class="box-coupon-info">
                            <strong>합리적인 비용</strong>
                            <div class="img">
                                <img
                                    src="/assets/marketing/img_application_info03.png"
                                    alt=""
                                />
                            </div>
                            <p>
                                첫 고객, 단골 고객별 비용 산정과 <br />무료 푸시
                                메시지 발송 서비스를 통해 <br />사장님의 비용
                                부담을 최소화 할 수 <br />있습니다.
                            </p>
                        </li>
                        <li class="box-coupon-info">
                            <strong>매일 알려드리는 진행 현황</strong>
                            <div class="img">
                                <img
                                    src="/assets/marketing/img_application_info04.png"
                                    alt=""
                                />
                            </div>
                            <p>
                                쿠폰 행사 진행 현황을 알 수 있도록 이용
                                <br />매출 현황을 알려드리고, 성별∙연령대별
                                이용<br />
                                현황 등을 추가로 분석해 드립니다.
                            </p>
                        </li>
                    </ul>
                </div>

                <Title
                    title="쿠폰 만들기는 이렇게 진행됩니다."
                    type="h3"
                    align="center"
                />

                <div class="box-coupon-step">
                    <div class="step-box col3">
                        <div class="step-box-item">
                            <span class="ir">1.</span>
                            <i class="img">
                                <img
                                    src="/assets/marketing/ico_marketing_intro01.png"
                                    alt=""
                                />
                            </i>
                            <p>쿠폰 내용 설정 및<br />예상 수익 확인</p>
                        </div>
                        <div class="step-box-item">
                            <span class="ir">2.</span>
                            <i class="img">
                                <img
                                    src="/assets/marketing/ico_marketing_intro02.png"
                                    alt=""
                                />
                            </i>
                            <p>신청 및 접수</p>
                        </div>
                        <div class="step-box-item">
                            <span class="ir">3.</span>
                            <i class="img">
                                <img
                                    src="/assets/marketing/ico_marketing_intro03.png"
                                    alt=""
                                />
                            </i>
                            <p>관리자 검토<br />및 승인</p>
                        </div>
                    </div>
                    <div class="step-box col2">
                        <div class="step-box-item">
                            <span class="ir">4.</span>
                            <i class="img">
                                <img
                                    src="/assets/marketing/ico_marketing_intro04.png"
                                    alt=""
                                />
                            </i>
                            <p>행사 진행 및<br />중간 결과 확인</p>
                        </div>
                        <div class="step-box-item">
                            <span class="ir">5.</span>
                            <i class="img">
                                <img
                                    src="/assets/marketing/ico_marketing_intro05.png"
                                    alt=""
                                />
                            </i>
                            <p>성과 분석<br />확인</p>
                        </div>
                    </div>
                </div>
            </div>

            <portal to="floating">
                <BasicButton size="large" @click="toApply">
                    신청하기
                </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { MarketingModule } from '@stores/modules/marketing'
import { Path } from '@router/routes'

/**
 * @description
 * 마케팅: 쿠폰 만들기 안내 페이지
 */
@Component
export default class MarketingPage extends Mixins(PageView) {
    toApply() {
        this.$router.push(Path.MarketingStepFirst)
    }

    /** @Lifecycle */
    async created() {
        // 마케팅 신청 가능 회원여부 조회
        await MarketingModule.getPossibleApplyUser()
    }
}
</script>

<style lang="scss" src="./index.scss" />

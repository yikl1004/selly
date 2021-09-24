<template>
    <Page floating>
        <Header type="proccess" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="3" :count="3" />
                <Title title="신청 내용 확인" />

                <InfoList :list="applyDetail" />

                <CouponList
                    :list="couponList"
                    @preview="openCouponPreview($event)"
                />

                <Title title="예상 결과" type="h3" />
                <ApplyResult
                    type="complete"
                    :target="estimateResult.target"
                    :selectRatio="estimateResult.selectRatio"
                    :salesAverage="estimateResult.salesAverage"
                />
                <BulletList :list="infoResult" />

                <Title title="프로모션 제휴 필수사항 확인" type="h3" />
                <CheckBoxGroup
                    id="promotionCheckBox"
                    ref="promotionCheckBox"
                    name="group1"
                    value="TOUCH 프로모션 제휴 약관 동의"
                    label="프로모션 제휴 필수사항 확인"
                    hidden-label
                    @toggle="onPromotionToggle"
                />
                <FullPopup
                    :show.sync="promotionTermsVisible"
                    title="TOUCH 프로모션 제휴 약관 동의"
                    type="popup"
                    :button-text="{ confirm: '확인' }"
                    @confirm="onPromotionTermsConfirm"
                >
                    <PopupTerms
                        :params="{ comGrpC: 'AGR_CPN', comC: 'PRV_1' }"
                    />
                </FullPopup>

                <!--[P] 아코디언 내용으로 하단의 bullet-list가 들어가야함. 개발 수정 요청중.-->
                <AccoItem :list="accordionList" />
            </div>

            <!--[D] 쿠폰 미리보기 팝업 -->
            <template v-if="couponPreviewProp">
                <FullPopup
                    :show.sync="popCouponPreview"
                    title="쿠폰 미리보기"
                    type="popup"
                    @confirm="onCouponPreviewConfirm"
                >
                    <PopupCouponPreview
                        :period="couponPreviewProp.period"
                        :discountRate="couponPreviewProp.discountRate"
                        :franchiseName="couponPreviewProp.franchiseName"
                        :gubun="couponPreviewProp.gubun"
                    />
                </FullPopup>
            </template>
            <!--//[D] 쿠폰 미리보기 팝업 -->

            <portal to="floating">
                <BasicButton size="large" @click="$router.back()">
                    이전
                </BasicButton>
                <BasicButton size="large" @click="apply">신청</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { ApplyResultRes, MarketingModule } from '@stores/modules/marketing'
import ApplyResult from '@components/marketing/ApplyResult.vue'
import CouponList from '@components/marketing/CouponList.vue'
import type { CouponItem } from '@components/marketing/CouponList.vue'
import type { AccordionListItem } from '@components/common/AccoItem.vue'
import type { CouponPreviewProps } from '@components/marketing/PopupCouponPreview.vue'
import { Path } from '@router/routes'
import type CheckBoxGroup from '@components/form/CheckBoxGroup.vue'

@Component({
    components: {
        ApplyResult,
        PopupCouponPreview: () => ({
            component: import('@components/marketing/PopupCouponPreview.vue'),
        }),
        CouponList,
    },
})
export default class StepThirdPage extends Vue {
    @Ref('promotionCheckBox') promotionCheckBox!: CheckBoxGroup

    /** 쿠폰 미리보기 팝업 */
    private popCouponPreview = false

    private infoResult = [
        {
            text:
                '롯데카드 결제 기준의 예상 산출이므로 실제 매출액, 고객수와 다를 수 있습니다.',
        },
    ]

    private accordionList: AccordionListItem[] = [
        {
            title: '유의사항',
            desc: `
                <ul class="bul-list">
                    <li> 법인카드/체크카드/기프트카드 결제는 쿠폰 행사 대상에서 제외됩니다. </li>
                    <li> 현장결제(매장)에서만 가능하며, 배달앱 등 온라인 결제는 제외됩니다. </li>
                    <li> 간편결제는 롯데 앱카드, 삼성페이, LG페이, Lpay만 가능합니다. </li>
                </ul>
            `,
        },
    ]

    /** 쿠폰 미리보기 정보 */
    private couponPreviewProp: null | CouponPreviewProps = null

    /** 프로모션 제휴 약관 팝업 */
    private promotionTermsVisible = false

    /** store에 저장된 form data */
    get theLastFormData() {
        return MarketingModule.theLastFormData
    }

    /** 가맹점 정보 */
    get franchiseInfo() {
        return MarketingModule.franchiseInfoData
    }

    /** 신청 상세 */
    get applyDetail() {
        const data = MarketingModule.franchiseInfoData
        const formData = MarketingModule.theLastFormData
        return [
            {
                title: '매장명',
                desc: data?.mcNm,
            },
            {
                title: '주소',
                desc: `${data?.pnadd} ${data?.bpsnoAdd}`,
            },
            {
                title: '전화번호',
                desc: data?.mcTlno,
            },
            {
                title: '홍보 방식',
                desc: '롯데카드 앱 푸시메시지, 롯데카드 앱에 쿠폰 노출 ',
            },
            {
                title: '추천인 코드',
                desc: formData.refC,
            },
        ]
    }

    /** 쿠폰 리스트 정보 */
    get couponList(): CouponItem[] {
        const list = MarketingModule.theLastFormData.list
        return list.map(item => ({
            gubun: item.ggDc,
            discountRate: item.bnfDcR,
            period: `${this.$dayjs(item.evSdt).format(
                'YYYY.MM.DD',
            )}~${this.$dayjs(item.evEdt).format('YYYY.MM.DD')}`,
            target: item.trgOjCstt,
        }))
    }

    /** 마케팅 행사 대상자 조회 결과 값 */
    get marketingTarget() {
        return {
            /** 첫 고객 수 */
            firstCustomer: MarketingModule.marketingTargetData?.newEvOjpT,
            /** 첫 고객 수 PUSH */
            firstCustomerPush: MarketingModule.marketingTargetData?.newPushOjpT,
            /** 단골 고객 수 */
            regularCustomer: MarketingModule.marketingTargetData?.odEvOjpT,
            /** 단골 고객 수 PUSH */
            regularCustomerPush:
                MarketingModule.marketingTargetData?.odPushOjpT,
        }
    }

    /** 예상 결과 */
    get estimateResult() {
        return {
            // 행사 대상자 수
            target: {
                first: this.marketingTarget.firstCustomer || '0',
                regular: this.marketingTarget.regularCustomer || '0',
            },
            // 선택된 할인율
            selectRatio: this.theLastFormData.list.reduce(
                (acc, cv) => {
                    const key: 'first' | 'regular' =
                        cv.ggDc === '1' ? 'first' : 'regular'
                    acc[key] = cv.bnfDcR

                    return acc
                },
                { first: '0', regular: '0' } as {
                    first?: string
                    regular?: string
                },
            ),
            // 평균 매출
            salesAverage: {
                first: this.lastYearSalesAverage.first?.slAv || '0',
                regular: this.lastYearSalesAverage.regular?.slAv || '0',
            },
        }
    }

    /** 전년 동기간 매출 평균 */
    get lastYearSalesAverage() {
        return MarketingModule.lastYearSalesAverageData
    }

    /** 최종 신청 결과 */
    get applyResultData() {
        return MarketingModule.applyResultData
    }

    @Watch('applyResultData')
    changeApplyResultData(value: ApplyResultRes | null) {
        if (value) {
            this.$modal.open({
                message: value.data.rspDcMsg,
                buttonText: {
                    confirm: '확인',
                },
                confirm: () => {
                    if (value.data.rspDc === '0000') {
                        this.$router.push(Path.Main)
                    }
                },
            })
        }
    }

    /** 프로모션 제휴 약관 팝업에서 확인 버튼 눌렀을 때 */
    onPromotionTermsConfirm() {
        this.promotionCheckBox.allCheck = true
    }

    /** 미리보기 팝업 쿠폰 데이터 */
    getCouponPreviewProps(gubun: '1' | '2'): null | CouponPreviewProps {
        const origin = this.theLastFormData.list.find(
            item => item.ggDc === gubun,
        )

        if (origin) {
            return {
                period: {
                    start: origin.evSdt,
                    end: origin.evEdt,
                },
                discountRate: origin.bnfDcR,
                franchiseName: this.franchiseInfo?.mcNm || '',
                gubun,
            }
        } else {
            return null
        }
    }

    /** 미리보기 팝업 열기/닫기 */
    openCouponPreview(gubun: '1' | '2') {
        this.couponPreviewProp = this.getCouponPreviewProps(gubun)
        this.popCouponPreview = true
    }

    // 미리보기 팝업 닫기
    onCouponPreviewConfirm() {
        // 확인 버튼
    }

    /** 신청 */
    async apply() {
        await MarketingModule.apply()
    }

    /** 프로모션 제휴약관 동의 */
    onPromotionToggle(/* value: boolean */) {
        this.promotionTermsVisible = true
    }

    handelPageValidate() {
        if (!this.theLastFormData.mcno) {
            const back = () => this.$router.back()

            this.$modal.open({
                message: '정보가 유실되었습니다.',
                buttonText: {
                    confirm: '확인',
                },
                confirm: back,
                cancel: back,
            })
        }
    }

    mounted() {
        this.infoResult.push({
            text: `행사 비용(할인혜택)은 <strong>${this.franchiseInfo?.mcNm}</strong> 가맹점 대금에서 차감되는 금액으로, 방문고객 수와 고객의 결제금액에 따라 변경될 수 있습니다.`,
        })

        this.handelPageValidate()
    }

    updated() {
        this.handelPageValidate()
    }
}
</script>

<style lang="scss" src="./StepThird.scss"></style>

<template>
    <Page floating :footer="false">
        <Header type="proccess" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div v-if="marketingTargetData" class="content">
                <Step :active="2" :count="3" />
                <Title title="쿠폰 내용 설정" />

                <div class="benefit-select-wrap">
                    <Title title="대상 및 혜택" type="h3" />
                    <div
                        :class="[
                            'benefit-select-box',
                            { active: isActiveClass('first') },
                        ]"
                    >
                        <div class="benefit-title">
                            <label>
                                <input
                                    value="first"
                                    type="checkbox"
                                    @change="onChange($event.target)"
                                />
                                <i>
                                    <strong>첫 고객 만들기</strong>
                                    <em>{{ firstCustomer }}명</em>
                                </i>
                                <span class="sub-text">
                                    최근 1개월간 내 매장을 방문하지 않은 고객 중
                                    반경 1km의 다른 매장을 이용한 고객
                                </span>
                            </label>
                        </div>
                        <div class="benefit-detail">
                            <CalendarField
                                id="firstCustomerPeriod"
                                label="행사 기간"
                                name="date"
                                isRange
                                :readonly="false"
                                :default-value="period"
                                :min-date="startDate"
                                :range-section="29"
                                @change="onDayClick"
                            />
                            <BulletList :list="infoDate" />
                            <RadioGroup
                                name="benefitRadio1"
                                :disabled="false"
                                :list="benefitRadio"
                                label="할인 혜택(결제일 할인)"
                            />
                            <BulletList :list="infoBenefit" />
                        </div>
                    </div>

                    <div
                        :class="[
                            'benefit-select-box',
                            { active: isActiveClass('regular') },
                        ]"
                    >
                        <div class="benefit-title">
                            <label>
                                <input
                                    value="regular"
                                    type="checkbox"
                                    @change="onChange($event.target)"
                                />
                                <i>
                                    <strong>단골 만들기</strong>
                                    <em>{{ regularCustomer }}명</em>
                                </i>
                                <span class="sub-text">
                                    최근 3개월간 내 매장에서 1회 이상 결제한
                                    고객
                                </span>
                            </label>
                        </div>
                        <div class="benefit-detail">
                            <CalendarField
                                id="regularCustomerPeriod"
                                label="행사 기간"
                                name="date"
                                isRange
                                :readonly="false"
                                :default-value="period"
                                :min-date="startDate"
                                :range-section="29"
                                @change="onDayClick"
                            />
                            <BulletList :list="infoDate" />
                            <RadioGroup
                                name="benefitRadio"
                                :disabled="false"
                                :list="benefitRadio"
                                label="할인 혜택(결제일 할인)"
                            />
                            <BulletList :list="infoBenefit" />
                        </div>
                    </div>
                </div>

                <div class="promotion-sys-wrap">
                    <Title title="홍보 방식" type="h3" />
                    <div class="promotion-box">
                        <strong class="promotion-title">
                            롯데카드 앱 내 터치쿠폰 노출
                        </strong>
                        <p>행사 대상자 전체</p>
                        <ul>
                            <li>
                                첫 고객 :
                                <strong> {{ firstCustomer }}명 </strong>
                            </li>
                            <li>
                                단골 :
                                <strong>{{ regularCustomer }}명</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="promotion-box type01">
                        <strong class="promotion-title">
                            앱 푸시메시지 무료 발송
                        </strong>
                        <p>
                            행사 대상자 중 푸시메시지 수신 동의 고객에게 행사
                            첫날 앱 푸시메시지 발송
                        </p>
                        <ul>
                            <li>
                                첫 고객 :
                                <strong>{{ firstCustomerPush }}명</strong>
                            </li>
                            <li>
                                단골 :
                                <strong>{{ regularCustomerPush }}명</strong>
                            </li>
                        </ul>
                    </div>
                </div>

                <Title title="예상 결과" type="h3" />
                <ApplyResult />
                <BulletList :list="infoResult" />

                <RecommenderBox />
            </div>

            <portal to="floating">
                <BasicButton size="large">다음</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApplyResult from '@components/marketing/ApplyResult.vue'
import { MarketingModule } from '@stores/modules/marketing'
import type { RadioProps } from '@components/form/Radio.vue'
import type { Period } from '@components/form/CalendarField.vue'

@Component({
    components: { ApplyResult },
    beforeRouteEnter(to, from, next) {
        if (to.query.mcno && to.query.bzno) {
            next()
        }
    },
})
export default class MarketingApply extends Vue {
    private infoDate = [
        {
            text:
                '쿠폰 행사는 신청일로부터 7일 이후 시작 가능하며, 최대 30일까지 설정 가능합니다.',
        },
    ]

    private infoBenefit = [
        {
            text:
                '롯데 신용카드 결제에 한하여, 행사 기간 중 1인당 1회만 적용됩니다.',
        },
    ]
    private infoResult = [
        {
            text:
                '롯데카드 결제 기준의 예상 산출이므로 실제 매출액, 고객수와 다를 수 있습니다.',
        },
        {
            text:
                '행사 비용(할인혜택)은 <strong>이층집 강남점</strong> 가맹점 대금에서 차감되는 금액으로, 방문고객 수와 고객의 결제금액에 따라 변경될 수 있습니다.',
        },
        {
            text:
                '이전 달 매출 금액이 없을 경우 예상 수익이 산출되지 않을 수 있습니다.',
        },
    ]

    private benefitRadio: RadioProps[] = [
        { value: '5', label: '5%', checked: false },
        { value: '10', label: '10%', checked: true },
        { value: '15', label: '15%', checked: false },
    ]
    private isActive: ('regular' | 'first')[] = []

    /**  */

    /** 시작 일자 */
    get startDate(): Date {
        return this.$dayjs().add(6, 'day').toDate()
    }

    /** 마케팅 기간 기본값 */
    get period(): { start: Date; end: Date } {
        const standardDate = this.$dayjs().add(6, 'day')
        const start = standardDate.toDate()
        const end = standardDate.add(29, 'day').toDate()

        return { start, end }
    }

    /** 마케팅 행사 대상자 조회 결과 값 */
    get marketingTargetData() {
        return MarketingModule.marketingTargetData
    }

    /** 첫 고객 수 */
    get firstCustomer() {
        return this._.toNumber(
            this.marketingTargetData?.newEvOjpT || 0,
        ).toLocaleString()
    }

    /** 단골 고객 수 */
    get regularCustomer() {
        return this._.toNumber(
            this.marketingTargetData?.odEvOjpT,
        ).toLocaleString()
    }

    /** 첫 고객 수 */
    get firstCustomerPush() {
        return this._.toNumber(
            this.marketingTargetData?.newPushOjpT,
        ).toLocaleString()
    }

    /** 단골 고객 수 */
    get regularCustomerPush() {
        return this._.toNumber(
            this.marketingTargetData?.odPushOjpT,
        ).toLocaleString()
    }

    /** 활성화 상태 css class 반환 (toggle) */
    isActiveClass(value: 'first' | 'regular'): boolean {
        return this.isActive.some(item => item === value)
    }

    /* 체크박스 체크시 내용 토글됨 */
    onChange({
        value,
        checked,
    }: {
        value: 'regular' | 'first'
        checked: boolean
    }) {
        if (checked) {
            this.isActive.push(value)
        } else {
            this.isActive = this.isActive.filter(item => item !== value)
        }
    }

    /** 캘린더 선택 */
    onDayClick({ fieldName, value }: { fieldName: string; value: Period }) {
        console.log(fieldName, value)
    }

    /** @Lifecycle */

    async created() {
        const { mcno, bzno } = this.$route.query
        await MarketingModule.getMarketingTarget({
            mcno: (mcno as string) || '',
            bzno: (bzno as string) || '',
        })
    }
}
</script>

<style lang="scss" scoped src="./StepSecond.scss"></style>

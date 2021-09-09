<template>
    <Page floating :footer="false">
        <Header type="proccess" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div v-if="marketingTarget" class="content">
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
                                    @change="
                                        onChangeCustomerCheck($event.target)
                                    "
                                />
                                <i>
                                    <strong>첫 고객 만들기</strong>
                                    <em>
                                        {{ marketingTarget.firstCustomer }}
                                        명
                                    </em>
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
                                @change="onChangePeriod('first', $event)"
                            />
                            <BulletList :list="infoDate" />
                            <RadioGroup
                                name="benefitRadio1"
                                :disabled="false"
                                :list="benefitRadio"
                                label="할인 혜택(결제일 할인)"
                                @change="onChangDiscountRate('first', $event)"
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
                                    @change="
                                        onChangeCustomerCheck($event.target)
                                    "
                                />
                                <i>
                                    <strong>단골 만들기</strong>
                                    <em>
                                        {{ marketingTarget.regularCustomer }}
                                        명
                                    </em>
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
                                @change="onChangePeriod('regular', $event)"
                            />
                            <BulletList :list="infoDate" />
                            <RadioGroup
                                name="benefitRadio"
                                :disabled="false"
                                :list="benefitRadio"
                                label="할인 혜택(결제일 할인)"
                                @change="onChangDiscountRate('regular', $event)"
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
                                <strong>
                                    {{ marketingTarget.firstCustomer }}명
                                </strong>
                            </li>
                            <li>
                                단골 :
                                <strong>
                                    {{ marketingTarget.regularCustomer }}
                                    명
                                </strong>
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
                                <strong>
                                    {{ marketingTarget.firstCustomerPush }}
                                    명
                                </strong>
                            </li>
                            <li>
                                단골 :
                                <strong>
                                    {{ marketingTarget.regularCustomerPush }}
                                    명
                                </strong>
                            </li>
                        </ul>
                    </div>
                </div>
                <Title title="예상 결과" type="h3" />
                <ApplyResult
                    :target="estimateResult.target"
                    :selectRatio="estimateResult.selectRatio"
                    :salesAverage="estimateResult.salesAverage"
                />
                <BulletList :list="infoResult" />
                <RecommenderBox @change="onChangeRecommender" />
            </div>

            <portal to="floating">
                <BasicButton size="large" @click="nextStep">다음</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApplyResult from '@components/marketing/ApplyResult.vue'
import { MarketingModule } from '@stores/modules/marketing'
import type { CustomerItem } from '@stores/modules/marketing'
import type { RadioProps } from '@components/form/Radio.vue'
import type { Period } from '@components/form/CalendarField.vue'

type Customer =
    | 'first' // 첫 고객
    | 'regular' // 단골 고객
type RequiredData = { mcno: string; bzno: string }

@Component({
    components: { ApplyResult },
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

    /** 혜택 할인 율 */
    private benefitRadio: RadioProps[] = [
        { value: '5', label: '5%', checked: true },
        { value: '10', label: '10%' },
        { value: '15', label: '15%' },
    ]
    /** 고객 별 박스 활성화(toggle) */
    private isActive: Customer[] = []

    /** 추천인 코드 활성화 */
    private activeRecommender = false
    /** 추천인 코드 */
    private recommenderCode = ''

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

    /** 사업자 번호, 가맹점 번호 */
    get requiredData(): RequiredData {
        const franchiseInfo = MarketingModule.franchiseInfo
        return {
            mcno: franchiseInfo?.mcno as string,
            bzno: franchiseInfo?.bzno as string,
        }
    }

    /** store에 저장된 form data */
    get theLastFormData() {
        return MarketingModule.theLastFormData
    }

    /** 전년 동기간 매출 평균 */
    get lastYearSalesAverage() {
        return MarketingModule.lastYearSalesAverageData
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

    makeFormattedDate(value: Date): string {
        return this.$dayjs(value).format('YYYYMMDD')
    }

    /** 다음 스텝 */
    nextStep() {
        // 다음 스텝
    }

    /** 할인율 변경(radio) */
    onChangDiscountRate(type: Customer, value: string) {
        console.log(type, value)
        this.setCustomerData(type, {
            bnfDcR: value,
        })
    }

    /** 추천인 코드 선택 했을 경우 - 체크박스 */
    onChangeRecommender(recommenderCode: string) {
        this.recommenderCode = recommenderCode
    }

    /** 활성화 상태 css class 반환 (toggle) */
    isActiveClass(value: Customer): boolean {
        return this.isActive.some(item => item === value)
    }

    /** 고객 별 데이터 세팅 */
    setCustomerData(type: Customer, value: Partial<CustomerItem>) {
        const keyMap: { [key: string]: '1' | '2' } = {
            first: '1',
            regular: '2',
        }
        const currentKey = keyMap[type]
        const originData = this.theLastFormData.list.find(
            item => item.ggDc === currentKey,
        )

        MarketingModule.setCustomerList({
            ...(originData || {}),
            ggDc: currentKey,
            ...value,
        } as CustomerItem)
    }

    /* 체크박스 체크시 내용 토글됨 */
    onChangeCustomerCheck({
        value,
        checked,
    }: {
        value: Customer
        checked: boolean
    }) {
        if (checked) {
            this.isActive.push(value)
            this.setCustomerData(value, {
                evSdt: this.makeFormattedDate(this.period.start),
                evEdt: this.makeFormattedDate(this.period.end),
                bnfDcR: '5',
                trgOjCstt:
                    value === 'first'
                        ? this.marketingTarget.firstCustomer
                        : this.marketingTarget.regularCustomer,
            })
            this.inquirySalesAverage(value, this.period)
        } else {
            this.isActive = this.isActive.filter(item => item !== value)
            MarketingModule.removeCustomerListItem(
                value === 'first' ? '1' : '2',
            )
        }
    }

    /** 캘린더 기간이 변경 될 경우 */
    async onChangePeriod(type: Customer, { value }: { value: Period }) {
        this.setCustomerData(type, {
            evSdt: this.makeFormattedDate(value.start),
            evEdt: this.makeFormattedDate(value.end),
        })
        await this.inquirySalesAverage(type, value)
    }

    /**
     * 전년 동일기간 매출 평균 조회
     * @description 첫고객, 단골고객 각각 행사기간 변경 시 조회
     */
    async inquirySalesAverage(type: Customer, period: Period) {
        if (type !== 'first' && type !== 'regular') {
            return
        }

        await MarketingModule.getLastYearSalesAverage({
            type,
            params: {
                mcno: this.requiredData.mcno,
                evSdt: this.makeFormattedDate(period.start),
                evEdt: this.makeFormattedDate(period.end),
            },
        })
    }

    /** @Lifecycle */

    async created() {
        const { mcno, bzno } = this.requiredData
        await MarketingModule.getMarketingTarget({ mcno, bzno })
    }

    mounted() {
        const franchiseInfo = MarketingModule.franchiseInfoData
        this.infoResult.push({
            text: `행사 비용(할인혜택)은 <strong>${franchiseInfo?.mcNm}</strong> 가맹점 대금에서 차감되는 금액으로, 방문고객 수와 고객의 결제금액에 따라 변경될 수 있습니다.`,
        })
    }
}
</script>

<style lang="scss" scoped src="./StepSecond.scss"></style>

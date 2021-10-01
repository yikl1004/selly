<template>
    <Page floating :footer="false">
        <Header type="proccess" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="2" :count="3" />
                <Title title="쿠폰 내용 설정" />

                <div class="benefit-select-wrap">
                    <Title title="대상 및 혜택" type="h3" />
                    <div
                        v-for="(item, index) in couponList"
                        :key="`coupon-item${index}`"
                        :class="[
                            'benefit-select-box',
                            { active: isActiveClass(item.c.toString()) },
                        ]"
                    >
                        <div class="benefit-title">
                            <label>
                                <input
                                    :value="item.c"
                                    type="checkbox"
                                    @change="
                                        onChangeCustomerCheck($event.target)
                                    "
                                />
                                <i>
                                    <strong>{{ item.cnm }}</strong>
                                    <em>
                                        {{ seperateNumber(item.etUCstt) }} 명
                                    </em>
                                </i>
                                <span class="sub-text">
                                    {{ getCustomerTextByCase(item.c) }}
                                </span>
                            </label>
                        </div>
                        <!-- :range-section="29" -->
                        <!-- :min-date="startDate" -->
                        <div class="benefit-detail">
                            <CalendarField
                                id="firstCustomerPeriod"
                                label="행사 기간"
                                name="date"
                                isRange
                                :readonly="false"
                                :default-value="{
                                    start: $dayjs().add(7, 'day'),
                                    end: $dayjs().add(13, 'day'),
                                }"
                                @change="onChangePeriod(item.c, $event)"
                            />
                            <BulletList :list="infoDate" />
                            <RadioGroup
                                :name="`benefitRadio${item.c}`"
                                :disabled="false"
                                :list="
                                    item.c === '1'
                                        ? benefitRadioForFirst
                                        : benefitRadioForRegular
                                "
                                label="할인 혜택(결제일 할인)"
                                @change="onChangDiscountRate(item.c, $event)"
                            />
                            <BulletList :list="infoBenefit" />
                        </div>
                    </div>
                </div>

                <BulletList :list="infoCoupon" />

                <div class="promotion-sys-wrap">
                    <Title title="홍보 방식" type="h3" />
                    <div
                        v-for="(item, index) in promotionList"
                        :key="`promotion-${index}`"
                        class="promotion-box"
                        :class="item.c === '2' ? 'type01' : ''"
                    >
                        <strong class="promotion-title">
                            {{ item.cnm }}
                        </strong>
                        <p>행사 대상자 전체</p>
                        <ul>
                            <li>
                                첫 고객 :
                                <strong>
                                    {{ seperateNumber(item.etUCstt) }}명
                                </strong>
                            </li>
                            <li>
                                단골 :
                                <strong>
                                    {{ seperateNumber('1111111') }}
                                    명
                                </strong>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="promotion-box type01">
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
                                    {{
                                        _.toNumber(
                                            marketingTarget.firstCustomerPush,
                                        ).toLocaleString()
                                    }}
                                    명
                                </strong>
                            </li>
                            <li>
                                단골 :
                                <strong>
                                    {{
                                        _.toNumber(
                                            marketingTarget.regularCustomerPush,
                                        ).toLocaleString()
                                    }}
                                    명
                                </strong>
                            </li>
                        </ul>
                    </div> -->
                </div>
                <!-- <Title title="예상 결과" type="h3" /> -->
                <!-- <ApplyResult
                        v-if="estimateResult"
                        :target="estimateResult.target"
                        :selectRatio="estimateResult.selectRatio"
                        :salesAverage="estimateResult.salesAverage"
                    /> -->
                <!-- <BulletList :list="infoResult" />
                <RecommenderBox
                    @check="onCheckRecommender"
                    @search="onSearchRecommender"
                /> -->
            </div>

            <!-- <portal to="floating">
                <BasicButton size="large" :disabled="false" @click="nextStep">
                    다음
                </BasicButton>
            </portal> -->
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ApplyResult from '@components/marketing/ApplyResult.vue'
import { NewMarketingModule } from '@stores/modules/newMarketing'
import { Path } from '@router/routes'
import type { CustomerItem } from '@stores/modules/marketing'
import type { RadioProps } from '@components/form/Radio.vue'
import type { Period } from '@components/form/CalendarField.vue'

@Component({
    components: { ApplyResult },
})
export default class StepSecondPage extends Vue {
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

    private infoCoupon = [
        {
            text: '행사 비용은 가맹점 대금에서 차감됩니다.',
        },
    ]
    private infoResult = [
        {
            text:
                '롯데카드 결제 기준의 예상 산출이므로 실제 매출액, 고객수와 다를 수 있습니다.',
        },
        {
            text:
                '이전 달 매출 금액이 없을 경우 예상 수익이 산출되지 않을 수 있습니다.',
        },
    ]

    /** 혜택 할인 율 - 첫고객 */
    private benefitRadioForFirst: RadioProps[] = []

    /** 혜택 할인 율 - 단골고객 */
    private benefitRadioForRegular: RadioProps[] = []

    /** 고객 별 박스 활성화(toggle) */
    private isActive: string[] = []

    /** 추천인 코드 활성화 */
    private activeRecommender = false

    /** 추천인 코드 */
    private recommenderCode = false

    /** 쿠폰 리스트 */
    get couponList() {
        return NewMarketingModule.couponList
    }

    /** 혜택율 선택 리스트 */
    get benefitList() {
        return NewMarketingModule.benefitList
    }

    /** 미리 선택된 혜택률 */
    get alreadyBenefit() {
        return NewMarketingModule.alreadyBenefit
    }

    /** 홍보수단 리스트 */
    get promotionList() {
        return NewMarketingModule.promotionList
    }

    /** 기간 선택 - 달력 */
    onChangePeriod(customerType: string, value: string) {
        console.log(customerType, value)
    }

    /** 혜택율 선택 - 라디오 버튼 */
    onChangDiscountRate(customerType: string, value: string) {
        console.log(customerType, value)
    }

    /** 고객별 텍스트 */
    getCustomerTextByCase(value: string) {
        if (value === '1') {
            return `최근 1개월간 내 매장을 방문하지 않은 고객 중 반경 1km의 다른 매장을 이용한 고객`
        } else if (value === '2') {
            return `최근 3개월간 내 매장에서 1회 이상 결제한 고객`
        } else {
            return ''
        }
    }

    /* 체크박스 체크시 내용 토글됨 */
    onChangeCustomerCheck({
        value,
        checked,
    }: {
        value: string
        checked: boolean
    }) {
        const { cloneDeep, uniq } = this._
        console.log({ value, checked })

        const origin = cloneDeep(this.isActive)
        if (checked) {
            origin.push(value)
            this.isActive = uniq(origin)
        } else {
            this.isActive = origin.filter(item => item !== value)
        }
    }

    /** 활성화 상태 css class 반환 (toggle) */
    isActiveClass(value: string): boolean {
        return this.isActive.some(item => item === value)
    }

    async mounted() {
        await NewMarketingModule.getCreateCouponDefaultInfo()

        this.benefitRadioForFirst = this.benefitList.map(item => {
            return {
                value: item.c,
                checked: this.alreadyBenefit === item.c,
                label: item.cnm,
            }
        })
        this.benefitRadioForRegular = this.benefitList.map(item => {
            return {
                value: item.c,
                checked: this.alreadyBenefit === item.c,
                label: item.cnm,
            }
        })
    }
}
</script>

<style lang="scss" scoped src="./StepSecond.scss"></style>

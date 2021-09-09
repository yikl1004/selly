<template>
    <div
        :class="[
            'promotion-result-wrap',
            { active: isActive || type === 'complete' },
        ]"
    >
        <div class="result-box total">
            <div class="result-total">
                <strong class="title">
                    예상 수익 (A)
                    <span>A = B - ( C+D )</span>
                </strong>
                <em class="result-value">
                    {{
                        (
                            estimateSales.all -
                            (estimateEventCost.all + 0)
                        ).toLocaleString()
                    }}
                    원
                </em>
            </div>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 예상 이용 고객 </strong>
                <em class="result-value">
                    {{ estimateCustomerCount.all.toLocaleString() }}
                    명
                </em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title">첫 고객 만들기</span>
                    <span class="result-value">
                        {{ estimateCustomerCount.first.toLocaleString() }}
                        명
                    </span>
                </li>

                <li>
                    <span class="title">단골 만들기</span>
                    <span class="result-value">
                        {{ estimateCustomerCount.regular.toLocaleString() }}
                        명
                    </span>
                </li>
            </ul>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 예상 이용 매출 (B) </strong>
                <em class="result-value">
                    {{ estimateSales.all.toLocaleString() }}
                    원
                </em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title">첫 고객 만들기</span>
                    <span class="result-value">
                        {{ estimateSales.first.toLocaleString() }}
                        원
                    </span>
                </li>

                <li>
                    <span class="title">단골 만들기</span>
                    <span class="result-value">
                        {{ estimateSales.regular.toLocaleString() }}
                        원
                    </span>
                </li>
            </ul>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 행사 비용 (할인혜택) (C) </strong>
                <em class="result-value">
                    {{ estimateEventCost.all.toLocaleString() }}
                    원
                </em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title">첫 고객 만들기</span>
                    <span class="result-value">
                        {{ estimateEventCost.first.toLocaleString() }}
                        원
                    </span>
                </li>

                <li>
                    <span class="title">단골 만들기</span>
                    <span class="result-value">
                        {{ estimateEventCost.regular.toLocaleString() }}
                        원
                    </span>
                </li>
            </ul>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 홍보 비용 (D) </strong>
                <em class="result-value">0원</em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title"> 롯데카드 앱 푸시메시지 </span>
                    <span class="result-value">무료</span>
                </li>

                <li>
                    <span class="title"> 롯데카드 앱에 쿠폰 노출 </span>
                    <span class="result-value">노출</span>
                </li>
            </ul>
        </div>

        <!--[D]클릭시 자세히 보기 > 간략히 보기 로 텍스트변경 및 active 클래스 추가 필요-->
        <BasicButton v-if="type !== 'complete'" type="more" @click="onMore">
            {{ buttonText }}
        </BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type CustomerCase<T = string> = {
    first: T
    regular: T
}

@Component
export default class ApplyResult extends Vue {
    /* 신청 완료페이지 케이스 */
    @Prop({ type: String })
    readonly type!: string

    /** 행사대상자 */
    @Prop(Object)
    readonly target!: CustomerCase

    /** 선택한 할인율 */
    @Prop(Object)
    readonly selectRatio!: CustomerCase<'5' | '10' | '15'>

    /** 평균 매출 */
    @Prop(Object)
    readonly salesAverage!: CustomerCase

    /* 더보기버튼 */
    private isActive = false

    /** 더보기 버튼 문구 */
    get buttonText(): string {
        return this.isActive ? '간략히 보기' : '자세히 보기'
    }

    /** 선택 할인율에 따른 반응률 */
    get reactionRate() {
        const map = {
            '5': 1,
            '10': 1.25,
            '15': 1.5,
        }
        return {
            first: map[this.selectRatio.first] || 0,
            regular: map[this.selectRatio.regular] || 0,
        }
    }

    /** 예상 이용 고객수 */
    get estimateCustomerCount() {
        const first =
            this._.toNumber(this.target.first) * 0.46 * this.reactionRate.first
        const regular =
            this._.toNumber(this.target.regular) *
            0.46 *
            this.reactionRate.regular

        return {
            first,
            regular,
            all: first + regular,
        }
    }

    /** 예상 이용 매출 금액 */
    get estimateSales() {
        const first =
            this._.toNumber(this.estimateCustomerCount.first) *
            this._.toNumber(this.salesAverage.first)
        const regular =
            this._.toNumber(this.estimateCustomerCount.regular) *
            this._.toNumber(this.salesAverage.regular)
        return {
            first,
            regular,
            all: first + regular,
        }
    }

    /** 행사 비용 */
    get estimateEventCost() {
        const first =
            this.estimateCustomerCount.first *
            (this._.toNumber(this.salesAverage.first) *
                this._.toNumber(this.selectRatio.first))
        const regular =
            this.estimateCustomerCount.regular *
            (this._.toNumber(this.salesAverage.regular) *
                this._.toNumber(this.selectRatio.regular))

        return {
            first,
            regular,
            all: first + regular,
        }
    }

    /* 더보기 버튼 액션 */
    onMore() {
        this.isActive = !this.isActive
    }
}
</script>

<style scoped lang="scss" src="./ApplyResult.scss"></style>

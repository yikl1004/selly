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
                <em class="result-value"> 4,500,000원 </em>
            </div>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 예상 이용 고객 </strong>
                <em class="result-value"> 0원 </em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title">첫 고객 만들기</span>
                    <span class="result-value">0명</span>
                </li>

                <li>
                    <span class="title">단골 만들기</span>
                    <span class="result-value">0명</span>
                </li>
            </ul>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 예상 이용 매출 (B) </strong>
                <em class="result-value"> 0원 </em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title">첫 고객 만들기</span>
                    <span class="result-value">0명</span>
                </li>

                <li>
                    <span class="title">단골 만들기</span>
                    <span class="result-value">0명</span>
                </li>
            </ul>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 예상 비용 (할인혜택) (C) </strong>
                <em class="result-value"> 0원 </em>
            </div>
            <ul class="result-detail">
                <li>
                    <span class="title">첫 고객 만들기</span>
                    <span class="result-value">0명</span>
                </li>

                <li>
                    <span class="title">단골 만들기</span>
                    <span class="result-value">0명</span>
                </li>
            </ul>
        </div>

        <div class="result-box">
            <div class="result-total">
                <strong class="title"> 홍보 비용 (D) </strong>
                <em class="result-value"> 0원 </em>
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

        <BasicButton v-if="type !== 'complete'" type="more" @click="onMore">
            더보기
        </BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ApplyResult extends Vue {
    /**
     * @category Prop
     */
    /* 신청 완료페이지 케이스 */
    @Prop({ type: String })
    readonly type!: string

    /**
     * @category Data
     */
    /* 더보기버튼 */
    private isActive = false

    /**
     * @category Methods
     */
    /* 더보기 버튼 액션 */
    onMore() {
        this.isActive = !this.isActive
    }
}
</script>

<style scoped lang="scss" src="./ApplyResult.scss"></style>

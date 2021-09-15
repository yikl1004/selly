<template>
    <div v-if="financialData">
        <Title title="금융 상품" />

        <!-- 비즈론: 1, 장기카드론: 2 -->
        <Anchor
            :href="link"
            :class="['banner-box', 'banner-finance', `type-${klass}`]"
        >
            <div class="banner-title">
                <template v-if="isLoan">
                    <em>여유있는 한도!</em>
                    <strong>중도상환 수수료 없는<br />장기카드 대출</strong>
                </template>
                <template v-if="isBiz">
                    <em>사장님을 위한</em>
                    <strong>우대신용대출</strong>
                </template>
                <template v-if="isDirect">
                    <em>롯데카드 없어도</em>
                    <strong>간편하게 신용대출</strong>
                </template>
            </div>
            <p v-if="isBiz || isDirect" class="info">
                한도조회는 신용평점에 영향을<br />
                주지 않습니다.
            </p>
        </Anchor>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MainModule } from '@stores/modules/main'

@Component
export default class Financial extends Vue {
    get financialData() {
        return MainModule.financialData
    }

    get link() {
        return this.financialData?.url || ''
    }

    /** 비즈론 or 장기카드론 */
    get isLoan() {
        return ['1', '2'].some(item => item === this.financialData?.findc)
    }

    /** 사업자 대출 */
    get isBiz() {
        return this.financialData?.findc === '3'
    }

    /** 즉시대출 */
    get isDirect() {
        return this.financialData?.findc === '4'
    }

    /** 케이스 별 css 클래스 */
    get klass() {
        const classes = {
            '1': 'loan',
            '2': 'loan',
            '3': 'exception',
            '4': 'instant',
            default: '',
        }
        return classes[this.financialData?.findc || 'default']
    }
}
</script>

<style scoped></style>

<template>
    <div class="sales-history-list">
        <h3>입금 내역</h3>
        <ul>
            <li>
                <span>카드매출</span>
                <em class="price"><strong>7,200,000</strong>원</em>
            </li>
            <li>
                <span>현금영수증</span>
                <em class="price"><strong>7,200,000</strong>원</em>
            </li>
            <li>
                <span>배달매출</span>
                <em class="price"><strong>7,200,000</strong>원</em>
            </li>
        </ul>
        <div class="btn-biznav-box">
            <Anchor><i>자세한 내역 보기</i></Anchor>
        </div>
        <button type="button" class="btn-sales-link">
            <strong>실제 매출과 다른가요?</strong>
            <i>추가연동하기</i>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class DepositHistory extends Vue {}
</script>

<style lang="scss" scoped src="./DepositHistory.scss"></style>

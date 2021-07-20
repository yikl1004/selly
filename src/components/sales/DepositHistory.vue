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
            <Anchor href="/">
                <i>자세한 내역 보기</i>
            </Anchor>
        </div>
        <button type="button" class="btn-sales-link" @click="openPopup">
            <strong>실제 매출과 다른가요?</strong>
            <i>추가연동하기</i>
        </button>

        <FullPopup
            :show.sync="show"
            title="실제 매출과 다른가요"
            :button-text="{ confirm: '연동관리' }"
            type="popup"
            @confirm="onConfirm"
            @cancel="onCancel"
        >
            <PopupSalesManagement />
        </FullPopup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        PopupSalesManagement: () => ({
            component: import('@components/sales/PopupSalesManagement.vue'),
        }),
    },
})
export default class DepositHistory extends Vue {
    // s: popup
    private show: boolean = false
    openPopup() {
        this.show = true
    }
    onConfirm() {
        this.show = false
    }

    onCancel() {
        console.log('after close modal')
    }
    // e: popup
}
</script>

<style lang="scss" scoped src="./DepositHistory.scss"></style>

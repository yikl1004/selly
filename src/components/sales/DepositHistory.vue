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
            <!-- <div class="popup-sales-management">
                <h3>사업장 매출의 정확한<br />집계가 필요하신가요?</h3>
                <p>
                    Selly에서 제공하는 매출/입금내역 서비스는 사업장에서 발생하는 매출 정보를 확인할 수 있는 기관을 통해 수집하여 제공하고
                    있습니다.
                </p>
                <p>
                    현재 <strong>국세청, 여신협</strong> 등의 기관에서 정보를 수집하고 있으며, 따라서 해당기관과 사업장의 연동 절차가 반드시
                    필요합니다.
                </p>
                <p>아래 연동관리 메뉴를 통해 혹시 빠진 연동기관이 있는지 다시 한번 확인해보세요!</p>
            </div> -->
            <PopupSalesMAnagement />
        </FullPopup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PopupSalesManagement from '@components/sales/PopupSalesManagement.vue'

@Component({
    components: {},
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

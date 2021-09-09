<template>
    <div class="sales-history-list">
        <h3>입금 내역</h3>
        <ul>
            <li v-if="list.card">
                <span>카드매출</span>
                <em class="price">
                    <strong>{{ list.card }}</strong>
                    원
                </em>
            </li>
            <li v-if="list.delivery">
                <span>배달매출</span>
                <em class="price">
                    <strong>{{ list.delivery }}</strong>
                    원
                </em>
            </li>
            <li v-if="list.cashReceipt">
                <span>현금영수증</span>
                <em class="price">
                    <strong>{{ list.cashReceipt }}</strong>
                    원
                </em>
            </li>
        </ul>
        <div class="btn-biznav-box">
            <Anchor external :href="biznavSalesLink">
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import type { LoginInfo } from '@stores/modules/auth'

@Component({
    components: {
        PopupSalesManagement: () => ({
            component: import('@components/sales/PopupSalesManagement.vue'),
        }),
    },
})
export default class DepositHistory extends Vue {
    /** 내역 (카드, 현금영수증, 배달) */
    @Prop({
        type: Object,
        default: () => ({ card: '0', delivery: '0' }),
        required: true,
    })
    readonly list!: {
        card: string
        cashReceipt?: string
        delivery: string
    }

    get biznavSalesLink(): string {
        return process.env.VUE_APP_SNP_DETAIL
    }

    // s: popup
    private show = false
    openPopup() {
        this.show = true
    }
    onConfirm() {
        // this.show = false
        const target = document.querySelector('#em_embed') as HTMLDivElement
        if (target) {
            target.style.display = 'block'
        }

        const auth = JSON.parse(
            localStorage.getItem('auth') || 'null',
        ) as LoginInfo

        this.$edkHost.openDataSync({
            orgSyncId: auth?.bzNavToken || '',
            eventListener(event) {
                console.log(event)
            },
        })
    }

    onCancel() {
        console.log('after close modal')
    }

    beforeDestroy() {
        const target = document.querySelector('#em_embed') as HTMLDivElement
        if (target) {
            target.style.display = 'none'
        }
    }
}
</script>

<style lang="scss" scoped src="./DepositHistory.scss"></style>

<template>
    <div class="sales-history-list">
        <h3>{{ parentType }} 내역</h3>
        <ul>
            <li v-if="list.card !== '0'">
                <span>카드{{ parentType }}</span>
                <em class="price">
                    <strong>{{ list.card }}</strong>
                    원
                </em>
            </li>
            <li v-if="list.delivery !== '0'">
                <span>배달{{ parentType }}</span>
                <em class="price">
                    <strong>{{ list.delivery }}</strong>
                    원
                </em>
            </li>
            <li v-if="list.cashReceipt && list.cashReceipt !== '0'">
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
import type { AuthState } from '@stores/modules/auth'

@Component({
    components: {
        PopupSalesManagement: () => ({
            component: import('@components/sales/PopupSalesManagement.vue'),
        }),
    },
})
export default class DepositHistory extends Vue {
    /** 매출 /입금  */
    @Prop({ type: String, default: '매출', required: false })
    readonly parentType!: string
    /** 내역 (카드, 현금영수증, 배달) */
    @Prop({
        type: Object,
        default: () => ({}),
        required: false,
    })
    readonly list!: {
        card?: string
        cashReceipt?: string
        delivery?: string
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
        ) as AuthState['loginInfo']

        this.$edkHost.openDataSync({
            orgSyncId: auth?.bzNavToken || '',
            eventListener: event => {
                if (event.action === 'close') {
                    ;(document.getElementById(
                        'em_embed',
                    ) as HTMLDivElement).style.display = 'none'
                }
                console.log('EVENT', event)
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

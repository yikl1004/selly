<template>
    <div class="container">
        <div class="content">
            <div class="loan-detail-wrap">
                <LoanInfo />

                <!--[D] 비즈론/장기카드 -->
                <div class="price-round-wrap">
                    <AccoReimbursement :list="reimbursementList" />
                    <BasicButton type="more"> 더보기 </BasicButton>
                </div>

                <!--[D] 사업자 대출 및 즉시대출_상환중케이스-->
                <div class="price-round-wrap">
                    <AccoReimbursement :list="reimbursementList" type="month" />
                    <BasicButton type="more"> 더보기 </BasicButton>
                </div>

                <div class="caution-info-box">
                    <BulletList
                        title="반드시 확인하세요."
                        :list="cautionList"
                    ></BulletList>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoanCard from '@components/finance/LoanCard.vue'
import AdditionalLoan from '@components/finance/AdditionalLoan.vue'
import LoanInfo from '@components/finance/LoanInfo.vue'
import AccoReimbursement from '@components/finance/AccoReimbursement.vue'

interface ListItem {
    date: string
    price: string
}

@Component({
    components: {
        LoanCard,
        AdditionalLoan,
        LoanInfo,
        AccoReimbursement,
    },
})
export default class LoanHistoryDetail extends Vue {
    private reimbursementList: ListItem[] = [
        {
            date: '21. 07. 05',
            price: '834,000원',
        },
        {
            date: '21. 07. 05',
            price: '834,000원',
        },
    ]

    private cautionList = [
        {
            text:
                '대출금 완납 후 최종 결제일로부터 15일이 경과되면 자동이체계좌가 자동 해지되며 청구방법이 창구수납으로 변경됩니다.',
        },
        {
            text:
                '대출신청 시점과 대출금수령 시점간의 차이 등으로 대출가능금액, 이자율 또는 대출가능 여부가 변동될 수 있습니다.',
        },
    ]
}
</script>
<style scoped lang="scss" src="./LoanHistoryDetail.scss" />

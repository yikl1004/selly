<template>
    <div class="container floating">
        <div class="content">
            <CautionBox type="complete" :title="`장기카드대출 Biz론 심사 완료되었습니다.`" :complete="true" />

            <InfoList :list="infoList" />

            <!--사업자 대출 완료일때 노출-->
            <BulletList :list="completeInfo" />
        </div>
        <portal to="floating">
            <BasicButton size="large">
                확인
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LoanApplyComplete extends Vue {
    private infoList = [
        {
            title: '신청금액',
            desc: '8,000만원',
        },
        {
            title: '신청금액',
            desc: '8,000만원',
        },
    ]
    private completeInfo = [
        {
            text: '금융사고 예방을 위하여 상담원을 통한 본인확인이 되지 않으면 대출이 제한될 수 있습니다.',
        },
        {
            text: '대출 이용에 따라 신용등급이 변경될 수 있습니다.',
        },
    ]
}
</script>

<style scoped lang="scss" src="./LoanApplyComplete.scss" />

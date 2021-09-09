<template>
    <Page floating :footer="false">
        <PageBody class="floating">
            <div class="content pd-btm">
                <CautionBox
                    type="caution"
                    :title="`고객님께서는 현재 이미 신청중인 대출이 있습니다.`"
                    link-info="아래 [대출내역 조회]를 통해 대출신청내역을 확인해 주시기 바랍니다."
                    :link="telLink"
                />
            </div>
            <portal to="floating">
                <BasicButton size="large"> 확인 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class LoanApplyFail extends Vue {
    private telLink = [
        {
            href: '대출내역 조회로 이동',
            text: '대출내역 조회',
        },
    ]
}
</script>

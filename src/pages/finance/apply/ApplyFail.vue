<template>
    <Page floating :footer="false">
        <PageBody class="floating">
            <div class="content pd-btm">
                <CautionBox
                    type="caution"
                    :title="`회원님의 정보가 롯데카드 심사기준에 부합되지 않아 대출신청이 부적격처리 되었습니다.`"
                    link-info="서비스 이용에 불편을 드려 대단히 죄송합니다. 자세한 내용은 고객센터로 문의해 주세요."
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
            href: '1588-8100',
            text: '1588-8100',
        },
    ]
}
</script>

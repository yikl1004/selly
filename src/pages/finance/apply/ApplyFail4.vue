<template>
    <Page floating :footer="false">
        <PageBody class="floating">
            <div class="content pd-btm">
                <CautionBox
                    type="caution"
                    :title="`고객님께서는 현재 가능한도 금액이 없습니다.`"
                    link-info="대출 상담시간 09:00 ~ 18:00 (영업일)"
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

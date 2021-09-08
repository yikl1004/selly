<template>
    <Page floating :footer="false">
        <PageBody class="floating">
            <div class="content pd-btm">
                <CautionBox
                    type="caution"
                    :title="`본인 인증에 실패하여 진행할 수 없습니다.`"
                    link-info="자세한 내용은 고객센터로 문의해 주세요."
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

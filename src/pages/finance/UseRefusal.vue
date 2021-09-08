<template>
    <Page floating :footer="false">
        <PageBody class="floating">
            <div class="content pd-btm">
                <CautionBox
                    type="complete"
                    :title="`장기카드대출 이용을 거절하셨습니다.`"
                    description="다시 이용을 원하시는 경우 장기카드대출 이용동의를 신청하세요."
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
export default class UseRefusal extends Vue {}
</script>

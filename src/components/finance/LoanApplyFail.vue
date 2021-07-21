<template>
    <div class="container floating">
        <div class="content pd-btm">
            <CautionBox
                type="caution"
                :title="`고객님께서는 현재 장기카드대출 Biz론 이용이 어려운 상황입니다.`"
                link-info="대출 상담시간 09:00 ~ 18:00 (영업일)"
                :link="telLink"
            />
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
export default class LoanApplyFail extends Vue {
    private telLink = [
        {
            href: '1588-8100',
            text: '1588-8100',
        },
    ]
}
</script>

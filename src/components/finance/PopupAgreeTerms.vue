<template>
    <div class="popup-inner">
        <AgreeStepBox />
        <div class="questionnaire-wrap">
            <Title title="보이스피싱 예방을 위한 사전 문진표" type="h3" />
            <RadioGroup
                name="questname01"
                :disabled="false"
                :list="quest01"
                label="혹시 지금 진행하는 대출이, 금융회사 직원이라며 전화나 문자를 받아 진행하고 계신가요?"
            />
            <RadioGroup
                name="questname02"
                :disabled="false"
                :list="quest02"
                label="대출을 받고 상환하면 신용등급이 올라 저금리로 대출이 가능하다고 하던가요?"
            />
            <RadioGroup
                name="questname03"
                :disabled="false"
                :list="quest03"
                label="수사기관을 사칭하여 계좌 등이 금융범죄에 연류되었다며 금전을 요구하였습니까?"
            />
            <RadioGroup
                name="questname04"
                :disabled="false"
                :list="quest04"
                label="가족 및 지인을 사칭하여 메신저로 카드정보 및 URL링크, 앱 설치를 요구하였나요?"
            />
            <p>
                위 질문들을 통해 보이스피싱 피해가 조금이라도 우려된다면
                금융감독원 콜센터 1332 또는 경찰청 112로 문의하시거나,
                보이스피싱 지킴이 홈페이지로 신고해 주시기 바랍니다.
                <br /><br />

                보이스피싱 방지 목적으로 KCB를 통해 개인신용 정보조회를 하고
                있으며, 개인 신용평점에는 영향이 없습니다.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AgreeStepBox from '@components/finance/AgreeStepBox.vue'
import type { RadioProps } from '@components/form/Radio.vue'

@Component({
    components: {
        AgreeStepBox,
    },
})
export default class PopupAgreePhone extends Vue {
    private quest01: RadioProps[] = [
        { value: 'y', label: '예', checked: false },
        { value: 'n', label: '아니요', checked: true },
    ]
    private quest02: RadioProps[] = [
        { value: 'y', label: '예', checked: false },
        { value: 'n', label: '아니요', checked: true },
    ]
    private quest03: RadioProps[] = [
        { value: 'y', label: '예', checked: false },
        { value: 'n', label: '아니요', checked: true },
    ]
    private quest04: RadioProps[] = [
        { value: 'y', label: '예', checked: false },
        { value: 'n', label: '아니요', checked: true },
    ]
}
</script>
<style scoped lang="scss">
.box-title {
    margin-top: 0;
}
.questionnaire-wrap {
    p {
        margin-top: 60px;
    }
}
</style>

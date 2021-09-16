<template>
    <div>
        <CautionBox
            type="caution"
            title="롯데카드 가맹점 또는 제휴사 가맹점 정보 확인이 어렵습니다."
            description="셀리서비스는 현재 롯데카드 가맹점 또는 제휴 결제대행사를 이용하고 있는 개인사업자 대상으로 가입할 수 있습니다."
        />
        <Portal to="floating">
            <BasicButton type="large" @click="toFirstStep"> 확인 </BasicButton>
        </Portal>
    </div>
</template>

<script lang="ts">
import { Path } from '@router/routes'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UnableJoinPage extends Vue {
    /** @category Methods */

    toFirstStep() {
        this.$router.push({
            ...Path.Main,
            params: { step: '1' },
        })
    }
}
</script>

<style scoped></style>

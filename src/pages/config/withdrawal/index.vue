<template>
    <Page floating>
        <PageBody class="floating">
            <div class="content">
                <div class="secession-wrap">
                    <h2>
                        Selly 회원 탈퇴를 위해서<br />아래 내용을 확인해주세요.
                    </h2>
                    <BulletList
                        v-if="!!cancelGuideList.length"
                        :list="cancelGuideList"
                    />
                </div>
                <portal to="floating">
                    <BasicButton size="large" @click="onWithdrawal">
                        내용 확인 후 탈퇴
                    </BasicButton>
                </portal>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { AuthModule } from '@stores/modules/auth'
import { Component, Vue } from 'vue-property-decorator'

/**
 * @description
 * 회원탈퇴 전 확인이 필요한 경우 노출되는 컴포넌트
 */
@Component
export default class WithdrawalPage extends Vue {
    get cancelGuideList() {
        return AuthModule.cancelGuideListData
    }

    async handelWithdrawal() {
        await AuthModule.setWithdrawal()
        this.$router.push({ name: 'Main' })
    }

    onWithdrawal() {
        this.$modal.open({
            message: 'selly 회원을 탈퇴하시겠습니까?',
            buttonText: { confirm: '예', cancel: '아니요' },
            confirm: this.handelWithdrawal,
        })
    }

    /** @Lifecycle */

    async beforeMount() {
        await AuthModule.beforeWithdrawal()
    }
}
</script>

<style scoped lang="scss" src="./WithdrawalPage.scss"></style>

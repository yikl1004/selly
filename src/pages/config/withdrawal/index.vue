<template>
    <Page floating>
        <PageBody class="floating">
            <div class="content">
                <div class="secession-wrap">
                    <h2>Selly 회원 탈퇴를 위해서<br />아래 내용을 확인해주세요.</h2>
                    <BulletList v-if="!!cacelGuideList.length" :list="cacelGuideList" />
                </div>
                <portal to="floating">
                    <BasicButton size="large" @click="onWithdrawal"> 내용 확인 후 탈퇴 </BasicButton>
                </portal>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const { Action, State } = namespace('auth')

/**
 * @description
 * 회원탈퇴 전 확인이 필요한 경우 노출되는 컴포넌트
 */
@Component
export default class WithdrawalPage extends Vue {
    /** @Stores */
    @Action('setWithdrawal') readonly setWithdrawal!: () => Promise<void>
    @Action('beforeWithdrawal') readonly beforeWithdrawal!: () => Promise<void>
    @State('cacelGuideList') readonly cacelGuideList!: Array<{ text: string }>

    /** @Data */

    /** @Methods */

    async handelWithdrawal() {
        await this.setWithdrawal()
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
        await this.beforeWithdrawal()
    }
}
</script>

<style scoped lang="scss" src="./WithdrawalPage.scss"></style>

<template>
    <div class="container floating">
        <div class="content">
            <div class="secession-wrap">
                <h2>Selly 회원 탈퇴를 위해서<br />아래 내용을 확인해주세요.</h2>
                <BulletList
                    v-if="!!secessionInfo.length"
                    :list="secessionInfo"
                />
            </div>
        </div>

        <portal to="floating">
            <BasicButton size="large" @click="onWithdrawal">
                내용 확인 후 탈퇴
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import store from '@stores/index'
import type { NavigationGuard } from 'vue-router'

const { Action } = namespace('auth')
const { Mutation: UiMutation } = namespace('ui')

const beforeRouteEnter: NavigationGuard = (to, from, next) => {
    if (store.state.auth.memberInfo === null) {
        store.dispatch('auth/getMemberInfo')
    }
    next()
}

@Component({
    beforeRouteEnter,
})
export default class WithdrawalPage extends Vue {
    /** @Stores */
    @Action('setWithdrawal') readonly setWithdrawal!: () => Promise<void>
    @UiMutation('setLoading') readonly setLoading!: (loading: boolean) => void

    /** @Data */
    private secessionInfo = [
        {
            // 1차
            text:
                '진행중인 마케팅 있을 시 종료된 마케팅 대해서는 청구금액이 발생됩니다.',
        },
        {
            // 2차
            text:
                '보유한 대출상품이 있을 시 롯데카드에서 내용을 확인 가능합니다.',
        },
        {
            // 3차
            text:
                '장기카드 Biz론 대출상품 상환방식이 가맹점 대금상환(일)에서 청구서 상환(월)로 자동 변경됩니다.',
        },
        {
            // 1차
            text:
                '회원탈퇴 시 유통쇼핑데이터를 통한 콘텐츠 구매내역이 있을 경우 유통쇼핑데이터에서 확인이 불가합니다.',
        },
    ]

    /** @Methods */

    async handelWithdrawal() {
        this.setLoading(true)
        await this.setWithdrawal()
        this.setLoading(false)
        window.location.href = '/'
    }

    onWithdrawal() {
        this.$modal.open({
            message: 'selly 회원을 탈퇴하시겠습니까?',
            buttonText: { confirm: '예', cancel: '아니요' },
            confirm: this.handelWithdrawal,
        })
    }
}
</script>

<style scoped lang="scss" src="./WithdrawalPage.scss"></style>

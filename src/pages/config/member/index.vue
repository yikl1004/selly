<template>
    <div class="container">
        <div class="content">
            <div class="setting-wrap">
                <div class="setting-box">
                    <h2>회원정보</h2>
                    <ul>
                        <li>
                            <em class="setting-name">이름</em>
                            <strong class="setting-cont">{{
                                memberViewInfo.mbrNm
                            }}</strong>
                        </li>

                        <li>
                            <em class="setting-name">이메일</em>
                            <strong class="setting-cont">
                                {{ memberViewInfo.kkoId }}
                            </strong>
                        </li>

                        <li>
                            <em class="setting-name">휴대폰관리</em>
                            <strong class="setting-cont">
                                {{ memberViewInfo.cellNo }}
                            </strong>
                        </li>
                    </ul>
                </div>
                <!-- <div class="setting-box">
                    <h2>혜택알림 동의</h2>
                    <ul>
                        <li>
                            <em class="setting-name">SMS</em>
                            <strong class="setting-cont">
                                <SwitchButton
                                    label="선택하세요"
                                    :default-value="isSMS"
                                    @change="onChangeSMS"
                                />
                            </strong>
                        </li>

                        <li>
                            <em class="setting-name">친구톡</em>
                            <strong class="setting-cont">
                                <SwitchButton
                                    label="선택하세요"
                                    :default-value="isKakaoFriend"
                                    @change="onChangeKakaoFriend"
                                />
                            </strong>
                        </li>
                    </ul>
                </div> -->
            </div>
            <div class="btn-area">
                <BasicButton type="textGray" @click="toWithdrawal">
                    회원탈퇴
                </BasicButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import type { MemberInfo } from '@stores/modules/auth'
import type { AuthParameters } from '@services/auth'

const { Action, Getter } = namespace('auth')
const { Mutation: UiMutation } = namespace('auth')

@Component
export default class MemberPage extends Vue {
    /** @Data */

    private marketingSMS = false
    private marketingKakaoFriend = false

    /** @Stores */
    @Getter('memberViewInfo') readonly memberViewInfo!: MemberInfo['data']
    @Getter('cancelGuideParams') readonly cancelGuideParams!: Pick<
        MemberInfo['data'],
        'datusYn' | 'mrktYn' | 'bizLoanYn' | 'loanYn'
    >
    @Action('getMemberInfo') readonly getMemberInfo!: () => Promise<void>
    @Action('setMarketingUpdate') readonly setMarketingUpdate!: (
        params: AuthParameters['marketingUpdate'],
    ) => Promise<void>
    @Action('setWithdrawal') readonly setWithdrawal!: () => Promise<void>
    @UiMutation('setLoading') readonly setLoading!: (loading: boolean) => void

    /** @Computed */

    // get isSMS(): boolean {
    //     return this.memberViewInfo.mrktSmsAgYn === 'Y'
    // }

    // get isKakaoFriend(): boolean {
    //     return this.memberViewInfo.mrktKkofrndAgYn === 'Y'
    // }

    /** @Methods */
    // async onChangeSMS(value: boolean) {
    //     await this.setMarketingUpdate({
    //         mrktSmsAgYn: value ? 'Y' : 'N',
    //         mrktKkofrndAgYn: this.marketingKakaoFriend ? 'Y' : 'N',
    //     })
    //     this.marketingSMS = value
    // }

    // onChangeKakaoFriend(value: boolean) {
    //     this.setMarketingUpdate({
    //         mrktKkofrndAgYn: value ? 'Y' : 'N',
    //         mrktSmsAgYn: this.marketingSMS ? 'Y' : 'N',
    //     })
    //     this.marketingKakaoFriend = value
    // }

    async handleWithdrawal() {
        this.setLoading(true)
        await this.setWithdrawal()
        this.setLoading(false)
        window.location.href = '/'
    }

    toWithdrawal() {
        const condition = Object.values(this.cancelGuideParams).some(
            item => item === 'Y',
        )
        if (condition) {
            this.$router.push({ name: 'Withdrawal' })
        } else {
            this.$modal.open({
                message: 'Selly 회원을 탈퇴하시겠습니까?',
                buttonText: {
                    confirm: '예',
                    cancel: '아니요',
                },
                confirm: this.handleWithdrawal,
            })
        }
    }

    /** @Lifecycle */

    async mounted() {
        await this.getMemberInfo()
    }
}
</script>

<style scoped lang="scss" src="./MemberPage.scss"></style>

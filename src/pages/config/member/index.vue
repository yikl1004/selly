<template>
    <Page>
        <Header type="sub" title="회원정보" />
        <PageBody>
            <div class="content">
                <div class="setting-wrap">
                    <div class="setting-box">
                        <h2>회원정보</h2>
                        <ul>
                            <li v-for="(info, index) in memberInfo" :key="`member-infor-list=${index}`">
                                <em class="setting-name">{{ info.name }}</em>
                                <strong class="setting-cont">
                                    {{ info.value }}
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
                    <BasicButton type="textGray" @click="toWithdrawal"> 회원탈퇴 </BasicButton>
                </div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import PageView from '@utils/mixins/PageView'
import type { MemberInfo } from '@stores/modules/auth'
import type { AuthParameters } from '@services/auth'

const { Action, Getter } = namespace('auth')
const { Mutation: UiMutation } = namespace('auth')

@Component
export default class MemberPage extends Mixins(PageView) {
    /** @Data */

    private memberInfo: { name: string; value: string }[] = []
    // private marketingSMS: boolean = false
    // private marketingKakaoFriend: boolean = false

    /** @Stores */
    @Getter('memberViewInfo') readonly memberViewInfo!: MemberInfo['data']
    @Getter('cancelGuideParams') readonly cancelGuideParams!: Pick<MemberInfo['data'], 'datusYn' | 'mrktYn' | 'bizLoanYn' | 'loanYn'>
    @Action('getMemberInfo') readonly getMemberInfo!: () => Promise<void>
    @Action('setMarketingUpdate') readonly setMarketingUpdate!: (params: AuthParameters['marketingUpdate']) => Promise<void>
    @Action('setWithdrawal') readonly setWithdrawal!: () => Promise<void>
    @UiMutation('setLoading') readonly setLoading!: (loading: boolean) => void

    /** @Computed */

    // get isSMS(): boolean {
    //     return this.memberViewInfo.mrktSmsAgYn === 'Y'
    // }

    // get isKakaoFriend(): boolean {
    //     return this.memberViewInfo.mrktKkofrndAgYn === 'Y'
    // }

    get beforeCheck(): boolean {
        return Object.values(this.cancelGuideParams).some(item => item === 'Y')
    }

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
        this.$router.push({ name: 'Main' })
    }

    toWithdrawal() {
        if (this.beforeCheck) {
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

        this.memberInfo = [
            { name: '이름', value: this.memberViewInfo.mbrNm },
            { name: '이메일', value: this.memberViewInfo.kkoId },
            { name: '휴대폰관리', value: this.memberViewInfo.cellNo },
        ]
    }
}
</script>

<style scoped lang="scss" src="./MemberPage.scss"></style>

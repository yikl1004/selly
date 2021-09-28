<template>
    <Page>
        <Header type="sub" title="회원정보" />
        <PageBody>
            <div class="content">
                <div class="setting-wrap">
                    <div class="setting-box">
                        <h2>회원정보</h2>
                        <ul>
                            <li
                                v-for="(info, index) in memberInfo"
                                :key="`member-infor-list=${index}`"
                            >
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
                    <BasicButton type="textGray" @click="toWithdrawal">
                        회원탈퇴
                    </BasicButton>
                </div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { AuthModule } from '@stores/modules/auth'
import { Path } from '@router/routes'

@Component
export default class MemberPage extends Mixins(PageView) {
    private memberInfo: { name: string; value: string }[] = []
    // private marketingSMS: boolean = false
    // private marketingKakaoFriend: boolean = false

    /** @Stores */
    get memberViewInfo() {
        return AuthModule.memberViewInfo
    }

    get cancelGuideParams() {
        return AuthModule.cancelGuideParams
    }

    /** @Computed */

    // get isSMS(): boolean {
    //     return this.memberViewInfo.mrktSmsAgYn === 'Y'
    // }

    // get isKakaoFriend(): boolean {
    //     return this.memberViewInfo.mrktKkofrndAgYn === 'Y'
    // }

    get beforeCheck(): boolean {
        if (this.cancelGuideParams) {
            return Object.values(this.cancelGuideParams).some(
                item => item === 'Y',
            )
        } else {
            return false
        }
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
        await AuthModule.setWithdrawal()
        this.$router.push(Path.Login)
    }

    toWithdrawal() {
        if (this.beforeCheck) {
            this.$router.push(Path.Withdrawal)
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
        await AuthModule.getMemberInfo()

        if (this.memberViewInfo) {
            this.memberInfo = [
                { name: '이름', value: this.memberViewInfo.mbrNm },
                { name: '이메일', value: this.memberViewInfo.kkoId },
                { name: '휴대폰관리', value: this.memberViewInfo.cellNo },
            ]
        }
    }
}
</script>

<style scoped lang="scss" src="./MemberPage.scss"></style>

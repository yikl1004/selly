<template>
    <Page floating :footer="false">
        <Header v-if="step === 1" type="title" title="사업자 정보" />
        <PageBody class="floating">
            <SelectStore
                v-if="step === 1"
                :workplace-list="workplaceList"
                @next="onNext"
            />
            <UnableJoin v-else-if="step === -1" />
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@stores/modules/auth'
import SelectStore from '@pages/auth/SelectStore.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'
import type { BizInfoItem } from '@services/auth'

@Component({
    components: {
        SelectStore,
        UnableJoin,
    },
})
export default class JoinPage extends Vue {
    /** @Data */

    // 현재 단계(1: 사업자정보, 2: 가입완료, 0: 가입불가)
    private step = 1

    get workplaceList() {
        return AuthModule.workplaceList
    }

    get loginInfo() {
        return AuthModule.loginInfoData
    }

    get biznavToken() {
        return AuthModule.biznavToken
    }

    /** @Methods */

    async onNext(list: BizInfoItem[]) {
        await AuthModule.getBizInfoInput({ list })
        this.onComplete()
    }

    onComplete() {
        const loginResult = this.loginInfo?.rspDc
        const defaultMethod = ({
            bznavSyncToken,
        }: {
            dom?: Element | undefined
            bznavSyncToken: string
        }) =>
            console.warn(
                `biznavToken: ${bznavSyncToken},`,
                '비즈넵 로그인, 또는 가입 절차를 진행 할수 없습니다.',
            )
        const methods = {
            // 비즈넵 회원가입
            '01': this.$edkHost.syncBznav,
            // 비즈넵 로그인
            '02': this.$edkHost.syncBznav,
            // 그 외 예외 처리
            '03': defaultMethod,
            default: defaultMethod,
        }

        methods[loginResult || 'default']({ bznavSyncToken: this.biznavToken })
        this.$router.push({ name: 'Main' })
    }

    /** @Lifecycle */

    created() {
        const step = this._.toNumber(this.$route.params.step)
        this.step = step

        if (step === 1) {
            AuthModule.getMemberWorkplaceInfo()
        }
    }

    mounted() {
        if (Number.isNaN(this.step)) {
            this.$router.push({ name: 'Main' })
        }

        this.$toast.error('추천인 코드 확정 안됨')
    }

    beforeDestroy() {
        this.$toast.clear()
    }
}
</script>

<style scoped></style>

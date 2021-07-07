<template>
    <SelectStore v-if="step === 1" @next="onNext" />
    <CompleteJoin v-else-if="step === 2" @complete="onComplete" />
    <UnableJoin v-else-if="step === -1" />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SelectStore from '@pages/auth/SelectStore.vue'
import CompleteJoin from '@pages/auth/CompleteJoin.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'
import { RegisterHook } from '@utils/decorators'
import { namespace } from 'vuex-class'
import { AuthParameters, BizInfoItem } from '@services/auth'

const { Action, State } = namespace('auth')

@Component({
    components: {
        SelectStore,
        CompleteJoin,
        UnableJoin,
    },
})
export default class JoinPage extends Vue {
    /**
     * @category Data
     */

    // 현재 단계(1: 사업자정보, 2: 가입완료, 0: 가입불가)
    private step: number = 1

    /** @category Stores */

    // 사업장 정보
    @Action('getMemberWorkplaceInfo')
    readonly getMemberWorkplaceInfo!: Function

    // 최초로그인시 사업자정보 입력 요청
    @Action('getBizInfoInput')
    readonly getBizInfoInput!: (params: AuthParameters['bizInfo']) => Promise<void>

    @State('bizInfo') readonly bizInfo!: BizInfo

    /** @category Watch */

    // 사업자정보가 변경 되면
    @Watch('bizInfo')
    changeBizInfo(value: BizInfo, oldValue: BizInfo) {
        if (value!.rc === '0000') {
            this.step = 2
        }
    }

    /** @category Methods */

    async onNext(list: BizInfoItem[]) {
        await this.getBizInfoInput({ list })
    }

    onComplete() {
        this.$router.push({ name: 'Login' })
    }

    /** @category Life-Cycle */

    created() {
        const step = this._.toNumber(this.$route.params.step)
        this.step = step

        if (step === 1) {
            this.getMemberWorkplaceInfo()
        }
    }

    mounted() {
        if (Number.isNaN(this.step)) {
            this.$router.push({ name: 'Login' })
        }

        this.$toast.error('추천인 코드 확정 안됨')
    }

    @RegisterHook
    beforeRouteEnter(to: any, from: any, next: Function) {
        next()
    }
}
</script>

<style scoped></style>

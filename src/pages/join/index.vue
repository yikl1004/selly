<template>
    <SelectStore v-if="step === 1" @next="onNext" />
    <UnableJoin v-else-if="step === -1" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectStore from '@pages/auth/SelectStore.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'
import { namespace } from 'vuex-class'
import type { AuthParameters, BizInfoItem } from '@services/auth'
import type { BizInfo } from '@stores/modules/auth'

const { Action, State } = namespace('auth')

@Component({
    components: {
        SelectStore,
        UnableJoin,
    },
    beforeRouteEnter(to, from, next) {
        next()
    },
})
export default class JoinPage extends Vue {
    /**
     * @category Data
     */

    // 현재 단계(1: 사업자정보, 2: 가입완료, 0: 가입불가)
    private step = 1

    /** @category Stores */

    // 사업장 정보
    @Action('getMemberWorkplaceInfo')
    readonly getMemberWorkplaceInfo!: Function

    // 최초로그인시 사업자정보 입력 요청
    @Action('getBizInfoInput')
    readonly getBizInfoInput!: (
        params: AuthParameters['bizInfo'],
    ) => Promise<void>

    @State('bizInfo') readonly bizInfo!: BizInfo

    /** @category Watch */

    /** @category Methods */

    async onNext(list: BizInfoItem[]) {
        await this.getBizInfoInput({ list })
    }

    onComplete() {
        this.$router.push({ name: 'Main' })
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

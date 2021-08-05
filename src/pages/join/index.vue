<template>
    <Page :floating="step === 1">
        <Header type="title" title="사업자 정보" />
        <PageBody :class="{ floating: step === 1 }">
            <SelectStore v-if="step === 1" :workplace-list="workplaceList" @next="onNext" />
            <UnableJoin v-else-if="step === -1" />
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectStore from '@pages/auth/SelectStore.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'
import { namespace } from 'vuex-class'
import type { AuthParameters, BizInfoItem, BusinessPlaceListItem } from '@services/auth'

const { Action, Getter } = namespace('auth')

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

    /** @Stores */

    // 사업장 정보
    @Action('getMemberWorkplaceInfo')
    readonly getMemberWorkplaceInfo!: Function

    // 최초로그인시 사업자정보 입력 요청
    @Action('getBizInfoInput')
    readonly getBizInfoInput!: (params: AuthParameters['bizInfo']) => Promise<void>

    @Getter('workplaceList') workplaceList!: BusinessPlaceListItem[]

    /** @Methods */

    async onNext(list: BizInfoItem[]) {
        await this.getBizInfoInput({ list })
        this.onComplete()
    }

    onComplete() {
        this.$router.push({ name: 'Main' })
    }

    /** @Lifecycle */

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

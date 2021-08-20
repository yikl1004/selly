<template>
    <Page :floating="step === 1">
        <Header type="title" title="사업자 정보" />
        <PageBody :class="{ floating: step === 1 }">
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
import SelectStore from '@pages/auth/SelectStore.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'
import { AuthModule } from '@stores/modules/auth'
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

    /** @Methods */

    async onNext(list: BizInfoItem[]) {
        await AuthModule.getBizInfoInput({ list })
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

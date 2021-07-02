<template>
    <SelectStore v-if="step === 1" @next="onNext" />
    <CompleteJoin v-else-if="step === 2" @complete="onComplete" />
    <UnableJoin v-else-if="step === -1" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectStore from '@pages/auth/SelectStore.vue'
import CompleteJoin from '@pages/auth/CompleteJoin.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'
import { ResgisterHook } from '@utils/decorators'
import { namespace } from 'vuex-class'

const AuthModule = namespace('auth')

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
    @AuthModule.Action('getMemberWorkplaceInfo')
    readonly getMemberWorkplaceInfo!: Function

    /** @category Methods */

    onNext() {
        this.step = 2
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
    }

    @ResgisterHook
    beforeRouteEnter(to: any, from: any, next: Function) {
        next()
    }
}
</script>

<style scoped></style>

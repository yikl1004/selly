<template>
    <SelectStore v-if="step === 1" :on-next="onNext" />
    <CompleteJoin v-else-if="step === 2" :on-complete="onComplete" />
    <UnableJoin v-else-if="step === -1" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SelectStore from '@pages/auth/SelectStore.vue'
import CompleteJoin from '@pages/auth/CompleteJoin.vue'
import UnableJoin from '@pages/auth/UnableJoin.vue'

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

    onNext() {
        this.step = 2
    }

    onComplete() {
        this.$router.push({ name: 'Login' })
    }

    created() {
        this.step = this._.toNumber(this.$route.params.step)
    }

    mounted() {
        if (Number.isNaN(this.step)) {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style scoped></style>

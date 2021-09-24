<template>
    <div class="popup-inner">
        <div class="popup-terms">{{ policyDetailDirectData.content }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BoardModule } from '@stores/modules/board'

@Component
export default class PopupTerms extends Vue {
    /** 내용 */
    @Prop({
        type: Object,
        required: true,
        validator: value => 'comGrpC' in value && 'comC' in value,
    })
    readonly params!: {
        comGrpC: string
        comC: string
    }

    /** 직접 호출 상세 데이터 */
    get policyDetailDirectData() {
        return BoardModule.policyDetailDirectData
    }

    async mounted() {
        if (this.params) {
            await BoardModule.getPolicyDetailDirect({
                ...this.params,
            })
        }
    }

    beforeDestroy() {
        BoardModule.initializePolicy()
    }
}
</script>

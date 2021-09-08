<template>
    <Page floating :footer="false">
        <Header type="proccess" title="LOCA MONEY Biz론" />
        <PageBody class="floating">
            <div class="content">
                <CardAuth />
            </div>
            <portal to="floating">
                <BasicButton size="large" @click="onClick"> 다음 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CardAuth from '@components/finance/CardAuth.vue'

@Component({
    components: { CardAuth },
})
export default class CreditCardAuth extends Vue {
    /**
     * @category Data
     */

    @Prop({ type: Function, default: () => ({}), required: true })
    readonly onClick!: Function
}
</script>

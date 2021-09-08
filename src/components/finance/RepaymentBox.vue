<template>
    <div class="repayment-box">
        <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
            <template slot-scope="{}">
                <CalendarField
                    id="calendar"
                    label="상환일자"
                    :hidden-label="false"
                    :default-value="null"
                    :readonly="false"
                    name="date"
                />
                <TextField
                    v-if="type !== 'all'"
                    id="my-text"
                    type="text"
                    label="상환금액"
                    :hidden-label="null"
                    :maxlength="9999"
                    placeholder="금액 입력"
                    :readonly="false"
                    :disabled="false"
                    unit="만원"
                    :validate="null"
                    error-message="상환금액을 정확하게 입력 해주세요."
                    :default-value="null"
                />
            </template>
        </FormProvider>
        <BtnGroup>
            <BasicButton size="medium"> 초기화 </BasicButton>
            <BasicButton size="medium"> 계산 </BasicButton>
        </BtnGroup>

        <PredictionPriceBox type="repayment" />

        <BulletList :list="repaymentInfo" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PredictionPriceBox from '@components/finance/PredictionPriceBox.vue'
import type { Schema } from '@components/form/FormProvider.vue'

// interface Data {
//     calendarField: string
//     textFieldPrimary: string
// }

@Component({
    components: { PredictionPriceBox },
})
export default class RepaymentBox extends Vue {
    private data: { [key: string]: object | number | string | boolean } = {
        calendarField: new Date('2021.06.04'),
        textfieldPrimary: '테스트',
    }

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }

    private repaymentInfo = [
        {
            text:
                '중도상환은 조회만 가능하며, 신청을 원하는 고객님께서는 고객센터 (<a href="tel:1588-8100" class="tel">1588-8100</a>) 으로 연락해 주시기 바랍니다.',
        },
    ]

    @Prop({ type: String })
    readonly type!: string
}
</script>

<style lang="scss" scoped src="./RepaymentBox.scss"></style>

<template>
    <div class="popup-inner">
        <div class="popup-prediction-laon">
            <FormProvider
                :schema="data"
                @change="formChange"
                @submit="onSubmit"
            >
                <template slot-scope="{}">
                    <TextField
                        id="text-form01"
                        type="text"
                        label="매출대금"
                        :hidden-label="null"
                        :maxlength="9999"
                        placeholder="예상 3개월 실적 입력"
                        :readonly="false"
                        :disabled="false"
                        unit="만원"
                        :validate="null"
                        :default-value="null"
                    />
                    <BulletList :list="priceInfo" />

                    <TextField
                        id="text-form02"
                        type="text"
                        label="대금상환율 조정"
                        :hidden-label="null"
                        :maxlength="9999"
                        placeholder="상환율 입력"
                        :readonly="false"
                        :disabled="false"
                        unit="%"
                        :validate="null"
                        error-message="대금상환율을 정확하게 입력 해주세요."
                        :default-value="null"
                    />
                    <BtnGroup>
                        <BasicButton size="medium"> 계산 </BasicButton>
                    </BtnGroup>
                </template>
            </FormProvider>

            <PredictionPriceBox price-name="예상 상환금액" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PredictionPriceBox from '@components/finance/PredictionPriceBox.vue'
import type { Schema } from '@components/form/FormProvider.vue'

@Component({
    components: { PredictionPriceBox },
})
export default class PopupPredictionLoan extends Vue {
    private priceInfo = [
        { text: '롯데카드 매출대금 3개월 평균 실적으로 계산됩니다.' },
    ]

    private data: { [key: string]: object | number | string | boolean } = {
        dropdownBox: 'kt',
        buttonField: '확인',
        calendarField: new Date('2021.06.04'),
        checkSingle: true,
        secretNumber: '1234561',
        singleSelection: 'third',
        switchButton: true,
        textfieldPrimary: '테스트',
    }

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }
}
</script>

<style lang="scss" scoped src="./PopupPredictionLoan.scss"></style>

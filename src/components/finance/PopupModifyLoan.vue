<template>
    <div class="popup-modify-loan">
        <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
            <template slot-scope="{ schema }">
                <DropdownBox
                    id="dropdown-box01"
                    label="상환방법"
                    :hidden-label="false"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                    :disabled="false"
                    error-message="에러메시지가 필요할까"
                    success-message="없어도 될듯"
                />
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
                <BulletList :list="repaymentInfo" />
                <BasicButton size="medium" class="btn-calculation">
                    계산
                </BasicButton>
            </template>
        </FormProvider>

        <PredictionPriceBox />

        <CheckBox
            id="my-radio"
            type="normal"
            label="상환금액은 매출대금에서 차감됩니다. "
            :disabled="false"
            :required="false"
            :checked="false"
            :index="null"
            text="내용을 충분히 이해하며 이에 동의합니다."
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PredictionPriceBox from '@components/finance/PredictionPriceBox.vue'

interface Data {
    buttonField: string
    calendarField: string
    checkSingle: boolean
    secretNumber: string
    singleSelection: string
    switchButton: boolean
    textFieldPrimary: string
}
@Component({
    components: { PredictionPriceBox },
})
export default class PopupModifyLoan extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: '가맹점대금 상환(일)', value: 'a', selected: true },
        { displayName: '청구서 상환(월)', value: 'b' },
    ]

    private priceInfo = [{ text: '롯데카드 매출대금 3개월 평균 실적으로 계산됩니다.' }]
    private repaymentInfo = [{ text: '상환율 정보 변경 09:00 ~ 18:00 1일 1회만 변경 가능하며, 변경 시 실시간 알림톡으로 알림을 드립니다.' }]

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

    formChange(data: any) {
        this.data = data
    }

    onSubmit(data: any) {
        console.log(data)
    }
}
</script>

<style lang="scss" scoped src="./PopupModifyLoan.scss"></style>

<template>
    <div class="popup-repayment-schedule">
        <!--[D] 장기카드biz론 / 장기카드론-->
        <PriceBox title="이용가능 금액" price="1,000,000" date="21. 05. 25 14:05 기준" />
        <p class="txt-interest-rate">
            연 이자율
            <strong>4.95%</strong>
        </p>
        <!--//[D] 장기카드biz론 / 장기카드론-->

        <!--[D] 할부금융(사업자/즉시)-->
        <PriceBox date="21. 05. 25 14:05 기준" />
        <!--//[D] 할부금융(사업자/즉시)-->

        <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
            <template slot-scope="{ schema }">
                <TextField
                    id="text-form01"
                    type="text"
                    label="신청금액"
                    :hidden-label="null"
                    :maxlength="9999"
                    placeholder="금액 입력"
                    :readonly="false"
                    :disabled="false"
                    unit="만원"
                    :validate="null"
                    :default-value="null"
                    error-message="신청금액을 정확하게 입력해 주세요."
                />

                <!--[D] 신청금액 5천만원 이상 입력되었을시 노출 -->
                <BulletList :list="priceInfo" />

                <CalendarField
                    id="calendar01"
                    label="이용예정일"
                    :hidden-label="false"
                    :default-value="null"
                    :readonly="false"
                    name="date"
                />

                <!--장기카드론-->
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

                <DropdownBox
                    id="dropdown-box02"
                    label="거치기간"
                    :hidden-label="false"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                    :disabled="false"
                    error-message="에러메시지가 필요할까"
                    success-message="없어도 될듯"
                />

                <DropdownBox
                    id="dropdown-box03"
                    label="분할상환개월"
                    :hidden-label="false"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                    :disabled="false"
                    error-message="에러메시지가 필요할까"
                    success-message="없어도 될듯"
                />
                <!--//장기카드론-->

                <DropdownBox
                    id="dropdown-box04"
                    label="대출기간"
                    :hidden-label="false"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                    :disabled="false"
                    error-message="에러메시지가 필요할까"
                    success-message="없어도 될듯"
                />

                <!--할부금융-->
                <TextField
                    id="text-form02"
                    type="text"
                    label="적용이자율(연)"
                    :hidden-label="null"
                    :maxlength="9999"
                    placeholder="이자율 입력"
                    :readonly="false"
                    :disabled="false"
                    unit="%"
                    :validate="null"
                    :default-value="null"
                />

                <CalendarField id="calendar02" label="대출일" :hidden-label="false" :default-value="null" :readonly="false" name="date" />

                <CalendarField
                    id="calendar03"
                    label="최초상환일"
                    :hidden-label="false"
                    :default-value="null"
                    :readonly="false"
                    name="date"
                />
                <!--//할부금융-->
            </template>
        </FormProvider>

        <BtnGroup>
            <BasicButton size="medium">
                초기화
            </BasicButton>

            <BasicButton size="medium">
                계산
            </BasicButton>
        </BtnGroup>
        <PredictionPriceBox price-name="총 대출원금" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PriceBox from '@components/finance/PriceBox.vue'
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
    components: { PriceBox, PredictionPriceBox },
})
export default class PopupRepaySchedule extends Vue {
    private priceInfo = [{ text: '5천만원 초과금액 이용 시 인지세(255,000원) 제외 후 입금됩니다.' }]

    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: '가맹점대금 상환(일)', value: 'a', selected: true },
        { displayName: '청구서 상환(월)', value: 'b' },
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

    formChange(data: any) {
        this.data = data
    }

    onSubmit(data: any) {
        console.log(data)
    }
}
</script>

<style lang="scss" scoped src="./PopupRepaySchedule.scss"></style>

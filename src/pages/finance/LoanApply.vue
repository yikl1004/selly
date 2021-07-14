<template>
    <div class="container no-padding">
        <div class="">
            <h2>회원확인사항</h2>
            <p>장기카드대출 Biz론 신청 적합성 확인과<br />상품설명서를 확인 후 신청이 진행됩니다.</p>
        </div>

        <div>
            <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                <template slot-scope="{ schema }">
                    <FormTextBox type="row" label="연령" value="만 41세" />
                    <FormTextBox type="row" label="결제일" value="1일" />
                    <DropdownBox
                        id="dropdown-box01"
                        label="대출용도"
                        :list="loanUseList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                        error-message="에러메시지가 필요할까"
                        success-message="없어도 될듯"
                    />

                    <DropdownBox
                        id="dropdown-box02"
                        label="연간소득"
                        :list="annualIncomeList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                        error-message="에러메시지가 필요할까"
                        success-message="없어도 될듯"
                    />

                    <DropdownBox
                        id="dropdown-box03"
                        label="신용점수"
                        :list="creditScoreList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                        error-message="신용점수가 신용대출 신청 기준에 부합하지 않습니다."
                        success-message="없어도 될듯"
                    />

                    <CheckBoxGroup name="agree" value="상품설명서 확인 후 동의" label="금융상품 설명서" :disabled="false" />

                    <RadioGroup name="email" :disabled="false" :list="agreeRadio" />
                </template>
            </FormProvider>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RadioProps } from '@components/form/Radio.vue'

interface Data {
    buttonField: string
    calendarField: string
    checkSingle: boolean
    secretNumber: string
    singleSelection: string
    switchButton: boolean
    textFieldPrimary: string
}

@Component
export default class LoanApply extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: 'LOCA MONEY:BIZ 7*3*', value: 'LOCA MONEY:BIZ 7*3*', selected: true },
        { displayName: '가장최근에 받은 카드가 디폴트로 노출', value: '가장최근에 받은 카드가 디폴트로 노출' },
    ]

    //대출용도
    private loanUseList: DropdownBoxList = [
        { displayName: '선택', value: 'value1', selected: true },
        { displayName: '가계자금', value: 'value2' },
        { displayName: '기업자금', value: 'value3' },
        { displayName: '주택자금', value: 'value4' },
        { displayName: '경조사금', value: 'value5' },
        { displayName: '교육비', value: 'value6' },
        { displayName: '의료비', value: 'value7' },
        { displayName: '타기관 대출금 상환', value: 'value8' },
    ]

    //연간소득
    private annualIncomeList: DropdownBoxList = [
        { displayName: '선택', value: 'value1', selected: true },
        { displayName: '6백만원 이하', value: 'value2' },
        { displayName: '6백만원 초과 ~ 5천만원 미만', value: 'value3' },
        { displayName: '5천만원 초과 ~ 1억원 미만', value: 'value4' },
        { displayName: '1억원 초과', value: 'value5' },
    ]

    //신용점수
    private creditScoreList: DropdownBoxList = [
        { displayName: '선택', value: 'value1', selected: true },
        { displayName: '600점 이하', value: 'value2' },
        { displayName: '600점 초과', value: 'value3' },
    ]

    private agreeRadio: RadioProps[] = [
        { value: 'y', label: '예', checked: true },
        { value: 'n', label: '아니요', checked: false },
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

<style></style>

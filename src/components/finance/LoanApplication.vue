<template>
    <div class="container floating">
        <div class="content">
            <Title title="신청서" />

            <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                <template slot-scope="{ schema }">
                    <div class="form-col">
                        <div class="field-box">
                            <LabelTitle label="나의 최대한도" />
                            <div class="field-cont">
                                <em><strong>5,000</strong>만원</em>
                            </div>
                        </div>

                        <div class="field-box">
                            <LabelTitle label="최저금리" />
                            <div class="field-cont">
                                <em><strong>14.3</strong>%</em>
                            </div>
                        </div>
                    </div>

                    <InfoList :list="infoList" />

                    <TextField
                        id="text-form01"
                        type="text"
                        label="신청금액"
                        :hidden-label="false"
                        :maxlength="9999"
                        placeholder="금액 입력"
                        :readonly="false"
                        :disabled="false"
                        unit="만원"
                        :validate="null"
                        :default-value="null"
                    />
                    <!--[D] 신청금액이 5천만원 이상 입력되었을시 노출-->
                    <BulletList :list="applyPrice" />

                    <DropdownBox
                        id="dropdown-box01"
                        label="대출기간"
                        :list="loanUseList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                        error-message="에러메시지가 필요할까"
                        success-message="없어도 될듯"
                    />

                    <LabelTitle label="상환방법">
                        <BasicButton type="textBlue" @click="openPopup">
                            상환방법 안내
                        </BasicButton>
                    </LabelTitle>
                    <DropdownBox
                        id="dropdown-box02"
                        label="상환방법 선택"
                        :hidden-label="true"
                        :list="annualIncomeList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                        error-message="에러메시지가 필요할까"
                        success-message="없어도 될듯"
                    />

                    <DropdownBox
                        id="dropdown-box02"
                        label="상환방법"
                        :list="annualIncomeList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                        error-message="에러메시지가 필요할까"
                        success-message="없어도 될듯"
                    />
                    <BulletList :list="repaymentInfo" />

                    <LabelTitle label="대금상환율">
                        <BasicButton type="textBlue" @click="openPopup">
                            예상 대금상환금 확인
                        </BasicButton>
                    </LabelTitle>
                    <TextField
                        id="text-form02"
                        type="text"
                        label="대금상환율 입력"
                        :hidden-label="true"
                        :maxlength="9999"
                        placeholder="상환율 입력"
                        :readonly="false"
                        :disabled="false"
                        unit="%"
                        :validate="null"
                        :default-value="null"
                    />

                    <CheckBox
                        id="my-radio"
                        type="normal"
                        label="상환금액은 매출대금에서 차감됩니다. "
                        :disabled="false"
                        :required="false"
                        :checked="false"
                        :index="null"
                        text="내용을 충분히 이해하며 본 상품에 가입함을 확인합니다."
                    />

                    <DropdownBox
                        id="dropdown-box03"
                        label="결제일"
                        :list="annualIncomeList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                    />

                    <TextField
                        id="phone-number"
                        type="select"
                        label="입금계좌(본인계좌)"
                        :hidden-label="null"
                        :maxlength="9999"
                        placeholder="계좌번호 [-]없이 입력"
                        :readonly="false"
                        :disabled="false"
                        unit=""
                        :validate="null"
                        error-message="계좌번호를 정확하게 입력해 주세요."
                        :default-value="null"
                        :list="[
                            { displayName: '은행', value: '은행', selected: true },
                            { displayName: 'SKT', value: 'skt' },
                            { displayName: 'LG U+', value: 'lguplus' },
                            { displayName: 'KT알뜰폰', value: 'kt_sub' },
                            { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                            { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
                        ]"
                        :update:list="null"
                        :select="null"
                        name="phoneNumber"
                    />
                    <BasicButton size="medium" class="btn-check">
                        확인
                    </BasicButton>

                    <TextField
                        id="phone-number"
                        type="select"
                        label="결제계좌(본인계좌)"
                        :hidden-label="null"
                        :maxlength="9999"
                        placeholder="계좌번호 [-]없이 입력"
                        :readonly="false"
                        :disabled="false"
                        unit=""
                        :validate="null"
                        error-message="계좌번호를 정확하게 입력해 주세요."
                        :default-value="null"
                        :list="[
                            { displayName: '은행', value: '은행', selected: true },
                            { displayName: 'SKT', value: 'skt' },
                            { displayName: 'LG U+', value: 'lguplus' },
                            { displayName: 'KT알뜰폰', value: 'kt_sub' },
                            { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                            { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
                        ]"
                        :update:list="null"
                        :select="null"
                        name="phoneNumber"
                    />

                    <CheckBox
                        id="my-radio"
                        type="normal"
                        label="입금 계좌번호와 동일하게 설정"
                        :disabled="false"
                        :required="false"
                        :checked="false"
                        :index="null"
                        class="chk-bank"
                    />
                    <BasicButton size="medium" class="btn-check">
                        확인
                    </BasicButton>
                </template>
            </FormProvider>
        </div>

        <!--popup-->

        <!--예상 대금상환금 확인 팝업 -->
        <FullPopup :show.sync="popShow" title="예상 대금상환금 확인" :button-text="{ confirm: '확인' }" type="popup" @confirm="onConfirm">
            <PopupPredictionLoan />
        </FullPopup>

        <!--상환방법 안내 팝업 -->
        <FullPopup :show.sync="popShow" title="상환방법 안내" :button-text="{ confirm: '확인' }" type="popup" @confirm="onConfirm">
            <PopupRepaymentInfo />
        </FullPopup>
        <!--//popup-->

        <portal to="floating">
            <BasicButton size="large">
                다음
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupPredictionLoan from '@components/finance/PopupPredictionLoan.vue'
import PopupRepaymentInfo from '@components/finance/PopupRepaymentInfo.vue'

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
    components: { PopupPredictionLoan, PopupRepaymentInfo },
})
export default class LoanApplication extends Vue {
    private infoList = [
        {
            title: '신청금액',
            desc: '8,000만원',
        },
        {
            title: '신청금액',
            desc: '8,000만원',
        },
    ]

    // s: popup
    private popShow: boolean = false
    openPopup() {
        this.popShow = true
    }
    onConfirm() {
        this.popShow = false
    }
    // e: popup

    private applyPrice = [{ text: '5천만원 초과금액 이용 시 인지세(255,000원) 제외 후 입금됩니다.' }]
    private repaymentInfo = [{ text: '잔여금액 존재 하였을 시 결제일에 청구 됩니다.' }]

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

<style scoped lang="scss" src="./LoanApplication.scss" />

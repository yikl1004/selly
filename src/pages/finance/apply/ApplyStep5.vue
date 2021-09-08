<template>
    <Page floating :footer="false">
        <Header type="proccess" title="LOCA MONEY Biz론" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="3" :count="3" />
                <Title title="부가정보" />

                <div class="box-form">
                    <InfoList :list="infoList" />
                    <FormProvider
                        :schema="data"
                        @change="formChange"
                        @submit="onSubmit"
                    >
                        <template slot-scope="{ schema }">
                            <ButtonField
                                id="enName"
                                name="name"
                                label="영문 이름"
                                button-text="확인"
                                placeholder="영문이름 입력"
                            />
                            <BulletList :list="nameInfo" />
                            <EmailForm
                                id="my-email"
                                label="이메일"
                                :hidden-label="null"
                                :readonly="false"
                                :disabled="false"
                                :validate="null"
                                :default-value="null"
                                :list="[
                                    {
                                        displayName: 'KT',
                                        value: 'kt',
                                        selected: true,
                                    },
                                    { displayName: 'SKT', value: 'skt' },
                                    { displayName: 'LG U+', value: 'lguplus' },
                                    {
                                        displayName: 'KT알뜰폰',
                                        value: 'kt_sub',
                                    },
                                    {
                                        displayName: 'SKT알뜰폰',
                                        value: 'skt_sub',
                                    },
                                    {
                                        displayName: 'LGU+알뜰폰',
                                        value: 'lguplus_sub',
                                    },
                                ]"
                                :update:list="null"
                                :select="null"
                            />
                            <AddressField
                                id="a"
                                label="자택주소"
                                :hidden-label="null"
                                :readonly="false"
                                :disabled="false"
                                :validate="null"
                                :default-value="null"
                            />

                            <DropdownBox
                                id="dropdown-box01"
                                label="청구서 수령방법"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                error-message="에러메시지가 필요할까"
                                success-message="없어도 될듯"
                            />

                            <div class="select-job-box">
                                <DropdownBox
                                    id="dropdown-box01"
                                    label="직업 구분"
                                    :list="dropdownBoxList"
                                    :default-value="schema.dropdownBox"
                                    :disabled="false"
                                    error-message="에러메시지가 필요할까"
                                    success-message="없어도 될듯"
                                />

                                <DropdownBox
                                    id="dropdown-box02"
                                    label="직업 구분 중분류"
                                    :hidden-label="true"
                                    :list="dropdownBoxList"
                                    :default-value="schema.dropdownBox"
                                    :disabled="false"
                                    error-message="에러메시지가 필요할까"
                                    success-message="없어도 될듯"
                                />

                                <DropdownBox
                                    id="dropdown-box03"
                                    label="직업 구분 대분류"
                                    :hidden-label="true"
                                    :list="dropdownBoxList"
                                    :default-value="schema.dropdownBox"
                                    :disabled="false"
                                    error-message="에러메시지가 필요할까"
                                    success-message="없어도 될듯"
                                />
                            </div>

                            <LabelTitle label="신분증 인증" />
                            <Tab :list="tabList" :active="0" type="solid">
                                <template slot-scope="{ activeIndex }">
                                    <div
                                        v-if="activeIndex === 0"
                                        class="tab-cont"
                                    >
                                        <div class="card-auth-box">
                                            <TextField
                                                id="my-text"
                                                type="text"
                                                label="발급일자"
                                                :hidden-label="true"
                                                :maxlength="9999"
                                                placeholder="발급일자 (숫자만) 입력"
                                                :readonly="false"
                                                :disabled="false"
                                                unit=""
                                                :validate="null"
                                                error-message="주민등록 번호 발급일자를 정확하게 입력해 주세요."
                                                :default-value="null"
                                            />
                                            <div class="img-box">
                                                <img
                                                    src="/assets/finance/img-id-card.png"
                                                    alt="주민등록증 이미지"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-if="activeIndex === 1"
                                        class="tab-cont"
                                    >
                                        <div class="card-auth-box">
                                            <TextField
                                                id="area-number"
                                                type="select"
                                                label="지역코드"
                                                :hidden-label="true"
                                                :maxlength="9999"
                                                placeholder="면허증 번호[-]없이 입력"
                                                :readonly="false"
                                                :disabled="false"
                                                unit=""
                                                :validate="null"
                                                error-message="계좌번호를 정확하게 입력해 주세요."
                                                :default-value="null"
                                                :list="[
                                                    {
                                                        displayName: '은행',
                                                        value: '은행',
                                                        selected: true,
                                                    },
                                                    {
                                                        displayName: 'SKT',
                                                        value: 'skt',
                                                    },
                                                    {
                                                        displayName: 'LG U+',
                                                        value: 'lguplus',
                                                    },
                                                    {
                                                        displayName: 'KT알뜰폰',
                                                        value: 'kt_sub',
                                                    },
                                                    {
                                                        displayName:
                                                            'SKT알뜰폰',
                                                        value: 'skt_sub',
                                                    },
                                                    {
                                                        displayName:
                                                            'LGU+알뜰폰',
                                                        value: 'lguplus_sub',
                                                    },
                                                ]"
                                                :update:list="null"
                                                :select="null"
                                                name="phoneNumber"
                                            />
                                            <div class="img-box">
                                                <img
                                                    src="/assets/finance/img-license-card.png"
                                                    alt="운전면허증 이미지"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </Tab>

                            <DropdownBox
                                id="dropdown-box04"
                                label="거래목적"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                error-message="에러메시지가 필요할까"
                                success-message="없어도 될듯"
                            />
                            <DropdownBox
                                id="dropdown-box05"
                                label="상환자금출처"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                error-message="에러메시지가 필요할까"
                                success-message="없어도 될듯"
                            />

                            <CheckBoxGroup
                                name="group1"
                                value="전체 동의"
                                label="개인(신용)정보 선택적 동의"
                                :disabled="true"
                                :list="checkList"
                            />

                            <CheckBoxGroup
                                name="group2"
                                value="전체 동의"
                                label="약관동의"
                                :disabled="true"
                                :list="checkList"
                            />
                        </template>
                    </FormProvider>
                </div>

                <portal to="floating">
                    <BasicButton size="large"> 이전 </BasicButton>
                    <BasicButton size="large"> 다음 </BasicButton>
                </portal>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PopupPredictionLoan from '@components/finance/PopupPredictionLoan.vue'
import type { CheckList } from '@components/form/CheckBoxGroup.vue'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

// interface Data {
//     buttonField: string
//     calendarField: string
//     checkSingle: boolean
//     secretNumber: string
//     singleSelection: string
//     switchButton: boolean
//     textFieldPrimary: string
// }

@Component({
    components: { PopupPredictionLoan },
})
export default class LoanAddInfo extends Vue {
    private nameInfo = [
        {
            text: '여권 영문과 반드시 동일하게 기재해주세요.',
        },
    ]

    private tabList = [{ name: '주민등록증' }, { name: '운전면허증' }]

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

    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        {
            displayName: 'LOCA MONEY:BIZ 7*3*',
            value: 'LOCA MONEY:BIZ 7*3*',
            selected: true,
        },
        {
            displayName: '가장최근에 받은 카드가 디폴트로 노출',
            value: '가장최근에 받은 카드가 디폴트로 노출',
        },
    ]

    private checkList: CheckList = [
        { value: 'policy', label: '개인신용정보 제공 동의서 ', checked: true },
        { value: 'uniq', label: '장기카드대출(Biz) 거래약정서' },
        { value: 'telecom', label: '보이스피싱 예방을 위한 사전 문진표' },
        { value: 'cert', label: '개인정보 수집∙이용동의' },
    ]

    // s: popup
    private popShow = false
    openPopup() {
        this.popShow = true
    }
    onConfirm() {
        this.popShow = false
    }
    // e: popup

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

<style scoped lang="scss" src="./ApplyStep5.scss" />

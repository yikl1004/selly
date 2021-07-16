<template>
    <div class="container floating">
        <div class="content">
            <Title title="부가정보" />

            <div class="apply-terms-wrap">
                <InfoList :list="infoList" />
                <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                    <template slot-scope="{ schema }">
                        <EmailForm
                            id="my-email"
                            label="이메일"
                            :hidden-label="null"
                            :readonly="false"
                            :disabled="false"
                            :validate="null"
                            :default-value="null"
                            :list="[
                                { displayName: 'KT', value: 'kt', selected: true },
                                { displayName: 'SKT', value: 'skt' },
                                { displayName: 'LG U+', value: 'lguplus' },
                                { displayName: 'KT알뜰폰', value: 'kt_sub' },
                                { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                                { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
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
                                <div v-if="activeIndex === 0" class="tab-cont">
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
                                            <img src="/assets/finance/img-id-card.png" alt="주민등록증 이미지" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="activeIndex === 1" class="tab-cont">
                                    <div class="card-auth-box">
                                        <TextField
                                            id="my-text"
                                            type="text"
                                            label="지역번호/명"
                                            :hidden-label="true"
                                            :maxlength="9999"
                                            placeholder="지역번호/명 입력"
                                            :readonly="false"
                                            :disabled="false"
                                            :validate="null"
                                            :default-value="null"
                                        />
                                        <TextField
                                            id="my-text"
                                            type="text"
                                            label="발급일자"
                                            :hidden-label="true"
                                            :maxlength="9999"
                                            placeholder="면허증 번호 [-]없이 입력"
                                            :readonly="false"
                                            :disabled="false"
                                            unit=""
                                            :validate="null"
                                            error-message="운전면허 번호를 정확하게 입력해 주세요."
                                            :default-value="null"
                                        />
                                        <div class="img-box">
                                            <img src="/assets/finance/img-license-card.png" alt="운전면허증 이미지" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Tab>

                        <CheckBoxGroup
                            name="group1"
                            value="전체 동의"
                            label="개인(신용)정보 선택적 동의"
                            :disabled="true"
                            :list="checkList"
                        />

                        <CheckBoxGroup name="group2" value="전체 동의" label="약관동의" :disabled="true" :list="checkList" />
                    </template>
                </FormProvider>
            </div>
        </div>

        <!--popup-->
        <!--[D] 개인(신용)정보 필수적 동의 팝업 -->
        <FullPopup
            :show.sync="popShow"
            title="개인(신용)정보 필수적 동의 "
            :button-text="{ confirm: '동의함' }"
            type="popup"
            @confirm="onConfirm"
        >
            개인(신용)정보 필수적 동의 팝업_내용수급필요
        </FullPopup>

        <!--[D] 약관동의 팝업 -->
        <FullPopup :show.sync="popShow" title="약관 동의 " :button-text="{ confirm: '동의함' }" type="popup" @confirm="onConfirm">
            약관 팝업_내용수급필요
        </FullPopup>
        <!--//popup-->
        <portal to="floating">
            <BasicButton size="large">
                이전
            </BasicButton>
            <BasicButton size="large">
                다음
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupPredictionLoan from '@components/finance/PopupPredictionLoan.vue'
import { CheckList } from '@components/form/CheckBoxGroup.vue'

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
    components: { PopupPredictionLoan },
})
export default class LoanAddInfo extends Vue {
    private tabList = [{ name: '주민등록증' }, { name: '운전명허증' }]

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
        { displayName: 'LOCA MONEY:BIZ 7*3*', value: 'LOCA MONEY:BIZ 7*3*', selected: true },
        { displayName: '가장최근에 받은 카드가 디폴트로 노출', value: '가장최근에 받은 카드가 디폴트로 노출' },
    ]

    private checkList: CheckList = [
        { value: 'policy', label: '개인신용정보 제공 동의서 ', checked: true },
        { value: 'uniq', label: '장기카드대출(Biz) 거래약정서' },
        { value: 'telecom', label: '보이스피싱 예방을 위한 사전 문진표' },
        { value: 'cert', label: '개인정보 수집∙이용동의' },
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

<style scoped lang="scss" src="./LoanAddInfo.scss" />

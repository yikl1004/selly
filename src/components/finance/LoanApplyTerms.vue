<template>
    <div class="container floating">
        <div class="content">
            <Title title="대출신청 약관동의" />

            <div class="apply-terms-wrap">
                <InfoList :list="infoList" />
                <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                    <template slot-scope="{}">
                        <FormTextBox type="col" label="이용카드" value="본인  LOCA Classic 7*5*" />
                        <FormTextBox type="col" label="입금계좌" value="기업은행 5920271*****11" />

                        <CheckBoxGroup
                            name="group1"
                            value="전체 동의"
                            label="개인(신용)정보 필수적 동의"
                            :disabled="true"
                            :list="checkList"
                        />

                        <CheckBoxGroup name="group2" value="전체 동의" label="약관동의" :disabled="true" :list="checkList" />

                        <CheckBoxGroup name="group3" value="전체 동의" label="휴대폰 인증 약관동의" :disabled="true" :list="checkList" />

                        <PhoneCertForm
                            id="phone-number"
                            type="select"
                            label="휴대전화 번호"
                            :hidden-label="null"
                            :maxlength="9999"
                            placeholder="휴대전화 번호 [-]없이 입력"
                            :readonly="false"
                            :disabled="false"
                            :validate="null"
                            error-message="휴대전화번호를 정확하게 입력해 주세요"
                            success-message="성공메시지"
                            :default-value="null"
                            :list="[
                                { displayName: '통신사', value: '', selected: true },
                                { displayName: 'KT', value: 'kt' },
                                { displayName: 'SKT', value: 'skt' },
                                { displayName: 'LG U+', value: 'lguplus' },
                                { displayName: 'KT알뜰폰', value: 'kt_sub' },
                                { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                                { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
                            ]"
                            :update:list="null"
                            :select="null"
                            button-text="전송"
                            :timer="{ count: 3, unit: 'minute', format: 'm:ss' }"
                            :search="null"
                            name="cert"
                        />
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

        <!--[D] 휴대폰 인증 약관동의 팝업 -->
        <FullPopup
            :show.sync="popShow"
            title="휴대폰 인증 약관 동의 "
            :button-text="{ confirm: '동의함' }"
            type="popup"
            @confirm="onConfirm"
        >
            휴대폰 인증 약관 팝업_내용수급필요
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
export default class LoanApplyTerms extends Vue {
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

<style scoped lang="scss" src="./LoanApplyTerms.scss" />

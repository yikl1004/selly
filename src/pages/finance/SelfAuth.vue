<template>
    <div class="container floating">
        <div class="content">
            <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                <template slot-scope="{ schema }">
                    <TextField
                        id="text-form01"
                        type="text"
                        label="이름"
                        :hidden-label="false"
                        :maxlength="9999"
                        placeholder="이름 입력"
                        :readonly="false"
                        :disabled="false"
                        :validate="null"
                        :default-value="null"
                        error-message="이름을 정확하게 입력해 주세요."
                    />

                    <SecretNumber
                        id="personal-number"
                        :readonly="false"
                        label="주민등록번호"
                        :hidden-label="null"
                        type="regist"
                        error-message="주민번호를 정확하게 입력해 주세요."
                    />

                    <DropdownBox
                        id="dropdown-box01"
                        label="사업자 등록번호"
                        :list="dropdownBoxList"
                        :default-value="schema.dropdownBox"
                        :disabled="false"
                    />

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
                    <CheckBoxGroup name="group1" value="전체 동의" label="개인(신용)정보 필수적 동의" :disabled="true" :list="checkList" />
                </template>
            </FormProvider>
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

        <!--[D] 개인정보 수집이용 팝업 -->
        <FullPopup
            :show.sync="popShow"
            title="개인(신용)정보 수집이용 동의 "
            :button-text="{ cancel: '동의하지 않음', confirm: '동의함' }"
            type="popup"
            @confirm="onConfirm"
        >
            개인정보 수집이용 팝업_내용수급필요
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
            <BasicButton size="large" @click="onClick">
                다음
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
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

@Component
export default class SelfAuth extends Vue {
    // s: popup
    private popShow: boolean = false
    openPopup() {
        this.popShow = true
    }
    onConfirm() {
        this.popShow = false
    }
    // e: popup

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

    /**
     * @category Data
     */

    @Prop({ type: Function, default: () => {}, required: true })
    readonly onClick!: Function

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

<template>
    <Page floating :footer="false">
        <Header type="sub" title="즉시 대출" />
        <PageBody class="floating">
            <div class="content">
                <FormProvider
                    :schema="data"
                    @change="formChange"
                    @submit="onSubmit"
                >
                    <template slot-scope="{ schema }">
                        <TextField
                            id="text-form01"
                            type="text"
                            label="성명"
                            :hidden-label="false"
                            :maxlength="9999"
                            placeholder="이름 입력"
                            :readonly="false"
                            :disabled="true"
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

                        <AgreePhone label="휴대폰 인증 약관동의" />

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
                                {
                                    displayName: '통신사',
                                    value: '',
                                    selected: true,
                                },
                                { displayName: 'KT', value: 'kt' },
                                { displayName: 'SKT', value: 'skt' },
                                { displayName: 'LG U+', value: 'lguplus' },
                                { displayName: 'KT알뜰폰', value: 'kt_sub' },
                                { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                                {
                                    displayName: 'LGU+알뜰폰',
                                    value: 'lguplus_sub',
                                },
                            ]"
                            :update:list="null"
                            :select="null"
                            button-text="전송"
                            :timer="{
                                count: 3,
                                unit: 'minute',
                                format: 'm:ss',
                            }"
                            :search="null"
                            name="cert"
                        />
                    </template>
                </FormProvider>
            </div>

            <!--popup-->

            <!--[D] 휴대폰 인증 약관동의 팝업 -->
            <FullPopup
                :show.sync="popAgree3"
                title="휴대폰 인증 약관 동의 "
                :button-text="{ confirm: '동의함' }"
                type="popup"
                @confirm="onAgree3Confirm"
            >
                <PopupAgreePhone />
            </FullPopup>
            <!--//popup-->

            <portal to="floating">
                <BasicButton size="large" @click="onClick"> 다음 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import type { CheckList } from '@components/form/CheckBoxGroup.vue'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import AgreePhone from '@components/finance/AgreePhone.vue'

@Component({
    components: {
        AgreePhone,
    },
})
export default class SelfAuth extends Vue {
    // s: popup
    private popShow = false
    openPopup() {
        this.popShow = true
    }
    onConfirm() {
        this.popShow = false
    }
    // e: popup
    private popAgree3 = false
    openPopupAgree3() {
        this.popAgree3 = true
    }
    onAgree3Confirm() {
        this.popAgree3 = false
    }

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

    /**
     * @category Data
     */

    @Prop({ type: Function, default: () => ({}), required: true })
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

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }
}
</script>

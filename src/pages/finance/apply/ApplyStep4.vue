<template>
    <Page floating :footer="false">
        <Header type="proccess" title="LOCA MONEY Biz론" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="3" :count="3" />
                <Title title="본인인증" />

                <div class="box-form">
                    <FormProvider
                        :schema="data"
                        @change="formChange"
                        @submit="onSubmit"
                    >
                        <template slot-scope="{}">
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
            </div>

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
                <BasicButton size="large"> 다음 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PopupAgreePhone from '@components/finance/PopupAgreePhone.vue'
import type { Schema } from '@components/form/FormProvider.vue'
import AgreePhone from '@components/finance/AgreePhone.vue'

@Component({
    components: { PopupAgreePhone, AgreePhone },
})
export default class LoanApplyTerms extends Vue {
    private popAgree3 = false
    openPopupAgree3() {
        this.popAgree3 = true
    }
    onAgree3Confirm() {
        this.popAgree3 = false
    }

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

<style scoped lang="scss"></style>

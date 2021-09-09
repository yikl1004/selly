<template>
    <Page floating :footer="false">
        <Header type="sub" title="사업자 대출" />
        <PageBody class="floating">
            <div class="content">
                <FormProvider
                    :schema="data"
                    @change="formChange"
                    @submit="onSubmit"
                >
                    <template slot-scope="{}">
                        <CheckBoxGroup
                            name="group1"
                            value="전체 동의"
                            label="개인(신용)정보 필수적 동의"
                            :disabled="true"
                            :list="checkList"
                        />

                        <CheckBoxGroup
                            name="group2"
                            value="신청하신 금융상품 안내를 위한 수집이용"
                            label="개인(신용)정보 선택적 동의"
                            :disabled="false"
                        />

                        <CheckBoxGroup
                            name="group3"
                            value="전체 동의"
                            label="약관 동의"
                            :disabled="true"
                            :list="checkList"
                        />
                    </template>
                </FormProvider>
            </div>
            <!--popup-->
            <!--[D] 개인(신용)정보 필수적 동의 팝업 -->
            <FullPopup
                :show.sync="popAgree1"
                title="개인(신용)정보 필수적 동의 "
                :button-text="{ confirm: '동의함' }"
                type="popup"
                @confirm="onAgree1Confirm"
            >
                <PopupAgreeCredit />
            </FullPopup>

            <!--[D] 약관동의 팝업 -->
            <FullPopup
                :show.sync="popAgree2"
                title="약관 동의 "
                :button-text="{ confirm: '동의함' }"
                type="popup"
                @confirm="onAgree2Confirm"
            >
                <PopupAgreeTerms />
            </FullPopup>

            <portal to="floating">
                <BasicButton size="large"> 다음 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { CheckList } from '@components/form/CheckBoxGroup.vue'
import type { Schema } from '@components/form/FormProvider.vue'
import PopupAgreeCredit from '@components/finance/PopupAgreeCredit.vue'
import PopupAgreeTerms from '@components/finance/PopupAgreeTerms.vue'

@Component({
    components: { PopupAgreeCredit, PopupAgreeTerms },
})
export default class LoanApplyTerms extends Vue {
    private checkList: CheckList = [
        { value: 'policy', label: '개인신용정보 제공 동의서 ', checked: true },
        { value: 'uniq', label: '장기카드대출(Biz) 거래약정서' },
        { value: 'telecom', label: '보이스피싱 예방을 위한 사전 문진표' },
        { value: 'cert', label: '개인정보 수집∙이용동의' },
    ]

    // s: popup
    private popAgree1 = false
    openPopupAgree1() {
        this.popAgree1 = true
    }
    onAgree1Confirm() {
        this.popAgree1 = false
    }

    private popAgree2 = false
    openPopupAgree2() {
        this.popAgree2 = true
    }
    onAgree2Confirm() {
        this.popAgree2 = false
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

<style scoped lang="scss" src="./ApplyStep3.scss" />

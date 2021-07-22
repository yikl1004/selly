<template>
    <div class="popup-refusal-wrap">
        <p class="txt">
            장기카드대출을 이용할 의사가 없는 회원님은 보이스피싱(전화금융사기)
            피해방지를 위해 장기카드대출 이용거절을 신청할 수 있습니다.
        </p>
        <BulletList :list="infoRefusal" />

        <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
            <template slot-scope="{ schema }">
                <DropdownBox
                    id="dropdown-box01"
                    label="보유카드"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                    :disabled="false"
                    error-message="에러메시지가 필요할까"
                    success-message="없어도 될듯"
                />

                <SecretNumber
                    id="personal-number-1"
                    :readonly="false"
                    label="카드 비밀번호"
                    type="card2"
                    error-message="카드비밀번호를 정확히 입력해주세요. (1/3)"
                />

                <TextField
                    id="text-form01"
                    type="text"
                    label="CVC/4DBC 번호"
                    :hidden-label="false"
                    :maxlength="9999"
                    placeholder="CVC/4DBC 번호 입력"
                    :readonly="false"
                    :disabled="false"
                    :validate="null"
                    :default-value="null"
                    error-message="CVC/4DBC 번호를 정확히 입력해주세요. (1/3)"
                />

                <BulletList :list="infoList" />
            </template>
        </FormProvider>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import type { Schema } from '@components/form/FormProvider.vue'

// interface Data {
//     buttonField: string
//     calendarField: string
//     checkSingle: boolean
//     secretNumber: string
//     singleSelection: string
//     switchButton: boolean
//     textFieldPrimary: string
// }

@Component
export default class PopupRefusal extends Vue {
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

    //블릿리스트 샘플

    private infoRefusal = [
        {
            text:
                '장기카드대출 이용거절을 신청한 경우 장기카드대출을 신청 및 이용할 수 없으며 향후 장기카드대출을 신청 및 이용하고자 하는 경우 카드센터(신분증 지참)에 직접 방문하거나 고객센터 또는 롯데카드 홈페이지 및 모바일웹을 통해 ‘장기카드대출 이용동의’를 신청하셔야 합니다.',
        },
        {
            text:
                '장기카드대출 이용거절 신청은 당일 09:00~22:00 동안 가능합니다.',
        },
    ]

    private infoList = [
        {
            text:
                '비밀번호 및 CVC/4DBC 3회 이상 입력 오류시 서비스 제한을 받을 수 있습니다.',
        },
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

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }
}
</script>
<style lang="scss" scoped src="./PopupRefusal.scss"></style>

<template>
    <div class="container">
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
            </template>
        </FormProvider>

        <BulletList :list="infoList" />

        <portal to="floating">
            <BasicButton size="large" @click="onClick">
                다음
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

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
export default class CreditCardAuth extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: 'LOCA MONEY:BIZ 7*3*', value: 'LOCA MONEY:BIZ 7*3*', selected: true },
        { displayName: '가장최근에 받은 카드가 디폴트로 노출', value: '가장최근에 받은 카드가 디폴트로 노출' },
    ]

    //블릿리스트 샘플
    private infoList = [
        {
            text: '비밀번호 3회 이상 입력 오류시 서비스 제한을 받을 수 있습니다.',
        },
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
<style scoped></style>

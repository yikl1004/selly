<template>
    <div class="container">
        <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
            <template slot-scope="{ schema }">
                <DropdownBox
                    id="dropdown-box"
                    label="select 타입"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                />
                <ButtonField
                    id="button-field"
                    label="버튼형 텍스트"
                    button-text="버튼"
                    :default-value="schema.buttonField"
                />
                <CalendarField
                    id="calendarField"
                    label="달력"
                    :default-value="schema.calendarField"
                />
                <CheckBox
                    id="check-single"
                    label="체크박스 단독"
                    :checked="schema.checkSingle"
                />
                <SecretNumber
                    id="secret-number"
                    label="비밀번호 형식"
                    type="regist"
                />
                <SingleSelection
                    id="single-selection"
                    :list="singleSelectionList"
                    :default-value="schema.singleSelection"
                />
                <SwitchButton
                    id="switch-button"
                    label="스위치 버튼"
                    :default-value="schema.switchButton"
                />
                <TextField
                    id="textfield-primary"
                    label="입력"
                    :default-value="schema.textfieldPrimary"
                />
                <BasicButton submit> 전송 </BasicButton>
            </template>
        </FormProvider>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import type { SingleSelectionListItem } from '@components/form/SingleSelection.vue'

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
export default class FormExample extends Vue {
    private singleSelectionList: SingleSelectionListItem[] = [
        { displayName: '첫번째', value: 'first' },
        { displayName: '두번째', value: 'second' },
        { displayName: '세번째', value: 'third' },
        { displayName: '네번째', value: 'fourth' },
    ]
    private dropdownBoxList: DropdownBoxList = [
        { displayName: 'KT', value: 'kt' },
        { displayName: 'SKT', value: 'skt' },
        { displayName: 'LG U+', value: 'lguplus' },
        { displayName: 'KT알뜰폰', value: 'kt_sub' },
        { displayName: 'SKT알뜰폰', value: 'skt_sub' },
        { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
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

<style scoped></style>

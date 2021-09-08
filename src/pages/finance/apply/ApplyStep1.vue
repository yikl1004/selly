<template>
    <Page floating :footer="false">
        <Header type="proccess" title="LOCA MONEY Biz론" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="1" :count="3" />
                <Title title="가맹점 선택" />
                <div class="box-form">
                    <FormProvider
                        :schema="data"
                        @change="formChange"
                        @submit="onSubmit"
                    >
                        <template slot-scope="{ schema }">
                            <DropdownBox
                                id="dropdown-box01"
                                label="사업자 등록번호"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                error-message="에러메시지가 필요할까"
                                success-message="없어도 될듯"
                            />

                            <DropdownBox
                                id="dropdown-box02"
                                label="가맹점"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                error-message="에러메시지가 필요할까"
                                success-message="없어도 될듯"
                            />
                        </template>
                    </FormProvider>
                </div>
            </div>
            <portal to="floating">
                <BasicButton size="large"> 다음 </BasicButton>
            </portal>
        </PageBody>
    </Page>
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
export default class FranchiseeSelect extends Vue {
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

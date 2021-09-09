<template>
    <div class="card-auth-box">
        <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
            <template slot-scope="{ schema }">
                <DropdownBox
                    id="dropdown-box01"
                    label="보유카드"
                    type="large"
                    :list="dropdownBoxList"
                    :default-value="schema.dropdownBox"
                    :disabled="false"
                />

                <SecretNumber
                    id="personal-number-1"
                    :readonly="false"
                    label="카드 비밀번호"
                    type="card2"
                    error-message="카드비밀번호를 정확히 입력해주세요. (1/3)"
                />

                <TextField
                    v-if="type === 'cvc'"
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

                <!--[D] 비밀번호/ 비밀번호 + cvc 노출 케이스에 따라 뿌려지는 내용이 틀려야함 -->
                <BulletList :list="infoList" />
            </template>
        </FormProvider>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

@Component
export default class CardAuth extends Vue {
    /**
     * @Props
     */

    /** cvc 노출 여부 체크_퍼블 */
    @Prop({ type: String })
    readonly type!: string

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
    private infoList = [
        {
            text:
                '비밀번호 3회 이상 입력 오류시 서비스 제한을 받을 수 있습니다.',
        },
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

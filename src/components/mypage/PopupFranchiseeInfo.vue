<template>
    <div class="franchisee-info-wrap">
        <div class="franchisee-info">
            <p>가맹점 번호 24357689</p>
            <strong>이층집 강남점</strong>
        </div>
        <div class="franchisee-modify-box">
            <FormProvider
                :schema="data"
                @change="formChange"
                @submit="onSubmit"
            >
                <template slot-scope="{}">
                    <!-- 주소 컴포넌트 사용하면 팝업이 안열림. 확인필요 -->
                    <!-- <AddressField
                        id="a"
                        label="가맹점 주소"
                        :hidden-label="false"
                        :readonly="false"
                        :disabled="false"
                        :default-value="''"
                    /> -->

                    <TextField
                        id="phone-number"
                        type="select"
                        label="가맹점 연락처"
                        :hidden-label="null"
                        :maxlength="9999"
                        placeholder="가맹점 연락처 입력"
                        :readonly="false"
                        :disabled="false"
                        unit=""
                        :validate="null"
                        error-message="에러메시지"
                        success-message="성공메시지"
                        :default-value="null"
                        :list="[
                            { displayName: 'KT', value: 'kt', selected: true },
                            { displayName: 'SKT', value: 'skt' },
                            { displayName: 'LG U+', value: 'lguplus' },
                            { displayName: 'KT알뜰폰', value: 'kt_sub' },
                            { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                            { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
                        ]"
                        :update:list="null"
                        :select="null"
                        name="phoneNumber"
                    />
                </template>
            </FormProvider>
            <BulletList :list="list" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
export default class PopupFranchiseeInfo extends Vue {
    private list = [
        { text: '롯데카드에 등록된 가맹점 정보가 변경됩니다.' },
        {
            text:
                '가맹점 정보를 변경 시 마케팅. 대상 고객 수집에 시간이 소요되며, 변경 후 당일에는 마케팅 신청이 불가합니다.',
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

<style lang="scss" src="./PopupFranchiseeInfo.scss"></style>

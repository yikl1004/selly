<template>
    <div class="container">
        <div class="content">
            <div class="business-wrap">
                <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                    <template slot-scope="{ schema }">
                        <DropdownBox
                            id="dropdown-box01"
                            label="사업자 선택"
                            :list="dropdownBoxList"
                            :default-value="schema.dropdownBox"
                            :disabled="false"
                        />
                        <div class="btn-area">
                            <BasicButton type="textBlue" @click="openPopup">
                                사업자 추가
                            </BasicButton>
                            <BasicButton type="textBlue">
                                사업자 삭제
                            </BasicButton>
                        </div>
                        <ButtonField
                            id="name"
                            label="사업자명"
                            :maxlength="9999"
                            placeholder="사업자 1"
                            :readonly="false"
                            :disabled="false"
                            button-text="입력"
                            name="cert"
                            error-message="사업자명을 정확하게 입력해주세요."
                        />
                        <BtnGroup>
                            <BasicButton type="medium">
                                매출/입금 연동
                            </BasicButton>
                        </BtnGroup>
                    </template>
                </FormProvider>

                <div class="franchisee-list-box">
                    <strong class="title">가맹점 정보</strong>

                    <BoardItem
                        v-for="(item, index) in franchiseeList"
                        :key="`board-item-${index}`"
                        :index="index"
                        :title="item.title"
                        @click="openPopup"
                    />
                </div>
            </div>
        </div>
        <!--popup-->
        <!--[D] 가맹점 정보 팝업 -->
        <FullPopup :show.sync="popShow" title="가맹점 정보" :button-text="{ confirm: '수정' }" type="popup" @confirm="onConfirm">
            <PopupFranchiseeInfo />
        </FullPopup>
        <!--//popup-->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupFranchiseeInfo from '@components/mypage/PopupFranchiseeInfo.vue'

interface Data {
    buttonField: string
    calendarField: string
    checkSingle: boolean
    secretNumber: string
    singleSelection: string
    switchButton: boolean
    textFieldPrimary: string
}

@Component({
    components: { PopupFranchiseeInfo },
})
export default class BusinessPage extends Vue {
    // s: popup
    private popShow: boolean = false
    openPopup() {
        this.popShow = true
    }
    onConfirm() {
        this.popShow = false
    }
    // e: popup

    //가맹점 정보 샘플
    private franchiseeList = [{ title: '이층집 강남점1' }, { title: '이층집 강남점2' }]
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: 'LOCA MONEY:BIZ 7*3*', value: 'LOCA MONEY:BIZ 7*3*', selected: true },
        { displayName: '가장최근에 받은 카드가 디폴트로 노출', value: '가장최근에 받은 카드가 디폴트로 노출' },
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

<style lang="scss" src="./BusinessPage.scss"></style>

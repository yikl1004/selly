<template>
    <div class="container">
        <div class="box-card-loan">
            <Title title="1. 가맹점 선택" />
            <AddressField
                id="a"
                label="주소"
                :hidden-label="null"
                :readonly="false"
                :disabled="false"
                :validate="null"
                :default-value="null"
            />
            <Flag text="text" />
            <Tab :list="tabList" :active="0" type="solid">
                <template slot-scope="{ activeIndex }">
                    <div v-if="activeIndex === 0" class="tab-cont">
                        <p>1</p>
                    </div>
                    <div v-if="activeIndex === 1" class="tab-cont">
                        <p>2</p>
                    </div>
                    <div v-if="activeIndex === 2" class="tab-cont">
                        <p>3</p>
                    </div>
                </template>
            </Tab>

            <Tab :list="tabList" :active="0">
                <template slot-scope="{ activeIndex }">
                    <div v-if="activeIndex === 0">
                        <p>1</p>
                    </div>
                    <div v-if="activeIndex === 1">
                        <p>2</p>
                    </div>
                    <div v-if="activeIndex === 2">
                        <p>3</p>
                    </div>
                </template>
            </Tab>

            <Tab
                :list="[
                    { name: '탭1' },
                    { name: '탭2' },
                    { name: '탭3' },
                    { name: '탭4' },
                    { name: '탭5' },
                    { name: '탭6' },
                    { name: '탭7' },
                    { name: '탭8' },
                    { name: '탭9' },
                ]"
                :active="0"
                type="flicking"
            >
                <template slot-scope="{ activeIndex }">
                    <div v-if="activeIndex === 0">
                        <p>1</p>
                    </div>
                    <div v-if="activeIndex === 1">
                        <p>2</p>
                    </div>
                    <div v-if="activeIndex === 2">
                        <p>3</p>
                    </div>
                    <div v-if="activeIndex === 3">
                        <p>4</p>
                    </div>
                    <div v-if="activeIndex === 4">
                        <p>5</p>
                    </div>
                    <div v-if="activeIndex === 5">
                        <p>6</p>
                    </div>
                    <div v-if="activeIndex === 6">
                        <p>7</p>
                    </div>
                    <div v-if="activeIndex === 7">
                        <p>8</p>
                    </div>
                </template>
            </Tab>
            <div class="table-box">
                <div class="table-scroll">
                    <table>
                        <caption>
                            제목
                        </caption>
                        <colgroup>
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">상품명</th>
                                <th scope="col">이자율</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>내용</td>
                                <td>내용</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <EmailForm
                id="my-email"
                label="이메일"
                :hidden-label="null"
                :readonly="false"
                :disabled="false"
                :validate="null"
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
            />
            <BulletList />

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
                        error-message="실패메시지"
                        success-message="성공메시지"
                    />
                </template>
            </FormProvider>

            <SecretNumber
                id="personal-number"
                :readonly="false"
                label="주민등록번호"
                :hidden-label="null"
                type="regist"
            />

            <SecretNumber
                id="personal-number-1"
                :readonly="false"
                label="카드 비밀번호"
                type="card2"
            />

            <TextField
                id="my-text"
                type="text"
                label="소득구분a"
                :hidden-label="null"
                :maxlength="9999"
                placeholder="소득구분 입력"
                :readonly="false"
                :disabled="false"
                unit=""
                :validate="null"
                error-message="에러메시지"
                success-message="성공메시지"
                :default-value="null"
            />
            <CheckBoxGroup
                name="group1"
                value="버튼내용"
                label="버튼 체크박스"
                :disabled="false"
            />

            <CheckBoxGroup
                name="group2"
                value="버튼내용"
                label="버튼체크박스 그룹"
                :disabled="true"
                :list="checkList"
            />

            <!-- <RadioGroup name="group3" value="버튼내용" label="체크박스내용" :disabled="false" :list="checkList" /> -->

            <FormTextBox type="row" />
            <FormTextBox type="col" />

            <InfoList />
            <InfoList type="style01" />

            <CautionBox type="complete" />

            <br /><br />
            <!--팝업확인-->
            <BasicButton size="large" @click="openPopup">
                풀팝업 확인
            </BasicButton>
            <FullPopup
                :show.sync="show"
                title="이거슨 제목인가?"
                :button-text="{ confirm: '확인', cancel: '취소' }"
                type="popup"
                @confirm="onConfirm"
                @cancel="onCancel"
            >
                <p>
                    모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적
                    신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에
                    영역에 있어서 차별을 받지 아니한다.
                </p>
            </FullPopup>
            <!-- 
            <Radio label="라벨1" name="radio01" value="value" />
            <Radio label="라벨2" name="radio01" value="value1" />
            <Radio label="라벨2" name="radio01" value="value1" :disabled="true" /> -->

            <AccoItem :list="accordionList" />

            <!-- 인풋 텍스트 -->
            <div>
                <TextField
                    id="my-text"
                    type="text"
                    label="소득구분a"
                    :hidden-label="null"
                    :maxlength="9999"
                    placeholder="소득구분 입력"
                    :readonly="false"
                    :disabled="false"
                    unit=""
                    :validate="null"
                    error-message="에러메시지"
                    success-message="성공메시지"
                    :default-value="null"
                />

                <TextField
                    id="phone-number"
                    type="select"
                    label="통신사 선택"
                    :hidden-label="null"
                    :maxlength="9999"
                    placeholder="소득구분 입력"
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

                <ButtonField
                    :id="null"
                    label="인증확인"
                    :hidden-label="null"
                    :maxlength="9999"
                    placeholder=""
                    :readonly="false"
                    :disabled="false"
                    :default-value="null"
                    button-text="전송"
                    cert
                    :timer="{ count: 3, unit: 'minute', format: 'm:ss' }"
                    :search="null"
                    name="cert"
                />

                <Textarea
                    placeholder="내용"
                    label="사업자 등록번호"
                    is-error=""
                    :readonly="false"
                    :disabled="false"
                    error-message="에러메시지"
                    success-message="성공메시지"
                />
            </div>

            <!-- 버튼케이스 -->
            <!-- <div>
                <BasicButton size="large">
                    버튼명 large
                </BasicButton>
                <BasicButton size="medium">
                    버튼명 mid
                </BasicButton>

                <BasicButton size="small">
                    버튼명 small
                </BasicButton>

                <BasicButton type="dialogBlue">
                    버튼명 dialog
                </BasicButton>

                <BasicButton type="dialogWhite">
                    버튼명 dialog
                </BasicButton>

                <BasicButton type="textBlue">
                    텍스트
                </BasicButton>

                <BasicButton type="textGray">
                    텍스트
                </BasicButton>
            </div> -->
        </div>
        <!-- <FixedBtnBox>
            <BasicButton size="large">
                버튼명 large
            </BasicButton>
            <BasicButton size="large">
                버튼명 large
            </BasicButton>
        </FixedBtnBox> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CheckList } from '@components/form/CheckBoxGroup.vue'
import type { AccordionListItem } from '@components/common/AccoItem.vue'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

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
export default class CardSubPage extends Vue {
    private accordionList: AccordionListItem[] = [
        {
            title: '아코디언 제목1',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목2',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목3',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목4',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목5',
            desc: '아코디언 내용내용..',
        },
        {
            title: '아코디언 제목6',
            desc: '아코디언 내용내용..',
        },
    ]
    private dropdownBoxList: DropdownBoxList = [
        { displayName: 'KT', value: 'kt', selected: true },
        { displayName: 'SKT', value: 'skt' },
        { displayName: 'LG U+', value: 'lguplus' },
        { displayName: 'KT알뜰폰', value: 'kt_sub' },
        { displayName: 'SKT알뜰폰', value: 'skt_sub' },
        { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
    ]

    private checkList: CheckList = [
        { value: 'policy', label: '개인정보처리방침 동의', checked: true },
        { value: 'uniq', label: '고유식별정보 처리동의' },
        { value: 'telecom', label: '통신사 이용약관 동의' },
        { value: 'cert', label: '본인확인 서비스 약관 동의' },
    ]

    private tabList = [{ name: 'first' }, { name: 'second' }, { name: 'third' }]

    // s: popup
    private show = false
    openPopup() {
        this.show = true
    }
    onConfirm() {
        this.show = false
    }

    onCancel() {
        console.log('after close modal')
    }
    // e: popup

    onChange(list: CheckList) {
        this.checkList = list
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

<style scoped></style>

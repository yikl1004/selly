<template>
    <div class="container">
        <div v-if="!!franchiseDetail" class="content franchisee-info-wrap">
            <div class="franchisee-info">
                <p>가맹점 번호 {{ $route.params.mcno }}</p>
                <strong>{{ franchiseDetail.mcNm }}</strong>
            </div>
            <div class="franchisee-modify-box">
                <!-- 주소 컴포넌트 사용하면 팝업이 안열림. 확인필요 -->
                <AddressField
                    v-if="!!addressItem"
                    id="franchiseAddress"
                    label="가맹점 주소"
                    :default-value="addressItem"
                    @change="onChangeAddress"
                />

                <TextField
                    v-if="!!prefixDigit.length"
                    id="phoneNumber"
                    type="select"
                    label="가맹점 연락처"
                    name="phoneNumber"
                    placeholder="가맹점 연락처 입력"
                    :maxlength="8"
                    :default-value="digit"
                    @change="digit = $event.value"
                />
                <!-- :list="prefixDigit"
                            :error-message="digitErrorMessage" -->
                <BulletList :list="list" />
            </div>
        </div>
        <portal to="floating">
            <BasicButton size="large" @click="updateDetail">수정</BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import axios from 'axios'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import type { AddressItem } from '@components/form/AddressField.vue'
import type { FranchiseDetail } from '@stores/modules/auth'
import type { AuthParameters } from '@services/auth'

// interface Data {
//     buttonField: string
//     calendarField: string
//     checkSingle: boolean
//     secretNumber: string
//     singleSelection: string
//     switchButton: boolean
//     textFieldPrimary: string
// }

const { Action, State, Mutation } = namespace('auth')

/**
 * @description
 * 가맹점 번호에 따른 가맹점 정보를 조회하여 화면을 출력
 * TODO: 가맹점 정보 조회 API가 따로 생길 예정, 그에 따른 수정 필요
 */
@Component
export default class FranchiseePage extends Vue {
    /** @Stores */
    @Action('getFranchiseDetail')
    readonly getFranchiseDetail!: (mcno: string) => Promise<void>

    @Action('updateFranchiseDetail')
    readonly updateFranchiseDetail!: (params: AuthParameters['changeFranchiseDetail']) => Promise<void>

    @State('franchiseDetail')
    readonly franchiseDetail!: FranchiseDetail

    @Mutation('deleteFranchiseDetail')
    readonly deleteFranchiseDetail!: Function

    /** @Data */

    /** 휴대폰 번호 앞자리 리스트 */
    private prefixDigit: DropdownBoxList = []

    /** 휴대폰 번호 앞자리 제외한 나머지 */
    // private digitBody = ''

    /** 휴대폰번호 에러 메세지 */
    // private digitErrorMessage = ''

    /** 전화번호 */
    private digit = ''

    /** 주소 정보 */
    private addressItem: Omit<AddressItem, 'fieldName'> | null = null

    /** @Methods */

    digitValidator(value: string) {
        return [7, 8].some(item => item === value.length)
    }

    onChangeAddress(value: AddressItem) {
        console.log('onChangeAddress', value)
        this.schema.franchiseAdress = this._.omit(value, 'fieldName')
    }

    updateDetail() {
        const phoneNumber = this.digit.replace(/(^\d{2,3})(\d{3,4})(\d{4}$)/gi, '$1-$2-$3').split('-')
        this.updateFranchiseDetail({
            mcno: this.franchiseDetail.mcno,
            bpsnoAdd: this.addressItem?.value,
            pnadd: this.addressItem?.road,
            psno: this.addressItem?.zipcode,
            ddd: phoneNumber[0],
            exno: phoneNumber[1],
            tlno: phoneNumber[2],
        })
    }

    /** @Lifecycle */

    async mounted() {
        const result = await axios.get('/assets/static/dummy/prefixDigit.json')
        const mcno = this.$route.params.mcno
        await this.getFranchiseDetail(mcno)

        this.prefixDigit = result.data
        this.digit = `${this.franchiseDetail.ddd}${this.franchiseDetail.exno}${this.franchiseDetail.tlno}`

        const { psno: zipcode, pnadd: road, bpsnoAdd: value } = this.franchiseDetail
        this.addressItem = { zipcode, road, value }
    }

    beforeDestroy() {
        this.deleteFranchiseDetail()
    }

    /** 개발 적용 전 */

    private list = [
        { text: '롯데카드에 등록된 가맹점 정보가 변경됩니다.' },
        {
            text: '가맹점 정보를 변경 시 마케팅. 대상 고객 수집에 시간이 소요되며, 변경 후 당일에는 마케팅 신청이 불가합니다.',
        },
    ]
    private schema: { [key: string]: object | number | string | boolean } = {
        franchiseAddress: '',
        phoneNumber: '',
    }

    formChange(data: Schema) {
        this.schema = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }
}
</script>

<style lang="scss" src="./Franchisee.scss"></style>

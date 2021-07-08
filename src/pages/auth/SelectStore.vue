<template>
    <div class="container">
        <div class="select-store-wrap">
            <div class="select-store">
                <div class="store-user-info">
                    <strong>
                        {{ workplaceOwnerName }} 사장님<br />
                        사업자정보를 확인하세요.
                    </strong>
                    <p>
                        현재 등록된 {{ workplaceList.length }}개의 사업자 가입이 가능합니다.<br />선택한 사업자만 셀리 서비스에 가입됩니다.
                    </p>
                </div>
                <div class="user-store-list">
                    <CheckBoxBlock
                        v-for="(item, index) in workplaceList"
                        :id="`userStoreList${index}`"
                        :key="`user-store-list-item-${index}`"
                        :label="convertBizNoFormatter({ bizNo: item.bzno })"
                        :biz-name="item.bzmanNm"
                        :index="index"
                        :checked="item.ltRgyn === 'Y'"
                        :disabled="item.locaMcYn === 'Y'"
                        name="group"
                        @change="onSelectBizNo"
                    />
                </div>
                <ButtonField
                    id="recommenderCode"
                    label="추천인 코드(선택)"
                    :maxlength="9999"
                    placeholder="추천인 코드 입력"
                    :readonly="false"
                    :disabled="false"
                    button-text="확인"
                    name="cert"
                    @search="onClickRecommenderCode"
                />
            </div>
            <portal to="floating">
                <BasicButton :disabled="!selectedWorkplace.length" size="large" @click="onNext">
                    다음
                </BasicButton>
            </portal>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { OnSelectValue } from '@components/form/CheckBoxBlock.vue'
import { AuthParameters, BizInfoItem } from '@services/auth'

const { Getter, Action } = namespace('auth')

@Component
export default class SelectStorePage extends Vue {
    /** @category Stores */
    @Getter('workplaceList') readonly workplaceList!: BizInfo['data']['list']
    @Getter('workplaceOwnerName') readonly workplaceOwnerName!: BizInfo['data']['mbrNm']
    @Getter('recommenderCodeMessage') readonly recommenderCodeMessage!: string
    @Action('inputRecommenderCode') readonly inputRecommenderCode!: (params: AuthParameters['recommenderCode']) => Promise<void>

    /** @category Data */

    // 선택된 사업장 정보
    private selectedWorkplace: BizInfoItem[] = []

    /** @category Watch */

    @Watch('workplaceList')
    changeWorkplaceList(value: BizInfo['data']['list'], oldValue: BizInfo['data']['list']) {
        this.selectedWorkplace = value.filter(item => item.ltRgyn === 'Y').map(({ bzno, ltRgyn }) => ({ bzno, ltRgyn }))
    }

    @Watch('recommenderCodeMessage')
    changeRecommenderCodeMessage(value: string, oldValue: string) {}

    /** @category Methods */
    onNext() {
        /**
         * 다음으로 이동
         * @event next
         */
        this.$emit('next', this.selectedWorkplace)
    }

    onSelectBizNo(data: OnSelectValue) {
        const originList = this.workplaceList
        const { bzno, ltRgyn } = originList[data.index]

        if (data.value) {
            this.selectedWorkplace.push({ bzno, ltRgyn })
        } else {
            this.selectedWorkplace.splice(data.index, 1)
        }
    }

    /**
     * FIXME: 수정 해야 함
     * 1. 체크박스가 없음 (디자인 추가 되어야 함)
     * 2. API가 명확하지 않음
     * 3. 메세징 처리 (Watch: changeRecommenderCodeMessage 메서드 만들다 말았음)
     */
    async onClickRecommenderCode(rfnSn: string) {
        await this.inputRecommenderCode({ rfnSn })
    }

    /** @category Life-Cycle */

    mounted() {}
}
</script>
<style scoped lang="scss" src="./SelectStore.scss"></style>

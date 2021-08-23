<template>
    <div class="content pd-btm">
        <div class="select-store-wrap">
            <div class="select-store">
                <div class="store-user-info">
                    <strong>
                        {{ workplaceOwnerName }} 사장님<br />
                        사업자정보를 확인하세요.
                    </strong>

                    <p>
                        가입을 원하지 않는 사업자의 경우 체크를 해지 해주세요.
                        <br />
                        (정 사업자의 경우는 체크해지가 불가 합니다.)
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
            </div>

            <div v-if="isFirstJoin" class="recommender-box">
                <CheckBox
                    id="recommenderCheck"
                    label="추천인이 있으시면 체크해주세요. (선택)"
                    @change="openRecommendArea"
                />
                <ButtonField
                    v-if="recommendAreaOpen"
                    id="recommenderCode"
                    label="추천인 코드(선택)"
                    placeholder="추천인 코드 입력"
                    button-text="확인"
                    name="cert"
                    :maxlength="9999"
                    :hidden-label="true"
                    :readonly="false"
                    :disabled="false"
                    @search="onClickRecommenderCode"
                />
            </div>
        </div>
        <portal to="floating">
            <BasicButton
                :disabled="!selectedWorkplace.length"
                size="large"
                @click="onNext"
            >
                확인
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { OnSelectValue } from '@components/form/CheckBoxBlock.vue'
import type { BizInfoItem, BusinessPlaceListItem } from '@services/auth'
import { AuthModule } from '@stores/modules/auth'

@Component
export default class SelectStorePage extends Vue {
    /** @Props */

    /** @Stores */
    get workplaceOwnerName() {
        return AuthModule.workplaceOwnerName
    }

    get recommenderCodeMessage() {
        return AuthModule.recommenderCodeMessage
    }

    /** 사업장 리스트 */
    get workplaceList() {
        return AuthModule.workplaceList
    }

    /** @Data */
    private recommendAreaOpen = false

    // 선택된 사업장 정보
    private selectedWorkplace: BizInfoItem[] = []

    /** @Watch */

    @Watch('workplaceList')
    changeWorkplaceList(
        value: BusinessPlaceListItem[],
        /* oldValue: BusinessPlaceListItem[] */
    ) {
        this.selectedWorkplace = value
            .filter(item => item.ltRgyn === 'Y')
            .map(({ bzno, ltRgyn }) => ({ bzno, ltRgyn }))
    }

    /** @Computed */
    get isFirstJoin(): boolean {
        return this.$route.name === 'Join'
    }

    /** @Methods */
    onNext() {
        /**
         * 다음으로 이동
         * @event next
         */
        this.$emit('next', this.selectedWorkplace)
    }

    onSelectBizNo(data: OnSelectValue) {
        const originList = this.workplaceList
        if (originList.length) {
            const { bzno, ltRgyn } = originList[data.index]

            if (data.value) {
                this.selectedWorkplace.push({ bzno, ltRgyn })
            } else {
                this.selectedWorkplace.splice(data.index, 1)
            }
        }
    }

    /**
     * FIXME: 수정 해야 함
     * 1. 체크박스가 없음(디자인 추가 되어야 함 )
     * 2. API가 명확하지 않음
     * 3. 메세징 처리 (Watch: changeRecommenderCodeMessage 메서드 만들다 말았음)
     */
    async onClickRecommenderCode(rfnSn: string) {
        await AuthModule.inputRecommenderCode({ rfnSn })
    }

    openRecommendArea(event: {
        value?: string
        index: number
        fieldName: string
    }) {
        this.recommendAreaOpen = !!event.value
    }

    /** @Lifecycle */
}
</script>
<style scoped lang="scss" src="./SelectStore.scss"></style>

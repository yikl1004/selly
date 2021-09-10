<template>
    <div class="content pd-btm">
        <div class="select-store-wrap">
            <div class="select-store">
                <div v-if="type === 'addBusiness'" class="store-user-info">
                    <strong>
                        {{ workplaceOwnerName }} 사장님<br />사업자정보를
                        확인하세요.
                    </strong>
                    <p>
                        롯데카드에 등록된 사업자는 해지를 할 수 없습니다.<br />서비스를
                        이용하지 않는 사업자는 체크를 해지해주세요.
                    </p>
                </div>

                <div v-else class="store-user-info">
                    <strong>
                        {{ workplaceOwnerName }} 사장님<br />아래 사업자 정보로
                        회원가입이<br />완료되었습니다.
                    </strong>

                    <p>
                        가입을 원하지 않는 사업자의 경우 체크를 해지
                        해주세요.<br />(정 사업자의 경우는 체크해지가 불가
                        합니다.)
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
            <RecommenderBox
                v-if="isFirstJoin"
                @check="openRecommendArea"
                @search="onClickRecommenderCode"
            />
        </div>
        <portal to="floating">
            <BasicButton
                :disabled="!selectedWorkplace.length"
                size="large"
                @click="onNext"
            >
                {{ type === 'addBusiness' ? '저장' : '확인' }}
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { OnSelectValue } from '@components/form/CheckBoxBlock.vue'
import type { BizInfoItem, BusinessPlaceListItem } from '@services/auth'
import { AuthModule } from '@stores/modules/auth'

@Component
export default class SelectStorePage extends Vue {
    /** @Props */
    /** 디자인용 prop */
    @Prop({ type: String })
    readonly type!: string

    /** 사업장 대표명 */
    get workplaceOwnerName() {
        return AuthModule.workplaceOwnerName
    }

    /** 추천인 코드 확인 결과 메세지 */
    get recommenderCodeMessage() {
        return AuthModule.recommenderCodeMessage
    }

    /** 사업장 리스트 */
    get workplaceList() {
        return AuthModule.workplaceList
    }

    private recommendAreaOpen = false

    // 선택된 사업장 정보
    private selectedWorkplace: BizInfoItem[] = []

    /** 사업장 리스트 변경 시 */
    @Watch('workplaceList')
    changeWorkplaceList(
        value: BusinessPlaceListItem[],
        /* oldValue: BusinessPlaceListItem[] */
    ) {
        this.selectedWorkplace = value
            .filter(item => item.ltRgyn === 'Y')
            .map(({ bzno, ltRgyn }) => ({ bzno, ltRgyn }))
    }

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

    /** 추천인 코드 확인 버튼 클릭 */
    async onClickRecommenderCode(rfnSn: string) {
        await AuthModule.inputRecommenderCode({ rfnSn })
    }

    /** 추천인 코드 입력 활성화 체크 */
    openRecommendArea(event: {
        value?: string
        index: number
        fieldName: string
    }) {
        this.recommendAreaOpen = !!event.value
    }
}
</script>
<style scoped lang="scss" src="./SelectStore.scss"></style>

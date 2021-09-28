<template>
    <Page floating :footer="false">
        <Header type="sub" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="1" :count="3" />
                <Title title="매장 정보 확인" />

                <div class="box-franchisee-list" :class="{ active: isActive }">
                    <div class="franchisee-list">
                        <ul>
                            <li
                                v-for="(item, index) in franchiseInfoListData"
                                :key="`franchise-list-${index}`"
                            >
                                <Radio
                                    :id="`franchise-list-${index}`"
                                    name="franchise-list"
                                    :label="item.mcNm"
                                    :value="item.mcno"
                                    :checked="index === 0"
                                    @change="onChangeFranchiseSelect($event)"
                                />
                            </li>
                        </ul>
                    </div>
                    <!--[D] 더보기 클릭시 더보기버튼 비노출-->
                    <BasicButton
                        v-if="franchiseInfoListData.length > 5"
                        type="more"
                        @click="onMore"
                    >
                        더보기
                    </BasicButton>
                </div>

                <div v-if="franchiseInfoItemData" class="box-franchisee-info">
                    <ul>
                        <li>
                            <strong>가맹점번호</strong>
                            <p>
                                <span>
                                    {{ franchiseInfoItemData.mcno }}
                                    -
                                    {{ franchiseInfoItemData.mcNm }}
                                </span>
                            </p>
                        </li>
                        <li>
                            <strong>주소</strong>
                            <p>
                                <span>{{ franchiseInfoItemData.psno }}</span>
                                <span>
                                    {{ franchiseInfoItemData.mcAdd }}
                                </span>
                            </p>
                        </li>
                        <li>
                            <strong>전화번호</strong>
                            <p>
                                <span>{{ franchiseInfoItemData.tlno }}</span>
                            </p>
                        </li>
                    </ul>
                    <div
                        v-if="franchiseInfoItemData.aplPsYn === 'Y'"
                        class="btn-area"
                    >
                        <BasicButton type="textBlue" @click="toBusiness">
                            매장 정보 변경하기
                        </BasicButton>
                    </div>
                </div>
                <BulletList :list="infoList" />
            </div>

            <portal to="floating">
                <BasicButton size="large" @click="nextStep"> 다음 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import {
    NewMarketingModule,
    NewMarketingState,
} from '@stores/modules/newMarketing'
import { Path } from '@router/routes'

@Component
export default class StepFirstPage extends Mixins(PageView) {
    /** 더보기 */
    private isActive = false

    /** 주의사항 */
    private infoList = [
        {
            text:
                '매장 정보를 변경할 경우 변경일 3일 이후부터 신청 가능합니다.',
        },
    ]

    /** 가맹점 정보 리스트 */
    get franchiseInfoListData() {
        return NewMarketingModule.franchiseInfoListData
    }

    /** 선택된 가맹점 정보 */
    get franchiseInfoItemData() {
        return NewMarketingModule.franchiseInfoItemData
    }

    /** 가맹점 정보 저장 결과 */
    get franchiseInfoSaveResult() {
        return NewMarketingModule.franchiseInfoSaveResult
    }

    @Watch('franchiseInfoSaveResult')
    changeFranchiseInfoSaveResult(
        value: NewMarketingState['franchiseInfoSave'],
    ) {
        if (value && value.rc === '0000') {
            this.$router.push(Path.NewMarketingStepSecond)
        } else {
            // TODO: 메세징 처리
        }
    }

    /**
     * 가맹점 라디오버튼 선택시
     * @param {string} value
     */
    onChangeFranchiseSelect(value: string) {
        const selectedIndex = this.getSelectedFranchiseList(value)

        if (selectedIndex > -1) {
            NewMarketingModule.setFranchiseInfo(selectedIndex)
        }
    }

    /** 사업자 정보 페이지로 이동 */
    toBusiness() {
        this.$router.push(Path.Business)
    }

    /** 다음 버튼 */
    async nextStep() {
        // nothing
        await NewMarketingModule.setFranchiseInfoSave()
    }

    /* 더보기 버튼 액션 */
    onMore() {
        this.isActive = true
    }

    /** 선택된 가맹점 */
    getSelectedFranchiseList(mcno: string) {
        return this.franchiseInfoListData.findIndex(item => item.mcno === mcno)
    }

    async mounted() {
        /** 가맹점 정보 호출 */
        await NewMarketingModule.getFranchiseInfo()
        /** 초기값 세팅 */
        NewMarketingModule.setFranchiseInfo(0)
    }
}
</script>

<style lang="scss" scoped src="./StepFirst.scss"></style>

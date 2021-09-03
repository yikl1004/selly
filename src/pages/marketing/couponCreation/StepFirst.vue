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
                                v-for="(item, index) in franchiseList"
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
                        v-if="franchiseList.length > 5"
                        type="more"
                        @click="onMore"
                    >
                        더보기
                    </BasicButton>
                </div>

                <div v-if="selectedFranchiseList" class="box-franchisee-info">
                    <ul>
                        <li>
                            <strong>매장 번호</strong>
                            <p>
                                <span>
                                    {{ selectedFranchiseList.mcNm }}
                                    {{ selectedFranchiseList.mcno }}
                                </span>
                            </p>
                        </li>
                        <li>
                            <strong>주소</strong>
                            <p>
                                <!-- <span>03272</span> -->
                                <span>
                                    {{ selectedFranchiseList.mcAdd }}
                                </span>
                            </p>
                        </li>
                        <li>
                            <strong>전화번호</strong>
                            <p>
                                <span>{{ selectedFranchiseList.mcTlno }}</span>
                            </p>
                        </li>
                    </ul>
                    <div class="btn-area">
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
import { Component, Mixins } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import { MarketingModule } from '@stores/modules/marketing'

@Component
export default class MarketingApply extends Mixins(PageView) {
    /* 더보기버튼 */
    private isActive = false

    /** 주의사항 */
    private infoList = [
        {
            text:
                '매장 정보를 변경할 경우 변경일 3일 이후부터 신청 가능합니다.',
        },
    ]

    /** 선택된 가맹점 번호 */
    private selectedMcNo = ''

    /** 다음 버튼 비활성화 여부 */
    private nextDisabled = true

    /** 가맹점 리스트 */
    get franchiseList() {
        return MarketingModule.franchiseList
    }

    /** 선택된 가맹점 */
    get selectedFranchiseList() {
        return this.franchiseList.find(item => item.mcno === this.selectedMcNo)
    }

    /** 선택된 가맹점에 대한 유효성 검사 결과 */
    // get

    /** 사업자 정보 페이지로 이동 */
    toBusiness() {
        this.$router.push({ name: 'Business' })
    }

    /* 더보기 버튼 액션 */
    onMore() {
        this.isActive = true
    }

    onChangeFranchiseSelect(value: string) {
        this.selectedMcNo = value
    }

    async nextStep() {
        await MarketingModule.getValidatePossibleApplyFranchiseList({
            mcno: this.selectedMcNo,
        })
        this.openModal('3102')
    }

    /**
     * @param {string} value
     * 3101: 유해업종
     * 3102: 접속당일 가맹점 정보 변경
     * 3103: 위도/경도 정보 없음)
     */
    openModal(value: '3101' | '3102' | '3103') {
        console.log(value)
        // this.$modal.open({
        // })
    }
    /** @Lifecycle */
    async created() {
        await MarketingModule.getPossibleApplyFranchiseList()
        const list = this.franchiseList
        this.selectedMcNo = list.length ? list[0].mcno : ''
    }

    // mounted() {}
}
</script>

<style lang="scss" scoped src="./StepFirst.scss"></style>

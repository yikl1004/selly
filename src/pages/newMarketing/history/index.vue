<template>
    <Page floating>
        <Header type="sub" title="신청내역" />
        <!--[D] 신청내역 없을 시 floating 클래스 삭제 / .content에 no-result-wrap 클래스 추가 / floating 버튼 삭제 필요-->
        <PageBody class="floating">
            <div class="content">
                <!--[D] 신청내역 없을 시 no-result-wrap 추가 -->
                <DropdownBox
                    id="dropdown-box01"
                    label="매장 선택"
                    :hidden-label="true"
                    :list="franchiseSelectList"
                    :default-value="''"
                    :disabled="false"
                    @select="onSelectFranchise"
                />

                <!-- s: 신청내역 없음-->
                <template v-if="!applyList.length">
                    <CautionBox description="신청내역이 없습니다." />
                    <MarketingBanner />
                </template>

                <div v-else class="coupon-list">
                    <Anchor
                        v-for="(item, index) in applyList"
                        :key="`coupon-box-${index}`"
                        class="coupon-box"
                        :class="getTypeStyleClass(item.mrktStcNm)"
                        :href="{
                            name: 'CouponDetail',
                            query: {
                                mrktCtsSeq: item.mrktCtsSeq,
                            },
                        }"
                    >
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                {{ item.mcNm }}
                            </strong>
                            <p class="coupon-name">
                                {{ item.mrktBnfCn }}
                            </p>
                            <span class="date">
                                {{ $dayjs(item.evSdt).format('YYYY.MM.DD') }}
                                ~
                                {{ $dayjs(item.evEdt).format('YYYY.MM.DD') }}
                            </span>
                            <i class="flag">{{ item.mrktStcNm }}</i>
                        </div>
                    </Anchor>
                </div>

                <BasicButton type="more" @click="onMore"> 더보기 </BasicButton>
            </div>

            <portal to="floating">
                <BasicButton size="large" @click="toCouponCreate">
                    쿠폰 만들기 신청
                </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarketingBanner from '@components/marketing/MarketingBanner.vue'
import { MktStatementModule } from '@stores/modules/mktStatement'
import { Path } from '@router/routes'
import type { MarketingStatusText } from '@services/mktStatement.interface'
// import type { MarketingStatus } from '@services/marketing'

@Component({
    components: { MarketingBanner },
})
export default class MarketingHistory extends Vue {
    // 가맹점 선택 리스트
    private franchiseSelectList: DropdownBoxList = []

    /** 가맹점 리스트 */
    get franchiseList() {
        return MktStatementModule.franchiseList
    }

    /** 신청내역 리스트 */
    get applyList() {
        return MktStatementModule.applyList
    }

    /** 신청내역 리스트 현재 페이지 번호 */
    get pageNo() {
        return MktStatementModule.currentHistoryPageNo
    }

    /** 진행상태 별 스타일 */
    getTypeStyleClass(value: MarketingStatusText): string {
        const cases = {
            접수완료: 'type01',
            준비중: 'type02',
            진행예정: 'type03',
            진행중: 'type04',
            종료: 'type05',
            '재검토 필요': 'type06',
            취소: '',
            default: '',
        }

        return cases[value || 'default']
    }

    /** 더보기 */
    onMore() {
        const selectedItem = this.franchiseSelectList.find(
            item => item.selected,
        ) as BottomSheetOptionItem

        MktStatementModule.getApplyHistory({
            mcno: selectedItem.value || '',
            psPagNo: this.pageNo,
        })
    }

    /** 매장 선택 */
    onSelectFranchise(value: string) {
        MktStatementModule.selectFranchiseList(value)
    }

    /** 쿠폰 만들기로 이동 */
    toCouponCreate() {
        this.$router.push(Path.MarketingGuide)
    }

    async mounted() {
        await MktStatementModule.getInitialApplyHistory()

        this.franchiseSelectList = this.franchiseList
    }
}
</script>

<style lang="scss" scoped src="./MarketingHistory.scss"></style>

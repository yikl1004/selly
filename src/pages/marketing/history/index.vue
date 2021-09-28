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
                <template v-if="!statementListData.length">
                    <CautionBox description="신청내역이 없습니다." />
                    <MarketingBanner />
                </template>

                <div v-else class="coupon-list">
                    <Anchor
                        v-for="(item, index) in statementListData"
                        :key="`coupon-box-${index}`"
                        class="coupon-box"
                        :class="getTypeStyleClass(item.mrktStc)"
                        :href="{
                            name: 'CouponDetail',
                            query: {
                                mrktCtsSeq: item.mrktCtsSeq,
                                mrktStc: item.mrktStc,
                            },
                        }"
                    >
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                {{ item.mcNm }}
                            </strong>
                            <p class="coupon-name">
                                [{{ item.ggDNm }}] {{ item.mrktBnfCn }}
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

                <BasicButton
                    v-if="statementListMoreYn"
                    type="more"
                    @click="onMore"
                >
                    더보기
                </BasicButton>
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
import type { MarketingStatus } from '@services/marketing'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

@Component({
    components: { MarketingBanner },
})
export default class MarketingHistory extends Vue {
    // 가맹점 선택 리스트
    private franchiseSelectList: DropdownBoxList = []

    // get Path() {
    //     return Path.
    // }

    get appliedFranchiseListData() {
        return MktStatementModule.appliedFranchiseListData
    }

    get statementListData() {
        return MktStatementModule.statementListData
    }

    get statementListPageNo() {
        return MktStatementModule.statementListPageNo
    }

    get statementListMoreYn() {
        return MktStatementModule.statementListMoreYn
    }

    /** 진행상태 별 스타일 */
    getTypeStyleClass(value: MarketingStatus): string {
        const cases = {
            // 접수완료
            '01': 'type01',
            // 준비중
            '02': 'type02',
            // 진행예정
            '03': 'type03',
            // 진행중
            '04': 'type04',
            // 종료
            '05': 'type05',
            // 재검토 필요
            '08': 'type06',
            // 취소
            '09': '',
            default: '',
        }

        return cases[value]
    }

    /** 더보기 */
    onMore() {
        const selectedItem = this.franchiseSelectList.find(
            item => item.selected,
        ) as BottomSheetOptionItem

        MktStatementModule.getStatementList({
            mcno: selectedItem.value,
            pageNo: this.statementListPageNo,
        })
    }

    /** 매장 선택 */
    onSelectFranchise(value: string) {
        const selectedItem = this.franchiseSelectList.find(
            item => item.value === value,
        ) as BottomSheetOptionItem
        console.log(selectedItem)

        MktStatementModule.getStatementList({
            mcno: selectedItem.value,
            // pageNo: '',
        })
    }

    /** 쿠폰 만들기로 이동 */
    toCouponCreate() {
        this.$router.push(Path.MarketingGuide)
    }

    async mounted() {
        await Promise.all([
            MktStatementModule.getAppliedFranchiseList(),
            MktStatementModule.getStatementList(),
        ])

        this.franchiseSelectList = ([
            {
                displayName: '전체',
                value: '',
                selected: true,
            },
        ] as DropdownBoxList).concat(
            this.appliedFranchiseListData.map(item => {
                return {
                    displayName: item.mcNm,
                    value: item.mcno,
                }
            }),
        )
    }
}
</script>

<style lang="scss" scoped src="./MarketingHistory.scss"></style>

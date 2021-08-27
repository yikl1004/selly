<template>
    <Page floating>
        <Header type="sub" title="신청내역" />
        <!--[D] 신청내역 없을 시 floating 클래스 삭제 / .content에 no-result-wrap 클래스 추가 / floating 버튼 삭제 필요-->
        <PageBody class="floating">
            <div class="content">
                <!--[D] 신청내역 없을 시 no-result-wrap 추가 -->
                <FormProvider
                    :schema="data"
                    @change="formChange"
                    @submit="onSubmit"
                >
                    <template slot-scope="{ schema }">
                        <DropdownBox
                            id="dropdown-box01"
                            label="매장 선택"
                            :hidden-label="true"
                            :list="dropdownBoxList"
                            :default-value="schema.dropdownBox"
                            :disabled="false"
                        />
                    </template>
                </FormProvider>

                <!-- s: 신청내역 없음-->
                <CautionBox description="신청내역이 없습니다." />
                <MarketingBanner />
                <!-- e: 신청내역 없음-->

                <div class="coupon-list">
                    <!--
                            type01 : 접수완료
                            type02 : 준비중
                            type03 : 진행예정
                            type04 : 진행중
                            type05 : 종료
                            type06 : 재검토 필요
                        -->
                    <Anchor class="coupon-box type01">
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                이층집 강남점 한줄말줄임처리이층집 강남점
                                한줄말줄임처리이층집 강남점 한줄말줄임처리
                            </strong>
                            <p class="coupon-name">
                                [첫 고객 만들기] 5% 결제일 할인
                            </p>
                            <span class="date">2021.06.01 ~2021.06.30</span>
                            <i class="flag">접수완료</i>
                        </div>
                    </Anchor>
                    <Anchor class="coupon-box type02">
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                이층집 강남점
                            </strong>
                            <p class="coupon-name">
                                [첫 고객 만들기] 5% 결제일 할인
                            </p>
                            <span class="date">2021.06.01 ~2021.06.30</span>
                            <i class="flag">준비중</i>
                        </div>
                    </Anchor>

                    <Anchor class="coupon-box type03">
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                이층집 강남점
                            </strong>
                            <p class="coupon-name">
                                [첫 고객 만들기] 5% 결제일 할인
                            </p>
                            <span class="date">2021.06.01 ~2021.06.30</span>
                            <i class="flag">진행예정 (D-3)</i>
                        </div>
                    </Anchor>

                    <Anchor class="coupon-box type04">
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                이층집 강남점
                            </strong>
                            <p class="coupon-name">
                                [첫 고객 만들기] 5% 결제일 할인
                            </p>
                            <span class="date">2021.06.01 ~2021.06.30</span>
                            <i class="flag">진행중</i>
                        </div>
                    </Anchor>

                    <Anchor class="coupon-box type05">
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                이층집 강남점
                            </strong>
                            <p class="coupon-name">
                                [첫 고객 만들기] 5% 결제일 할인
                            </p>
                            <span class="date">2021.06.01 ~2021.06.30</span>
                            <i class="flag">종료</i>
                        </div>
                    </Anchor>

                    <Anchor class="coupon-box type06">
                        <div class="coupon-inner">
                            <strong class="franchisee-name">
                                이층집 강남점
                            </strong>
                            <p class="coupon-name">
                                [첫 고객 만들기] 5% 결제일 할인
                            </p>
                            <span class="date">2021.06.01 ~2021.06.30</span>
                            <i class="flag">재검토 필요</i>
                        </div>
                    </Anchor>
                </div>

                <BasicButton type="more"> 더보기 </BasicButton>
            </div>

            <portal to="floating">
                <BasicButton size="large">쿠폰 만들기 신청</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import MarketingBanner from '@components/marketing/MarketingBanner.vue'

@Component({
    components: { MarketingBanner },
})
export default class MarketingHistory extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        {
            displayName: 'LOCA MONEY:BIZ 7*3*',
            value: 'LOCA MONEY:BIZ 7*3*',
            selected: true,
        },
        {
            displayName: '가장최근에 받은 카드가 디폴트로 노출',
            value: '가장최근에 받은 카드가 디폴트로 노출',
        },
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

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }
}
</script>

<style lang="scss" scoped src="./MarketingHistory.scss"></style>

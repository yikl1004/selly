<template>
    <Page>
        <Header type="sub" title="내 주변 매출" />
        <PageBody>
            <div class="content pd-btm">
                <FormProvider
                    :schema="data"
                    @change="formChange"
                    @submit="onSubmit"
                >
                    <template slot-scope="{ schema }">
                        <div class="box-around-store">
                            <div class="title">
                                <h2>
                                    내 주변 업종의<br />매출을 확인해보세요.
                                </h2>
                                <p>2021년 5월 결제 기준입니다.</p>
                            </div>

                            <DropdownBox
                                id="dropdown-box01"
                                label="매장 선택"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                hidden-label
                            />
                            <div class="box-store-info">
                                <p class="sectors">제과점 / 아이스크림점</p>
                                <strong>월 평균 매출 1,980,000원</strong>
                                <BulletList :list="infoList" />
                            </div>
                        </div>
                        <div class="store-info-wrap">
                            <ButtonField
                                id="areaSearch"
                                name="search"
                                label="지역 선택"
                                button-text="검색"
                                placeholder="서초동"
                                @search="openMapArea"
                            />

                            <DropdownBox
                                id="dropdown-box01"
                                label="업종 선택"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                            />

                            <div class="franchisee-info-wrap">
                                <div class="box-franchisee-info">
                                    <div class="total">
                                        <span>총 매장</span>
                                        <strong>240개</strong>
                                    </div>
                                    <ul>
                                        <li>
                                            <span>전월 대비 : </span>
                                            <strong class="up">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">상승</span>
                                                </i>
                                            </strong>
                                        </li>
                                        <li>
                                            <span>전년 대비 : </span>
                                            <strong class="down">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">하락</span>
                                                </i>
                                            </strong>
                                        </li>
                                    </ul>
                                </div>
                                <div class="box-franchisee-info">
                                    <div class="total">
                                        <span>신규 매장</span>
                                        <strong>240개</strong>
                                    </div>
                                    <ul>
                                        <li>
                                            <span>전월 대비 : </span>
                                            <strong class="up">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">상승</span>
                                                </i>
                                            </strong>
                                        </li>
                                        <li>
                                            <span>전년 대비 : </span>
                                            <strong class="down">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">하락</span>
                                                </i>
                                            </strong>
                                        </li>
                                    </ul>
                                </div>
                                <div class="box-franchisee-info">
                                    <div class="total">
                                        <span>폐업 매장</span>
                                        <strong>240개</strong>
                                    </div>
                                    <ul>
                                        <li>
                                            <span>전월 대비 : </span>
                                            <!--[D] 상승 : up / 감소 : down / 유지 : 클래스없이 0% 노출-->
                                            <strong class="up">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">상승</span>
                                                </i>
                                            </strong>
                                        </li>
                                        <li>
                                            <span>전년 대비 : </span>
                                            <strong class="down">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">하락</span>
                                                </i>
                                            </strong>
                                        </li>
                                    </ul>
                                </div>

                                <div class="box-franchisee-info avg-month">
                                    <div class="total">
                                        <span>월 평균 매출</span>
                                        <strong class="price">
                                            1,145,500,000원
                                        </strong>
                                    </div>
                                    <ul>
                                        <li>
                                            <span>전월 대비 : </span>
                                            <!--[D] 상승 : up / 감소 : down / 유지 : 클래스없이 0% 노출-->
                                            <strong class="up">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">상승</span>
                                                </i>
                                            </strong>
                                        </li>
                                        <li>
                                            <span>전년 대비 : </span>
                                            <strong class="down">
                                                22%
                                                <i class="ico">
                                                    <span class="ir">하락</span>
                                                </i>
                                            </strong>
                                        </li>
                                    </ul>
                                    <div class="my-store-sales">
                                        <p>
                                            동일 업종 평균 대비 내 매장
                                            매출입니다.
                                        </p>
                                        <strong class="price up">
                                            234,000원
                                            <i class="ico">
                                                <span class="ir">
                                                    상승 / 감소
                                                </span>
                                            </i>
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <Title title="요일별 매출" type="h4" />
                            <div class="chart-box">
                                <div class="txt-total">
                                    <strong>
                                        "일요일<span>이 가장 많아요</span>"
                                    </strong>
                                </div>
                                <ConvertPie
                                    :datas="weekUser"
                                    :labels="weekPeriod"
                                    :chartMax="true"
                                />
                                <GenTable
                                    name="test"
                                    :cols="[33, 33, 'auto']"
                                    :heads="['구분', '이용고객수', '비율']"
                                    :contents="[
                                        ['남', '100', '30%'],
                                        ['남', '100', '30%'],
                                        ['남', '100', '30%'],
                                        ['남', '100', '30%'],
                                        ['남', '100', '30%'],
                                        ['남', '100', '30%'],
                                    ]"
                                />
                                <!-- <div class="tbl-chart">
                                    <div class="table-box">
                                        <div class="table-scroll">
                                            <table>
                                                <caption>
                                                    요일, 결제 건수, 비율로
                                                    구성된 구성된 표입니다.
                                                </caption>
                                                <colgroup>
                                                    <col style="width: 33%" />
                                                    <col style="width: 33%" />
                                                    <col style="width: 33%" />
                                                    <col />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            요일
                                                        </th>
                                                        <th scope="col">
                                                            결제 건수
                                                        </th>
                                                        <th scope="col">
                                                            비율
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="t-center">
                                                            일
                                                        </td>
                                                        <td class="t-center">
                                                            3,140
                                                        </td>
                                                        <td class="t-center">
                                                            40%
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> -->
                                <BasicButton type="more"> 더보기 </BasicButton>
                            </div>

                            <Title title="시간대별 매출" type="h4" />
                            <div class="chart-box">
                                <div class="txt-total">
                                    <strong>
                                        "12사~15시<span>
                                            사이에 가장 많아요</span
                                        >"
                                    </strong>
                                </div>
                                <ConvertPie
                                    :datas="weekUseSale"
                                    :labels="weekUsePeriod"
                                    :chartMax="true"
                                />
                                <div class="tbl-chart">
                                    <div class="table-box">
                                        <div class="table-scroll">
                                            <table>
                                                <caption>
                                                    요일, 결제 건수, 비율로
                                                    구성된 표입니다.
                                                </caption>
                                                <colgroup>
                                                    <col style="width: 33%" />
                                                    <col style="width: 33%" />
                                                    <col style="width: 33%" />
                                                    <col />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            요일
                                                        </th>
                                                        <th scope="col">
                                                            결제 건수
                                                        </th>
                                                        <th scope="col">
                                                            비율
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="t-center">
                                                            일
                                                        </td>
                                                        <td class="t-center">
                                                            3,140
                                                        </td>
                                                        <td class="t-center">
                                                            40%
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <BasicButton type="more"> 더보기 </BasicButton>
                            </div>

                            <Title title="성별 매출" type="h4" />
                            <div class="chart-box">
                                <div class="txt-total">
                                    <strong>
                                        "남성<span> 고객이 많아요</span>"
                                    </strong>
                                </div>
                                <ConvertDoughnut
                                    :datas="genderUser"
                                    :labels="gender"
                                    chartMax
                                />
                                <div class="tbl-chart">
                                    <div class="table-box">
                                        <div class="table-scroll">
                                            <table>
                                                <caption>
                                                    요일, 결제 건수, 비율로
                                                    구성된 표입니다.
                                                </caption>
                                                <colgroup>
                                                    <col style="width: 33%" />
                                                    <col style="width: 33%" />
                                                    <col />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            요일
                                                        </th>
                                                        <th scope="col">
                                                            결제 건수
                                                        </th>
                                                        <th scope="col">
                                                            비율
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="t-center">
                                                            일
                                                        </td>
                                                        <td class="t-center">
                                                            3,140
                                                        </td>
                                                        <td class="t-center">
                                                            40%
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <BasicButton type="more"> 더보기 </BasicButton>
                            </div>

                            <Title title="연령대별 매출" type="h4" />
                            <div class="chart-box">
                                <div class="txt-total">
                                    <strong>
                                        "12사~15시<span>
                                            사이에 가장 많아요</span
                                        >"
                                    </strong>
                                </div>
                                <ConvertDoughnut
                                    :datas="ageGroupsUser"
                                    :labels="ageGroups"
                                    chartMax
                                />
                                <div class="tbl-chart">
                                    <div class="table-box">
                                        <div class="table-scroll">
                                            <table>
                                                <caption>
                                                    요일, 결제 건수, 비율로
                                                    구성된 표입니다.
                                                </caption>
                                                <colgroup>
                                                    <col style="width: 33%" />
                                                    <col style="width: 33%" />
                                                    <col />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            요일
                                                        </th>
                                                        <th scope="col">
                                                            결제 건수
                                                        </th>
                                                        <th scope="col">
                                                            비율
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="t-center">
                                                            일
                                                        </td>
                                                        <td class="t-center">
                                                            3,140
                                                        </td>
                                                        <td class="t-center">
                                                            40%
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <BasicButton type="more"> 더보기 </BasicButton>
                            </div>
                        </div>
                    </template>
                </FormProvider>

                <MarketingBanner />
            </div>

            <!--[D] 쿠폰 미리보기 팝업 -->
            <FullPopup
                :show.sync="popMapArea"
                title="지역 선택"
                type="popup"
                :button-text="{ confirm: '선택 완료' }"
                @confirm="onMapAreaConfirm"
            >
                <PopupMapArea mcAdmdC="1126060000" />
            </FullPopup>
            <!--//[D] 쿠폰 미리보기 팝업 -->
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarketingBanner from '@components/marketing/MarketingBanner.vue'
import PopupMapArea from '@components/marketing/PopupMapArea.vue'
import GenTable from '@components/common/GenTable.vue'
import ConvertPie from '@components/common/ConvertPie.vue'
import ConvertDoughnut from '@components/common/ConvertDoughnut.vue'
import type { Schema } from '@components/form/FormProvider.vue'

@Component({
    components: {
        MarketingBanner,
        PopupMapArea,
        GenTable,
        ConvertPie,
        ConvertDoughnut,
    },
})
export default class MarketingApply extends Vue {
    // s: popup 지역선택
    private popMapArea = false
    openMapArea() {
        this.popMapArea = true
    }
    onMapAreaConfirm() {
        this.popMapArea = false
    }
    // e: popup 지역선택

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

    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        // {
        //     displayName: 'LOCA MONEY:BIZ 7*3*',
        //     value: 'LOCA MONEY:BIZ 7*3*',
        //     selected: true,
        // },
        // {
        //     displayName: '가장최근에 받은 카드가 디폴트로 노출',
        //     value: '가장최근에 받은 카드가 디폴트로 노출',
        // },
        {
            displayName: '11111111',
            value: '11111111',
        },
        {
            displayName: '22222222',
            value: '22222222',
        },
        {
            displayName: '333333',
            value: '333333',
        },
        {
            displayName: '4444444',
            value: '4444444',
        },
        {
            displayName: '5555555',
            value: '5555555',
        },
        {
            displayName: '6666666',
            value: '6666666',
        },
        {
            displayName: '77777777',
            value: '77777777',
        },
        {
            displayName: '88888888',
            value: '88888888',
        },
        {
            displayName: '9999999',
            value: '9999999',
        },
    ]
    //차트 목업
    private weekPeriod = ['월', '화', '수', '목', '금', '토', '일']
    private weekUser = [10, 20, 10, 10, 20, 10, 30]
    private weekUsePeriod = [
        '10시 ~ 11시',
        '12시 ~ 15시',
        '16시 ~ 18시',
        '19시 ~ 21시',
        '21시 ~ 00시',
        '01시 ~ 09시',
    ]
    private weekUseSale = [10, 20, 20, 30, 10, 10]
    private eventLabel = ['행사전', '행사후']
    private eventSale = [4000, 8000]
    private gender = ['여성', '남성']
    private genderUser = [40, 60]
    private ageGroups = ['10대이하', '20대', '30대', '40대', '50대', '60대이상']
    private ageGroupsUser = [140, 150, 160, 100, 30, 30]

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }

    private infoList = [
        {
            text:
                '한 달 미만 영업 가맹점의 경우 월 평균 매출이 보이지 않을 수 있습니다.',
        },
    ]
}
</script>

<style lang="scss" scoped src="./MarketingAround.scss"></style>

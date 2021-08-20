<template>
    <Page>
        <Header type="sub" title="내 주변 매출" />
        <PageBody>
            <div class="content pd-btm">
                <div class="box-around-store">
                    <div class="title">
                        <h2>내 주변 동일 업종의<br />매출을 확인해보세요.</h2>
                        <p>2021년 5월 결제 기준입니다.</p>
                    </div>
                    <FormProvider :schema="data" @change="formChange" @submit="onSubmit">
                        <template slot-scope="{ schema }">
                            <DropdownBox
                                id="dropdown-box01"
                                label="가맹점 선택"
                                :list="dropdownBoxList"
                                :default-value="schema.dropdownBox"
                                :disabled="false"
                                hidden-label
                            />
                        </template>
                    </FormProvider>
                    <div class="box-store-info">
                        <p class="sectors">제과점 / 아이스크림점</p>
                        <strong>월 평균 매출 1,980,000원</strong>
                        <BulletList :list="infoList" />
                    </div>
                </div>

                <div class="store-info-wrap">
                    <ButtonField id="areaSearch" name="search" label="지역 선택" button-text="검색" placeholder="서초동" />

                    <div class="franchisee-info-wrap">
                        <div class="box-franchisee-info">
                            <div class="total">
                                <span>총 가맹점</span>
                                <strong>240개</strong>
                            </div>
                            <ul>
                                <li>
                                    <span>전월 대비</span>
                                    <strong class="up">
                                        22%
                                        <i class="ico">
                                            <span class="ir">상승</span>
                                        </i>
                                    </strong>
                                </li>
                                <li>
                                    <span>전년 대비</span>
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
                                <span>신규 가맹점</span>
                                <strong>240개</strong>
                            </div>
                            <ul>
                                <li>
                                    <span>전월 대비</span>
                                    <strong class="up">
                                        22%
                                        <i class="ico">
                                            <span class="ir">상승</span>
                                        </i>
                                    </strong>
                                </li>
                                <li>
                                    <span>전년 대비</span>
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
                                <span>폐업 가맹점</span>
                                <strong>240개</strong>
                            </div>
                            <ul>
                                <li>
                                    <span>전월 대비</span>
                                    <!--[D] 상승 : up / 감소 : down / 유지 : 클래스없이 0% 노출-->
                                    <strong class="up">
                                        22%
                                        <i class="ico">
                                            <span class="ir">상승</span>
                                        </i>
                                    </strong>
                                </li>
                                <li>
                                    <span>전년 대비</span>
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
                                <strong class="price">1,145,500,000원</strong>
                            </div>
                            <ul>
                                <li>
                                    <span>전월 대비</span>
                                    <!--[D] 상승 : up / 감소 : down / 유지 : 클래스없이 0% 노출-->
                                    <strong class="up">
                                        22%
                                        <i class="ico">
                                            <span class="ir">상승</span>
                                        </i>
                                    </strong>
                                </li>
                                <li>
                                    <span>전년 대비</span>
                                    <strong class="down">
                                        22%
                                        <i class="ico">
                                            <span class="ir">하락</span>
                                        </i>
                                    </strong>
                                </li>
                            </ul>
                            <div class="my-store-sales">
                                <p>동일 업종 평균 대비 내 가맹점 매출입니다.</p>
                                <strong class="price up">
                                    234,000원
                                    <i class="ico">
                                        <span class="ir">상승 / 감소</span>
                                    </i>
                                </strong>
                            </div>
                        </div>
                    </div>

                    <Title title="요일별 매출" type="h4" />
                    <div class="chart-box">
                        <div class="txt-total">
                            <strong> "일요일<span>이 가장 많아요</span>" </strong>
                        </div>
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            요일, 결제 건수, 비율로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">요일</th>
                                                <th scope="col">결제 건수</th>
                                                <th scope="col">비율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">일</td>
                                                <td class="t-center">3,140</td>
                                                <td class="t-center">40%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <BasicButton type="more"> 더보기 </BasicButton>
                    </div>

                    <Title title="시간대별 매출" type="h4" />
                    <div class="chart-box">
                        <div class="txt-total">
                            <strong> "12사~15시<span> 사이에 가장 많아요</span>" </strong>
                        </div>
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            요일, 결제 건수, 비율로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">요일</th>
                                                <th scope="col">결제 건수</th>
                                                <th scope="col">비율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">일</td>
                                                <td class="t-center">3,140</td>
                                                <td class="t-center">40%</td>
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
                            <strong> "12사~15시<span> 사이에 가장 많아요</span>" </strong>
                        </div>
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            요일, 결제 건수, 비율로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">요일</th>
                                                <th scope="col">결제 건수</th>
                                                <th scope="col">비율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">일</td>
                                                <td class="t-center">3,140</td>
                                                <td class="t-center">40%</td>
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
                            <strong> "12사~15시<span> 사이에 가장 많아요</span>" </strong>
                        </div>
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            요일, 결제 건수, 비율로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">요일</th>
                                                <th scope="col">결제 건수</th>
                                                <th scope="col">비율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">일</td>
                                                <td class="t-center">3,140</td>
                                                <td class="t-center">40%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <BasicButton type="more"> 더보기 </BasicButton>
                    </div>
                </div>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { Schema } from '@components/form/FormProvider.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

import type { RadioProps } from '@components/form/Radio.vue'

import { AccordionListItem } from '@components/common/AccoItem.vue'

@Component({
    components: {},
})
export default class MarketingApply extends Vue {
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
    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }

    private infoList = [
        {
            text: '한 달 미만 영업 가맹점의 경우 월 평균 매출이 보이지 않을 수 있습니다.',
        },
    ]
}
</script>

<style lang="scss" scoped src="./MarketingAround.scss"></style>

<template>
    <Page floating>
        <Header type="sub" title="신청내역" />
        <PageBody class="floating">
            <div class="content">
                <!--[D] 접수완료 ~  진행예정 케이스 -->
                <div>
                    <Title title="가맹점 이름 노출" class="franchisee-name">
                        <p>서울시 종로구 새문안로 12길 2층<br />02-1234-5678</p>
                    </Title>

                    <div class="apply-step-wrap">
                        <ul>
                            <li class="type01 active">
                                <i class="ico">
                                    <span>1</span>
                                </i>
                                <span>접수완료</span>
                            </li>
                            <li class="type02">
                                <i class="ico">
                                    <span>2</span>
                                </i>
                                <span>준비중</span>
                            </li>
                            <li class="type03">
                                <i class="ico">
                                    <span>3</span>
                                </i>
                                <span>진행예정</span>
                                <span class="day">(D-3)</span
                                ><!--[D] 진행예정 케이스에만 노출-->
                            </li>
                            <li class="type04">
                                <i class="ico">
                                    <span>4</span>
                                </i>
                                <span>진행</span>
                            </li>
                        </ul>
                    </div>

                    <!--[D] 반려-->
                    <div class="box-reject">
                        <strong>재검토 필요</strong>
                        <p>사유 : 반려사유는 다음과 같습니다.</p>
                    </div>

                    <InfoList :list="applyDetail" />

                    <Title title="예상 결과" type="h3" />
                    <ApplyResult type="complete" />

                    <BulletList :list="infoResult" />

                    <AccoItem :list="accordionList" />

                    <BulletList :list="infoCaution" />
                </div>

                <!--[D] 진행중 케이스-->
                <div>
                    <Title
                        title="이층집 강남점이층집 강남점이층집 강남점이층집 강남점이층집 강남점이층집 강남점이층집 강남점이층집 강남점이층집 강남점"
                        class="franchisee-name"
                    />
                    <div class="marketing-info-box">
                        <strong class="state">진행중(종료 20일전)</strong>
                        <div class="marketing-info">
                            <strong>[첫 고객 만들기] 10% 할인</strong>
                            <div class="info-detail">
                                <p>행사 기간 중 1회</p>
                                <p>2021.06.01~2021.06.30</p>
                            </div>
                        </div>
                    </div>

                    <!--[D] 데이터 없을때-->
                    <CautionBox description="행사 시작 다음날부터 진행 현황을 조회할 수 있습니다." />
                    <!--//[D] 데이터 없을때 -->

                    <Title title="행사 결과" type="h3" />
                    <BoxGray :list="eventResult" />
                    <BulletList :list="infoEventResult" />

                    <Title title="상세 분석" type="h3" class="flex">
                        <p class="date">(2021.05.25까지 집계 기준)</p>
                    </Title>
                    <div class="analysis-wrap">
                        <ul class="use-total">
                            <li>
                                <i class="ico"></i>
                                <span>이용 고객</span>
                                <strong>3,220명</strong>
                            </li>
                            <li>
                                <i class="ico"></i>
                                <span>이용 매출</span>
                                <strong>3,220만원</strong>
                            </li>
                        </ul>

                        <BoxGray :list="analysisList" />

                        <BulletList :list="infoAnalysis" />
                    </div>

                    <Title title="주간별 이용 고객" type="h4" />
                    <div class="chart-box active">
                        <!--[D] active 클래스 추가시 테이블 노출-->
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            기간, 이용 고객수로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 50%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">기간</th>
                                                <th scope="col">이용 고객수</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">5/24 ~ 5/30</td>
                                                <td class="t-center">3,140</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <BasicButton type="more"> 더보기 </BasicButton>
                    </div>

                    <Title title="주간별 이용 매출" type="h4" />
                    <div class="chart-box">
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            기간, 이용 고객수로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 50%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">기간</th>
                                                <th scope="col">이용 고객수</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">5/24 ~ 5/30</td>
                                                <td class="t-center">3,140</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <BasicButton type="more"> 더보기 </BasicButton>
                    </div>

                    <Title title="행사 전/후 매출 금액 변화" type="h4" />
                    <div class="chart-box">
                        <div class="box-sales-compare">
                            <span>행사 전후 대비 </span>
                            <!--[D] 증가 : up / 감소 : down / 유지는 클래스없이 0원 처리-->
                            <strong class="up">
                                1,234,000원
                                <!--[D] 증가 / 감소 일경우만 아이콘 노출-->
                                <i class="ico">
                                    <span class="ir">증가 / 감소</span>
                                </i>
                            </strong>
                        </div>

                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            구분, 기간, 매출 금액으로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">구분</th>
                                                <th scope="col">기간</th>
                                                <th scope="col">매출 금액</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">행사 전</td>
                                                <td class="t-center">
                                                    21.06.01 ~<br />
                                                    21.06.21
                                                </td>
                                                <td class="t-center">3,140</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <BasicButton type="more"> 더보기 </BasicButton>
                    </div>

                    <Title title="성별 이용 비율" type="h4" />
                    <div class="chart-box">
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            구분, 이용 고객수, 비율로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">구분</th>
                                                <th scope="col">이용 고객수</th>
                                                <th scope="col">비율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">남성</td>
                                                <td class="t-center">600</td>
                                                <td class="t-center">60%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <BasicButton type="more"> 더보기 </BasicButton>
                    </div>

                    <Title title="연령별 이용 비율" type="h4" />
                    <div class="chart-box">
                        <div style="height: 200px; background-color: #eee; text-align: center; line-height: 200px">차트영역</div>
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            구분, 이용 고객수, 비율로 구성된 표입니다.
                                        </caption>
                                        <colgroup>
                                            <col style="width: 33%" />
                                            <col style="width: 33%" />
                                            <col />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">구분</th>
                                                <th scope="col">이용 고객수</th>
                                                <th scope="col">비율</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="t-center">20대</td>
                                                <td class="t-center">600</td>
                                                <td class="t-center">60%</td>
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

            <!--접수완료 ~  진행예정 -->
            <portal to="floating">
                <BasicButton size="large">쿠폰 만들기 취소</BasicButton>
            </portal>
            <!-- 진행중 
            <portal to="floating">
                <BasicButton size="large">목록</BasicButton>
            </portal> -->
            <!-- 종료 
            <portal to="floating">
                <BasicButton size="large">목록</BasicButton>
                <BasicButton size="large">다시 신청하기</BasicButton>
            </portal> -->

            <!-- 반려 
            <portal to="floating">
                <BasicButton size="large">다시 신청하기</BasicButton>
            </portal> -->
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApplyResult from '@components/marketing/ApplyResult.vue'
import BoxGray from '@components/marketing/BoxGray.vue'
import { AccordionListItem } from '@components/common/AccoItem.vue'

@Component({
    components: { ApplyResult, BoxGray },
})
export default class MarketingDetail extends Vue {
    private infoResult = [
        {
            text: '롯데카드 결제 기준의 예상 산출이므로 실제 매출액, 고객수와 다를 수 있습니다.',
        },
        {
            text:
                '행사 비용(할인혜택)은 이층집 강남점 가맹점 대금에서 차감되는 금액으로, 방문고객 수와 고객의 결제금액에 따라 변경될 수 있습니다.',
        },
    ]
    private infoCaution = [
        {
            text: '법인카드/체크카드/기프트카드 결제는 쿠폰 행사 대상에서 제외됩니다.',
        },
        {
            text: '현장결제(매장)에서만 가능하며, 배달앱 등 온라인 결제는 제외됩니다.',
        },

        {
            text: '간편결제는 롯데 앱카드, 삼성페이, LG페이, Lpay만 가능합니다.',
        },
    ]
    private infoAnalysis = [
        {
            text: '방문고객 수, 고객의 결제금액에 따라 반영되는 금액입니다.',
        },
    ]
    private infoEventResult = [
        {
            text: '행사 대상자 중 푸시메시지 수신 동의를 한 고객에게 추가 홍보를 무료로 진행했습니다.',
        },
    ]

    private applyDetail = [
        {
            title: '행사 내용',
            desc: '[첫 고객 만들기] 5%할인 <br /> 2,000명',
        },
        {
            title: '홍보 방식',
            desc: '케이스 확인 필요. 롯데카드 앱 푸시메시지, 롯데카드 앱에 쿠폰 노출 ',
        },
        {
            title: '추천인코드',
            desc: 'AbcdE12345 ',
        },
    ]

    private accordionList: AccordionListItem[] = [
        {
            title: '유의사항',
            desc:
                '매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다. 매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다.매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다.',
        },
    ]

    private eventResult = [
        {
            subject: '행사 대상자',
            value: '22,000명',
        },
        {
            subject: '추가 홍보 (푸시메시지 발송)',
            value: '22,000명',
        },
    ]
    private analysisList = [
        {
            subject: '행사 비용',
            value: '22,000원',
        },
    ]
}
</script>

<style lang="scss" scoped src="./MarketingDetail.scss"></style>

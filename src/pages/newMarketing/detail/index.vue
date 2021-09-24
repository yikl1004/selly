<template>
    <Page floating>
        <Header type="sub" title="신청내역" />
        <PageBody class="floating">
            <div v-if="!!beforeApplyData" class="content">
                <!--[D] 접수완료 ~  진행예정 케이스 -->
                <div>
                    <Title
                        :title="beforeApplyData.mcNm"
                        class="franchisee-name"
                    >
                        <p>
                            {{ beforeApplyData.pnadd }}
                            {{ beforeApplyData.bpsnoAdd }}
                            <br />
                            {{ beforeApplyData.mcTlno }}
                        </p>
                    </Title>

                    <ApplyDetailStep :active="activeStep" />

                    <!--[D] 재검토: 반려-->
                    <!-- <div class="box-reject">
                        <strong>재검토 필요</strong>
                        <p>사유 : 반려사유는 다음과 같습니다.</p>
                    </div> -->

                    <InfoList :list="applyDetail" />

                    <Title title="예상 결과" type="h3" />
                    <!-- TODO: API data 없음 -->
                    <ApplyResult type="complete" />

                    <BulletList :list="infoResult" />

                    <AccoItem :list="accordionList" />
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
                            <strong>[첫 고객 만들기] 10% 결제일 할인</strong>
                            <div class="info-detail">
                                <p>행사 기간 중 1회</p>
                                <p>2021.06.01~2021.06.30</p>
                            </div>
                        </div>
                    </div>

                    <!--[D] 데이터 없을때-->
                    <CautionBox
                        description="행사 시작 다음날부터 진행 현황을 조회할 수 있습니다."
                    />
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
                        <ConvertBar :datas="weekUser" :labels="weekPeriod" />
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
                                                <td class="t-center">
                                                    5/24 ~ 5/30
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

                    <Title title="주간별 이용 매출" type="h4" />
                    <div class="chart-box">
                        <ConvertBar
                            :datas="weekUseSale"
                            :labels="weekUsePeriod"
                        />
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
                                                <td class="t-center">
                                                    5/24 ~ 5/30
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
                        <ConvertBar :datas="eventSale" :labels="eventLabel" />
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            구분, 기간, 매출 금액으로 구성된
                                            표입니다.
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
                                                <td class="t-center">
                                                    행사 전
                                                </td>
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
                        <ConvertPie :datas="genderUser" :labels="gender" />
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            구분, 이용 고객수, 비율로 구성된
                                            표입니다.
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
                        <!-- <div
                            style="
                                height: 200px;
                                background-color: #eee;
                                text-align: center;
                                line-height: 200px;
                            "
                        >
                            차트영역
                        </div> -->
                        <ConvertPie
                            :datas="ageGroupsUser"
                            :labels="ageGroups"
                        />
                        <div class="tbl-chart">
                            <div class="table-box">
                                <div class="table-scroll">
                                    <table>
                                        <caption>
                                            구분, 이용 고객수, 비율로 구성된
                                            표입니다.
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
import ApplyDetailStep from '@components/marketing/ApplyDetailStep.vue'
import BoxGray from '@components/marketing/BoxGray.vue'
import ConvertBar from '@components/common/ConvertBar.vue'
import ConvertPie from '@components/common/ConvertPie.vue'
import GenTable from '@components/common/GenTable.vue'
import { MktStatementModule } from '@stores/modules/mktStatement'
import { Path } from '@router/routes'
import type { AccordionListItem } from '@components/common/AccoItem.vue'
import type { MarketingStatus } from '@services/marketing'

@Component({
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const mrktCtsSeq = to.query.mrktCtsSeq
            const mrktStc = to.query.mrktStc
            if (!mrktCtsSeq || !mrktStc) {
                vm.$modal.open({
                    message: '잘못된 접근입니다.',
                    buttonText: {
                        confirm: '확인',
                    },
                    confirm: () => {
                        vm.$router.replace(Path.NewCouponList)
                    },
                })
            }
        })
    },
    components: {
        ApplyResult,
        BoxGray,
        ConvertBar,
        ConvertPie,
        ApplyDetailStep,
        GenTable,
    },
})
export default class MarketingDetail extends Vue {
    /** 마케팅 신청내역 상세 - 케이스 별 분기 */
    get dataByCase() {
        if (this.caseCheck(['01', '02', '03', '08'])) {
            return MktStatementModule.beforeApplyData
        } else if (this.caseCheck(['04'])) {
            return MktStatementModule.applyingData
        } else if (this.caseCheck(['05'])) {
            return MktStatementModule.endApplyData
        }
        return null
    }

    /** 마케팅 신청내역 상세 - 마케팅 진행 전(01, 02, 03, 08) */
    get beforeApplyData() {
        return MktStatementModule.beforeApplyData
    }

    /** 현재 활성화 될 스텝 */
    get activeStep() {
        const marketingStatusCode = this.beforeApplyData?.mrktStc
        const cases: Record<MarketingStatus, number> = {
            '01': 1,
            '02': 2,
            '03': 3,
            '04': 4,
            '05': 0,
            '08': 0,
            '09': 0,
        }
        return marketingStatusCode ? cases[marketingStatusCode] : 0
    }

    /** 행사 내용 리스트 */
    private applyDetail: { title: string; desc: string }[] = []

    /** 예상결과 안내 리스트 */
    private infoResult = [
        {
            text:
                '롯데카드 결제 기준의 예상 산출이므로 실제 매출액, 고객수와 다를 수 있습니다.',
        },
    ]

    private infoAnalysis = [
        {
            text: '방문고객 수, 고객의 결제금액에 따라 반영되는 금액입니다.',
        },
    ]
    private infoEventResult = [
        {
            text:
                '행사 대상자 중 푸시메시지 수신 동의를 한 고객에게 추가 홍보를 무료로 진행했습니다.',
        },
    ]

    private accordionList: AccordionListItem[] = [
        {
            title: '유의사항',
            desc:
                ' <ul class="bul-list"> <li> 법인카드/체크카드/기프트카드 결제는 쿠폰 행사 대상에서 제외됩니다. </li><li> 현장결제(매장)에서만 가능하며, 배달앱 등 온라인 결제는 제외됩니다. </li><li> 간편결제는 롯데 앱카드, 삼성페이, LG페이, Lpay만 가능합니다. </li></ul>',
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
    private weekPeriod = [
        '7/1~7/7',
        '7/8~7/14',
        '7/15~7/21',
        '7/23~7/28',
        '7/29~7/30',
    ]
    private weekUser = [50, 50, 50, 100, 50, 50]
    private weekUsePeriod = [
        '7/1~7/7',
        '7/8~7/14',
        '7/15~7/21',
        '7/23~7/28',
        '7/29~7/30',
    ]
    private weekUseSale = [3000, 4000, 5000, 6000, 3000]
    private eventLabel = ['행사전', '행사후']
    private eventSale = [4000, 8000]
    private gender = ['여성', '남성']
    private genderUser = [40, 60]
    private ageGroups = ['10대이하', '20대', '30대', '40대', '50대', '60대이상']
    private ageGroupsUser = [140, 150, 160, 100, 30, 30]

    async dispatch() {
        const mrktCtsSeq = this.$route.query.mrktCtsSeq as string
        const mrktStc = this.$route.query.mrktStc as string
        const params = { mrktCtsSeq, mrktStc }

        if (this.caseCheck(['01', '02', '03', '08'])) {
            await MktStatementModule.getBeforeApply(params)
        } else if (this.caseCheck(['04'])) {
            await MktStatementModule.getApplying(params)
        } else if (this.caseCheck(['05'])) {
            await MktStatementModule.getEndApply(params)
        }
    }

    caseCheck(arg: string[]) {
        const mrktStc = this.$route.query.mrktStc as string
        return arg.some(item => item === mrktStc)
    }

    /** 초기값 세팅 */
    initialize() {
        const originData = this.beforeApplyData
        this.applyDetail = [
            {
                title: '행사 내용',
                desc: `[${originData?.ggDNm}] ${
                    originData?.mrktBnfCn
                } <br /> ${this._.toNumber(
                    originData?.trgOjCstt,
                ).toLocaleString()}명`,
            },
            {
                title: '행사 기간',
                desc: `${this.$dayjs(originData?.evSdt).format(
                    'YY. MM. DD',
                )} ~ ${this.$dayjs(originData?.evEdt).format('YY. MM. DD')}`,
            },
            {
                title: '홍보 방식',
                desc: '롯데카드 앱 푸시메시지,<br />롯데카드 앱에 쿠폰 노출',
            },
        ]

        if (originData?.refC) {
            this.applyDetail.push({
                title: '추천인코드',
                desc: `${originData.refC}`,
            })
        }

        this.infoResult.push({
            text: `행사 비용(할인혜택)은 <strong>${originData?.mcNm}</strong> 가맹점 대금에서 차감되는 금액으로, 방문고객 수와 고객의 결제금액에 따라 변경될 수 있습니다.`,
        })
    }

    async mounted() {
        await this.dispatch()
        this.initialize()
    }
}
</script>

<style lang="scss" scoped src="./MarketingDetail.scss"></style>

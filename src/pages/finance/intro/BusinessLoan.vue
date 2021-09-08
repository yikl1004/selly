<template>
    <!--[D] 신청 불가인 경우 Page / PageBody에 있는 floating 제거.-->
    <Page floating>
        <Header type="sub" title="사업자 대출" />
        <PageBody class="floating">
            <div class="content finance-main-wrap">
                <div class="top-visual businessman">
                    <div class="visual-inner">
                        <Title title="사업자 대출">
                            <p>
                                사장님들을 위한 한도 우대 신용대출!<br />365일
                                24시간 편리하게 이용해 보세요.
                            </p>
                        </Title>
                        <div class="loan-info">
                            <strong class="txt-title">
                                중도상환 취급수수료 없이
                            </strong>
                            <p>
                                최저 <strong><em>4.9</em>%</strong>부터<br />
                                최대 <strong><em>5,000</em>만원</strong>까지
                            </p>
                        </div>
                        <BulletList
                            :list="[
                                {
                                    text:
                                        '한도조회는 신용등급에 영향을<br/>주지 않습니다.',
                                },
                            ]"
                        />
                    </div>
                </div>

                <div class="box-consulting">
                    <strong class="title">고객센터</strong>
                    <a href="tel:1588-8100" class="tel">1588-8100</a>
                    <p>
                        대출 신청시간 : 365(24시간)<br />
                        대출금 입금시간 : 09:00 ~ 18:00 (영업일)<br />
                        대출 상담시간 09:00 ~ 18:00 (영업일)
                    </p>
                    <BasicButton type="small" @click="openSchedulePopup">
                        예상 상환스케줄
                    </BasicButton>

                    <Anchor href="/" class="loan-tip-box">
                        <strong>이자감면 Tip!</strong>
                        <ul>
                            <li>
                                <span>1</span> LOCA MONEY 비즈니스 카드 신청
                            </li>
                            <li>
                                <span>2</span> 가맹점대금 상환(일)로 <br />대출
                                신청하여 이자감면
                            </li>
                        </ul>
                        <em>카드 신청</em>
                    </Anchor>
                </div>

                <div class="info-detail-wrap">
                    <AccoItem :list="accordionList" />
                    <BulletList :list="infoList" />

                    <div class="legal-box">
                        <p>준법감시인 심의필 제2021-E04493호 (2021.07.26)</p>
                        <p>
                            여신금융협회 심의필 제2021-L1h-06826호 (2021.08.02)
                        </p>
                    </div>
                </div>
            </div>

            <!--[D] 예상 상환스케줄 팝업 -->
            <FullPopup
                :show.sync="popScheduleShow"
                title="예상 상환스케줄"
                :button-text="{ confirm: '확인' }"
                type="popup"
                @confirm="onScheduleConfirm"
            >
                <PopupRepaySchedule />
            </FullPopup>
            <!--//[D] 예상 상환스케줄 팝업 -->

            <!--[D] 최초 장기대출 신청시 알림팝업 -->
            <Modal
                :show.sync="modalShow"
                :button-text="{ confirm: '확인' }"
                type="popup"
                @confirm="onConfirmModal"
            >
                <p>
                    당사 장기카드대출을 처음 이용하실 경우, <br />회원님의
                    안전한 장기카드대출 이용을 위해 일일 3백만원 이상 신청시
                    대출신청 완료 후<br />2시간 지연입금됩니다. <br />단,
                    은행시스템 점검으로 인해 당일 23:30~00:30까지 입금 건의 경우
                    점검 완료 후 입금 처리 되며 은행 사정에 따라 입금 지연 또는
                    취소 될 수 있으니 반드시 입금통장을 확인해 주시기 바랍니다.
                </p>
            </Modal>
            <!--//[D] 최초 장기대출 신청시 알림팝업 -->

            <!--[D] 신청 가능한 경우에만 노출-->
            <portal to="floating">
                <BasicButton size="large">대출내역</BasicButton>
                <BasicButton size="large">신청</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccordionListItem } from '@components/common/AccoItem.vue'

@Component({
    components: {
        PopupRepaySchedule: () => ({
            component: import('@components/finance/PopupRepaySchedule.vue'),
        }),
    },
})
export default class BusinessLoan extends Vue {
    private infoList = [
        {
            text:
                '<strong>연체이자율 : 회원별·이용상품별 약정이율 + 최대 3%, 법정 최고금리(연20%) 이내</strong>',
        },
        {
            text:
                '<strong>상환능력에 비해 대출금이 과도할 경우 귀하의 개인신용평점이 하락할 수 있습니다.</strong>',
        },
        {
            text:
                '<strong>개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.</strong>',
        },
        {
            text:
                '<strong>일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong>',
        },
    ]

    private accordionList: AccordionListItem[] = [
        {
            title: '대출계약철회권',
            desc:
                ' <strong class="list-tit">대출계약 철회권이란?</strong> <p> 대출받은 날로부터 14일 이내에 대출 계약에 대한 철회 의사를 표시하고, 원리금을 상환함으로써 계약을 철회할 수 있는 권리 </p><strong class="list-tit">철회 가능 시간</strong> <ul class="bul-list"> <li> 대출받은 날로부터 14일 이내, 마지막 날이 휴일인 경우 다음 영업일까지 철회 가능 </li><li> 대출계약철회는 다음날부터 가능하며, 대출실행일 당일은 철회를 할 수 없습니다. </li></ul> <strong class="list-tit">철회 제외 대상</strong> <ul class="bul-list"> <li> 롯데카드에서 1년 이내 2회 초과하여 대출계약을 철회하는 경우 </li><li> 전체 금융기관을 대상으로 1개월 이내 1회 초과하여 대출계약을 철회한 경우 </li><li>대출금액이 2억원을 초과하는 담보대출</li></ul> <strong class="list-tit">신청방법</strong> <ul class="bul-list"> <li> 롯데카드 고객센터 (<a href="tel:1588-8100" class="tel"> 1588-8100 </a> )을 통해서 신청 </li></ul>',
        },
        {
            title: '이용 전 반드시 확인하세요!',
            desc:
                '<ul class="bul-list"> <li> 계약체결 전 금융상품설명서와 약관을 확인하시기 바랍니다. </li><li> 금융소비자는 금소법제19조제1항에 따라 해당 상품 또는 서비스에 대하여 설명을 받을 권리가 있으며, 그 설명을 듣고 내용을 충분히 이해한 후 거래하시기 바랍니다. </li><li> 롯데 신용카드를 가지고 있는 회원님은 장기카드대출을 이용할 수 있으므로, 대출 조건을 확인하시기 바랍니다. </li><li> 대출이 부적정한 경우(개인신용평점 낮음 등) 대출이 제한될 수 있습니다. </li><li> 이자 납입일(매월)에 이자를 납입하여야 합니다. <ul class="dash-list"> <li> 연이자율 : 4.9~19.9%(기준금리+조정금리), 조정금리 는 고객님의 신용평점 등에 따라 차등 적용됩니다. </li></ul> </li><li> 정해진 기일에 상환하지 못한 경우 연체이자율 부과 및 신용평점 하락 등의 불이익을 받을 수 있습니다. </li><li>대출금액에 따라 대출기간은 다를 수 있습니다.</li><li> 대출신청 시점과 대출금 수령 시점간의 차이 등으로 대출가능금액, 이자율 또는 대출가능 여부가 변동될 수 있습니다. </li><li> 신용 상태가 현저히 개선된 경우 금리인하를 요구하실 수 있습니다. </li><li> 상담원 통화 및 대출금 수령 이전 다른 대출을 신청하는 경우 대출금 지급이 안 될 수 있습니다. </li><li>자세한 내용은 고객센터로 문의하시기 바랍니다.</li></ul>',
        },
    ]

    // s: popup 장기카드 대출 이용거절
    private popScheduleShow = false
    openSchedulePopup() {
        this.popScheduleShow = true
    }
    onScheduleConfirm() {
        this.popScheduleShow = false
    }
    // e: popup

    /** 모달 노출 */
    private modalShow = false
    openModal() {
        this.modalShow = true
    }
    onConfirmModal() {
        this.modalShow = false
    }

    /**
     * @category Data
     */
    onClick() {
        console.log('다음버튼 클릭')
    }
}
</script>

<style scoped lang="scss" src="./FinanceIntro.scss" />

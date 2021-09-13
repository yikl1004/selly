<template>
    <!--[D] 신청 불가인 경우 Page / PageBody에 있는 floating 제거.-->
    <Page floating>
        <Header type="sub" title="장기카드 대출" />
        <PageBody class="floating">
            <div class="content finance-main-wrap">
                <div class="top-visual card">
                    <div class="visual-inner">
                        <Title title="장기카드 대출">
                            <p>
                                대출 금액에 따라 일정 기간 거치 후 상환이
                                가능해서 상환 기간에 대한 여유가 있어요.
                            </p>
                        </Title>
                        <div class="availability-box">
                            <!-- 이용가능 -->
                            <div class="form-col">
                                <div class="field-box">
                                    <LabelTitle label="이용가능금액" />
                                    <div class="field-cont">
                                        <em><strong>5,000</strong>만원</em>
                                    </div>
                                </div>

                                <div class="field-box">
                                    <LabelTitle label="연 이자율" />
                                    <div class="field-cont">
                                        <em><strong>3</strong>%</em>
                                    </div>
                                </div>
                            </div>
                            <BulletList
                                :list="[
                                    {
                                        text:
                                            '개인의 소득과 신용도에 따라 대출금액이<br/> 수시로 변경될 수 있습니다.',
                                    },
                                ]"
                            />

                            <!-- 이용 미동의 -->
                            <!-- <BasicButton size="large" @click="openConsentPopup">
                                이용동의
                            </BasicButton>
                            <BulletList
                                :list="[
                                    {
                                        text:
                                            '이용동의 하시고 이자율과 이용가능금액을 알아보세요.',
                                    },
                                ]"
                            /> -->
                        </div>
                    </div>
                </div>

                <div class="box-consulting">
                    <strong class="title">금융상품</strong>
                    <a href="tel:02-2050-7000" class="tel">02-2050-7000</a>
                    <p>
                        전문상담원에게 연결됩니다.<br />
                        상담시간 : 09:00 ~ 21:00 (영업일)
                    </p>
                    <BasicButton type="small" @click="openSchedulePopup">
                        예상 상환스케줄
                    </BasicButton>
                </div>

                <div class="info-detail-wrap">
                    <AccoItem :list="accordionList" />
                    <BulletList :list="infoList" />

                    <div class="txt-refuse">
                        <p>이용을 원하지 않으면 거절을 신청할 수 있습니다.</p>
                        <div class="btn-area t-right">
                            <button
                                type="button"
                                class="btn-gray"
                                onClick="openConsentPopup"
                            >
                                이용거절
                            </button>
                        </div>
                    </div>

                    <div class="legal-box">
                        <p>준법감시인 심의필 제2021-E03709호 (2021.06.24)</p>
                        <p>
                            여신금융협회 심의필 제2021-L1h-02259호 (2021.03.23)
                        </p>
                    </div>
                </div>
            </div>
            <!--[D] 이용동의 팝업 -->
            <FullPopup
                :show.sync="popConsentShow"
                title="장기카드 이용동의"
                :button-text="{ confirm: '이용동의' }"
                type="popup"
                @confirm="onConsentConfirm"
            >
                <PopupUseAgree />
            </FullPopup>
            <!--//[D] 이용동의 팝업 -->

            <!--[D] 장기카드 대출 이용거절 팝업 -->
            <FullPopup
                :show.sync="popRefusalShow"
                title="장기카드 대출 이용거절"
                :button-text="{ confirm: '이용거절' }"
                type="popup"
                @confirm="onRefusalConfirm"
            >
                <PopupRefusal />
            </FullPopup>
            <!--//[D] 장기카드 대출 이용거절 팝업 -->

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
        PopupUseAgree: () => ({
            component: import('@components/finance/PopupUseAgree.vue'),
        }),
        PopupRefusal: () => ({
            component: import('@components/finance/PopupRefusal.vue'),
        }),
        PopupRepaySchedule: () => ({
            component: import('@components/finance/PopupRepaySchedule.vue'),
        }),
    },
})
export default class CardLoan extends Vue {
    private infoList = [
        {
            text:
                '<strong>개인의 소득과 신용도에 따라 대출금액이 수시로 변경될 수 있습니다.</strong>',
        },
        {
            text:
                '<strong>장기카드대출은 중도상환수수료와 취급수수료가 없습니다.</strong>',
        },
        {
            text:
                '<strong>대출취급이 부적정한 경우 대출이 제한될 수 있습니다.</strong>',
        },
        {
            text:
                '<strong>원리금 상환방법: 마이너스카드(만기일시상환), (거치후)원리금균등, (거치후)원금균등</strong>',
        },
        {
            text: '<strong>이자납입일에 이자를 납입해야 합니다.</strong>',
        },
        {
            text:
                '<strong>금융소비자는 해당상품 또는 서비스에 대하여 설명을 받을 권리가 있습니다.</strong>',
        },
        {
            text:
                '<strong>연체이자율 : 회원별·이용상품별 약정이율+최대3%, 법정 최고금리(연20%) 이내</strong>',
        },
        {
            text:
                '<strong>장기카드대출 이자율은 연4.9% ~ 19.9%로 고객의 신용평점 등에 따라 금리가 차등적용됩니다.</strong>',
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
                '<strong>일정기간 원리금을 연체할 경우 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong>',
        },
    ]

    private accordionList: AccordionListItem[] = [
        {
            title: 'CD・ATM 이용안내',
            desc:
                '<ul class="bul-list"><li>CD·ATM 이용시간은 해당 금융기관 홈페이지를 확인하시기 바랍니다.</li><li>CD·ATM 에서 장기카드대출이용 시,원금균등상환 방식이 적용됩니다.</li></ul><strong class="list-tit">금융기관</strong><p>신한은행,우리은행,BNK경남은행,KB국민은행,MG새마을금고,NH농협은행,SC제일은행</p><strong class="list-tit">24시간 제휴기관</strong><p>롯데ATM,한국전자금융(NICE),한네트,효성,에이티엠플러스,청호이지캐쉬</p>',
        },
        {
            title: '상품안내',
            desc:
                '<p>상품은 롯데카드 기준에 따라 장기카드대출 신청시 자동으로 적용됩니다. </p><div class="table-box"><div class="table-scroll"><table><caption>상품명,이자율로 구성된 표입니다. </caption><colgroup><col /><col style="width: 103px" /></colgroup><thead><tr><th scope="col">상품명</th><th scope="col">이자율</th></tr></thead><tbody><tr><td>LOCA MONEY</td><td class="t-center" rowspan="7">연 4.9%~<br />19.9% </td></tr><tr><td>LOCA MONEY:PRIME</td></tr><tr><td>LOCA MONEY:PRIME LADY</td></tr><tr><td>LOCA MONEY:PRIME L .STAR</td></tr><tr><td>LOCA MONEY:BIZ</td></tr><tr><td>LOCA MONEY:FAMILY</td></tr><tr><td>LOCA MONEY:중금리</td></tr></tbody></table></div></div>',
        },
        {
            title: '상환방법 안내',
            desc:
                '<p>회원 개인의 신용상태와 신청금액에 따라 이용 가능한 상환 방법이 다를 수 있습니다. </p><strong class="list-tit">원리금균등상환</strong><p>상환기간 중 매월 동일한 원리금 납부<br />3~60개월 중 선택 </p><div class="img-box"><img src="/assets/finance/img_biz_info01.png" alt="원리금균등상환 그래프" /></div><ul class="bul-list"><li>회원 개인의 신용에 따라 최대대출기간은 달라질 수 있습니다. </li></ul><strong class="list-tit">거치후원리금균등상환</strong><p>선택한 거치 기간만큼 이자만 납부<br/>0~최대 6개월 회원님의 신용에 따라 거치기간 선택가능<br/>거치기간 제외 60개월까지 대출가능</p><div class="img-box"><img src="/assets/finance/img_biz_info02.png" alt="거치후원리금균등상환 그래프" /></div><ul class="bul-list"><li>회원 개인의 신용에 따라 최대대출기간은 달라질 수 있습니다. </li></ul>',
        },
        {
            title: '대출계약철회권',
            desc:
                '<strong class="list-tit">대출계약 철회권이란?</strong> <p> 대출받은 날로부터 14일 이내에 대출 계약에 대한 철회 의사를 표시하고, 원리금을 상환함으로써 계약을 철회할 수 있는 권리 </p><strong class="list-tit">신청경로 및 절차</strong> <strong class="list-sub-tit">신청경로</strong> <ul class="dash-list"> <li>PC홈페이지 : 08:00 ~ 22:50</li><li> 롯데카드 고객센터 : 평일 09:00 ~ 18:00 <br/> <a href="tel:1588-8100" class="tel">1588-8100</a> </li></ul> <strong class="list-sub-tit">신청대상</strong> <ul class="dash-list"> <li> 대출 받은 날로부터 14일 이내 미상환 대출 건 <ul class="bul-list"> <li>신청일 이전 전액상환 완료 건은 신청 불가</li></ul> </li></ul> <strong class="list-sub-tit">신청절차</strong> <ul> <li> ① 신청 당일 원금 및 이자, 회사가 부담한 인지세를 전액 상환 </li><li>② 대출계약 철회권 접수 완료</li><li>③ 최대 5영업일 이내 대출 정보삭제</li></ul><strong class="list-tit">철회 제외 대상</strong><p>대출받은 날로부터 14일이 지난 대출 (실행일 미포함)</p>',
        },
        {
            title: '이용 전 반드시 확인하세요!',
            desc:
                ' <ul class="bul-list"> <li>대출신청은 자동이체 등록 회원님만 가능합니다.</li><li>장기카드대출 전화금융사기(보이스피싱) 피해를 예방하기 위하여 서비스 이용 시 인터넷 신청을 통한 휴대전화인증 또는 전화신청을 통한 본인확인이 필요합니다.</li><li>카드대3금 대체는 영업일 08:30~21:50 동안 신청가능하며 전액결제는 원단위 신청, 일부결제는 십만원단위로 신청이 가능합니다.</li><li> 2019년 9월부터 IC칩이 훼손되거나 CD·ATM 기기 이상으로 IC칩이 정상적으로 읽히지 않는 겨우, 장기카드대출 이용이 제한됩니다. <ul class="dash-list"> <li>정부 정책에 따라, 2019년 12월까지는 100만원 하는 이용가능하며, 2020년 1월부터 전면 제한됩니다.</li></ul> </li></ul>',
        },
    ]

    // s: popup 장기카드 이용동의
    private popConsentShow = false
    openConsentPopup() {
        this.popConsentShow = true
    }
    onConsentConfirm() {
        this.popConsentShow = false
    }
    // e: popup

    // s: popup 장기카드 대출 이용거절
    private popRefusalShow = false
    openRefusalPopup() {
        this.popRefusalShow = true
    }
    onRefusalConfirm() {
        this.popRefusalShow = false
    }
    // e: popup

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

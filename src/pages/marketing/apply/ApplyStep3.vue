<template>
    <Page floating>
        <Header type="proccess" title="쿠폰 만들기" />
        <PageBody class="floating">
            <div class="content">
                <Step :active="3" :count="3" />
                <Title title="신청 내용 확인" />

                <InfoList :list="applyDetail" />

                <Title title="예상 결과" type="h3" />
                <ApplyResult type="complete" />
                <BulletList :list="infoResult" />

                <!--[P] 아코디언 내용으로 하단의 bullet-list가 들어가야함. 개발 수정 요청중.-->
                <AccoItem :list="accordionList" />

                <BulletList :list="infoCaution" />
            </div>

            <portal to="floating">
                <BasicButton size="large">이전</BasicButton>
                <BasicButton size="large">신청</BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { RadioProps } from '@components/form/Radio.vue'
import { AccordionListItem } from '@components/common/AccoItem.vue'
import ApplyResult from '@components/marketing/ApplyResult.vue'

@Component({
    components: {
        ApplyResult,
    },
})
export default class MarketingApply extends Vue {
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

    private applyDetail = [
        {
            title: '가맹점명',
            desc: '이층집 강남점',
        },
        {
            title: '주소',
            desc: '서울시 종로구 새문안로 12길 2층',
        },
        {
            title: '전화번호',
            desc: '02-2050-1234',
        },
        {
            title: '행사 내용',
            desc: '케이스 확인 필요. 버튼 들어감',
        },
        {
            title: '홍보 방식',
            desc: '케이스 확인 필요. 롯데카드 앱 푸시메시지, 롯데카드 앱에 쿠폰 노출 ',
        },
    ]

    private accordionList: AccordionListItem[] = [
        {
            title: '유의사항',
            desc:
                '매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다. 매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다.매출내역이 정확하지 않은 경우는 크게 2가지 원인이 있을 수 있습니다.',
        },
    ]
}
</script>

<style lang="scss" scoped src="./ApplyStep3.scss"></style>

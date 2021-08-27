<template>
    <!-- 연동안되어 있음 -->
    <Anchor v-if="isNoLinkage" href="/" class="banner-box banner-user">
        <div class="banner-title">
            <em>반가워요 {{ userName }}님</em>
            <strong> 우리매장 매출을<br />확인하세요. </strong>
        </div>
        <span class="txt-underline">자세히 보기</span>
    </Anchor>

    <!-- 연동 후 데이터수집/ 연동안되었음-->
    <Anchor v-else-if="isProceedingLinkage" href="/" class="banner-box no-data">
        <strong>
            고객님의 매출/입금<br />데이터 수집 및 연동중입니다.
            <br />
            조금만 기다려 주세요.
        </strong>
        <img src="/assets/icon/ico_loading.svg" alt="로딩중" />
    </Anchor>

    <!-- 연동 데이터 존재시-->
    <BannerSwiper v-else-if="isCompleteLinkage">
        <swiper-slide
            v-for="(item, index) in salesList"
            :key="`sales-list-item-${index}`"
        >
            <Anchor :href="getLink(item.slDc)" class="box-sales-link">
                <span class="date">
                    {{ $dayjs(item.date).format('M월 D일(ddd) 기준') }}
                </span>
                <div class="info">
                    <strong class="title">
                        {{ salesOrDepositText(item.slDc) }}
                    </strong>
                    <span class="flag">
                        전일대비
                        {{ compareBeforeDay(item.bfdCmrSlIcrDcr, '값이 없음') }}
                    </span>
                </div>
                <div class="price">
                    <strong>
                        {{ _.toNumber(item.am).toLocaleString() }}
                    </strong>
                    원
                </div>
            </Anchor>
        </swiper-slide>
    </BannerSwiper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MainModule } from '@stores/modules/main'
import { SwiperSlide } from 'vue-awesome-swiper'
import { IncreaseValue } from '@stores/modules/sales'

@Component({
    components: {
        SwiperSlide,
    },
})
export default class SalesAndDeposit extends Vue {
    get salesScrappingCode() {
        return MainModule.salesScrappingCode
    }

    get salesList() {
        return MainModule.salesList
    }

    get userName() {
        return MainModule.userName
    }

    // 연동 완료
    get isCompleteLinkage() {
        return this.salesScrappingCode === '2'
    }

    // 연동 후 데이터 수집 및 연동이 안되어 있는 상태
    get isProceedingLinkage() {
        return this.salesScrappingCode === '1'
    }

    // 연동 하지 않았고 연동 데이터 없음
    get isNoLinkage() {
        return this.salesScrappingCode === '0'
    }

    salesOrDepositText(value: '0' | '1'): string {
        return value === '0' ? '매출' : '입금'
    }

    getLink(value: '0' | '1') {
        return { name: value === '0' ? 'Sales' : 'Deposit' }
    }

    compareBeforeDay(
        increase: IncreaseValue['increase'],
        value: string,
    ): string {
        const increaseMarks = {
            I: '+',
            D: '-',
            N: '전일과 동일',
        }

        return `${increaseMarks[increase]}${value === '0' ? '' : value}`
    }
}
</script>

<style scoped></style>

<template>
    <div v-if="isMarketing">
        <!-- s : 마케팅 -->
        <Title title="마케팅" class="flex">
            <div class="box-right">
                <Anchor :href="Path.MarketingGuide" class="btn-more">
                    <span class="ir">더보기</span>
                </Anchor>
            </div>
        </Title>

        <!-- 마케팅 신청한 경우 -->
        <BannerSwiper
            v-if="!!marketingData.length"
            :options="{
                slidesPerView: 1.4,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                },
            }"
        >
            <!-- 등록된 마케팅 배너 -->
            <swiper-slide
                v-for="(item, index) in marketingData"
                :key="`main-marketing-${index}`"
            >
                <Anchor href="/" class="banner-box banner-marketing">
                    <div class="box-event-info">
                        <Flag
                            color="blue"
                            :text="getMarketingStstusText(item.mrktStc)"
                        />
                        <em class="event-type">
                            {{ item.ggDNm }}
                        </em>
                        <span class="event-info">{{ item.dcR }}%</span>
                        <p class="franchise-name">
                            {{ item.mcNm }}
                        </p>
                        <span class="event-date">
                            {{ $dayjs(item.evSdt).format('YYYY. MM. DD') }} ~
                            <br />
                            {{ $dayjs(item.evEdt).format('YYYY. MM. DD') }}
                        </span>
                    </div>
                    <div class="box-white">
                        <span class="subject">이용 고객</span>
                        <strong>
                            {{ _.toNumber(item.ucstt).toLocaleString() }}
                            명
                        </strong>
                    </div>
                </Anchor>
            </swiper-slide>
            <!-- 기본 마케팅 배너 -->
            <swiper-slide>
                <Anchor
                    :href="Path.MarketingGuide"
                    class="banner-box banner-marketing default"
                >
                    <div class="banner-title">
                        <em>Selly와</em>
                        <strong> 가맹점이 함께 만드는 쿠폰 </strong>
                    </div>
                    <div class="box-white">
                        <strong class="txt-application">
                            <span>신청하기</span>
                        </strong>
                    </div>
                </Anchor>
            </swiper-slide>
        </BannerSwiper>

        <!-- 마케팅 신청 하지 않은경우 -->
        <div v-else class="box-banner-marketing">
            <Anchor
                :href="Path.MarketingGuide"
                class="banner-box banner-marketing default"
            >
                <div class="banner-title">
                    <em>Selly와</em>
                    <strong>
                        가맹점과 고객을<br />
                        연결하는 마케팅
                    </strong>
                </div>
                <div class="box-white">
                    <strong class="txt-application">
                        <span>신청하기</span>
                    </strong>
                </div>
            </Anchor>
        </div>

        <!-- TODO: 링크 생성 후 삽입 -->
        <Anchor href="/" class="banner-box banner-store">
            <em>우리 매장 주변</em>
            <p>분야별 다양한 정보보기!</p>
        </Anchor>
        <!-- e : 마케팅 -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SwiperSlide } from 'vue-awesome-swiper'
import { MainModule } from '@stores/modules/main'
import type { AuthResponse } from '@services/auth'
import type { MarketingStatus } from '@services/marketing'
import { Path } from '@router/routes'

@Component({
    components: { SwiperSlide },
})
export default class Marketing extends Vue {
    /** 마케팅 신청 가능여부 */
    get isMarketing() {
        const authStorage:
            | AuthResponse['loginInfo']['data']
            | null = JSON.parse(localStorage.getItem('auth') || 'null')
        const auth = authStorage || { mrktPsyn: 'N' }
        return auth.mrktPsyn === 'Y'
    }

    /** main 스토어에 마케팅 데이터 존재 여부 (API 원본 데이터) */
    get marketingData() {
        return MainModule.marketingData
    }

    get Path() {
        return Path
    }

    getMarketingStstusText(value: MarketingStatus) {
        const cases = {
            '01': '접수완료',
            '02': '준비중',
            '03': '진행예정',
            '04': '진행중',
            '05': '종료',
            '08': '재검토 필요',
            '09': '취소',
            default: '',
        }

        return cases[value]
    }
}
</script>

<style scoped></style>

<template>
    <BannerSwiper
        v-if="!!affiliateBannerList.length"
        class="box-banner-affiliate"
    >
        <swiper-slide
            v-for="(item, index) in affiliateBannerList"
            :key="`main-affiliate-banner-${index}`"
        >
            <Anchor :href="item.bnnUrl" class="banner-box banner-affiliate">
                <i class="img">
                    <img :src="item.filePhNm" alt="제휴사 이미지" />
                </i>
                <div class="affiliate-info">
                    <strong>{{ item.bnnMenNm }}</strong>
                    <p>{{ item.bnnSubText }}</p>
                </div>
            </Anchor>
        </swiper-slide>
    </BannerSwiper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SwiperSlide } from 'vue-awesome-swiper'
import { MainModule } from '@stores/modules/main'

@Component({
    components: {
        SwiperSlide,
    },
})
export default class AffiliatedBanner extends Vue {
    /** 제휴사 배너 정보 리스트 */
    get affiliateBannerList() {
        return MainModule.affiliateBannerList
    }
}
</script>

<style scoped></style>

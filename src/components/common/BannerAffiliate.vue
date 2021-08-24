<template>
    <BannerSwiper class="box-banner-affiliate">
        <swiper-slide>
            <Anchor href="/" class="banner-affiliate">
                <i class="img">
                    <img
                        src="/assets/main/img_ affiliate.png"
                        alt="제휴사 이미지"
                    />
                </i>
                <div class="affiliate-info">
                    <strong>
                        알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤
                    </strong>
                    <p>
                        출/퇴근 관리를 무료로 이용해 보세요.출/퇴근 관리를
                        무료로 이용해 보세요.
                    </p>
                </div>
            </Anchor>
        </swiper-slide>
        <swiper-slide>
            <Anchor href="/" class="banner-affiliate">
                <i class="img">
                    <img
                        src="/assets/main/img_ affiliate.png"
                        alt="제휴사 이미지"
                    />
                </i>
                <div class="affiliate-info">
                    <strong>
                        알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤알밤
                    </strong>
                    <p>
                        출/퇴근 관리를 무료로 이용해 보세요.출/퇴근 관리를
                        무료로 이용해 보세요.
                    </p>
                </div>
            </Anchor>
        </swiper-slide>
    </BannerSwiper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SwiperSlide } from 'vue-awesome-swiper'

@Component({
    components: {
        SwiperSlide,
    },
})
export default class BannerAffiliate extends Vue {}
</script>

<style scoped lang="scss" src="./BannerAffiliate.scss" />

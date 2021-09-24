<template>
    <BannerSwiper v-if="!!list.length" class="box-banner-affiliate">
        <swiper-slide
            v-for="(item, index) in list"
            :key="`banner-affiliate-${index}`"
        >
            <Anchor :href="item.bnnUrl" class="banner-affiliate">
                <i class="img">
                    <img :src="item.bnnPath" :alt="item.bnnAlt" />
                </i>
                <div class="affiliate-info">
                    <strong>
                        {{ item.bnnMenNm }}
                    </strong>
                    <p>
                        {{ item.bnnSuImgNm }}
                    </p>
                </div>
            </Anchor>
        </swiper-slide>
    </BannerSwiper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SwiperSlide } from 'vue-awesome-swiper'
import type { SalesResponse } from '@services/sales'

export type BannerItem = SalesResponse['salesDaily']['data']['list2']

@Component({
    components: {
        SwiperSlide,
    },
})
export default class BannerAffiliate extends Vue {
    @Prop({ type: Array, default: () => [] })
    readonly list!: BannerItem
}
</script>

<style scoped lang="scss" src="./BannerAffiliate.scss" />

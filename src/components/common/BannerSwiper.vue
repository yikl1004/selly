<template>
    <div>
        <swiper ref="swiper" class="swiper" :options="options">
            <slot />
            <div
                v-if="isPagination"
                class="swiper-pagination"
                slot="pagination"
            ></div>
        </swiper>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { Swiper } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

interface Pagination extends Object {
    el: string
}
interface Options extends Object {
    slidesPerView?: number
    spaceBetween?: number
    pagination?: Pagination
}

@Component({
    name: 'carrousel',
    components: {
        Swiper,
    },
})
export default class BannerSwiper extends Vue {
    @Ref('swiper') swiper!: Vue

    @Prop({
        type: Object,
        default: () => ({
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: {
                el: '.swiper-pagination',
            },
        }),
    })
    readonly options!: Options

    /* swiperSlide의 개수가 1개 인 경우 네이게이션 활성/비활성 */
    private isPagination = true

    mounted() {
        this.isPagination = this.swiper.$children.length > 1
    }
}
</script>

<style lang="scss">
.swiper {
    width: 100vw;
    padding: 0 24px;
    margin: 0 -24px;
}
.swiper-container {
    .swiper-pagination {
        position: relative;
        bottom: 0;
        margin-top: 16px;
        line-height: 0;
        .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            margin: 0 2px;
            background-color: #aaa;
            opacity: 1;
            line-height: 0;
        }
        .swiper-pagination-bullet-active {
            width: 20px;
            background-color: #333;
            border-radius: 6px;
        }
    }
}

.swiper-slide {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    color: #666;
    font-weight: normal;
}
</style>

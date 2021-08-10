v
<template>
    <div class="box-title">
        <h2 v-if="!!title" class="title">
            {{ title }}
        </h2>
        <div v-if="!!subText" class="box-sub-txt">
            <p>
                {{ subText }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface TitleProps {
    title?: string
    subTitle?: string
}

@Component
export default class Title extends Vue {
    /** 페이지 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** 제목하단 텍스트 / 페이지 설명 텍스트 */
    @Prop({ type: String })
    readonly subText!: string
}
</script>

<style lang="scss" scoped>
.box-title {
    margin-bottom: 50px;
    .title {
        font-size: 20px;
        color: #222;
        line-height: 1.4;
        letter-spacing: -0.5px;
        font-weight: 700;
        & + .box-sub-txt {
            margin-top: 8px;
        }
    }
    .box-sub-txt {
        p {
            font-size: 14px;
            font-weight: 400;
            color: #666;
            line-height: 1.57;
            letter-spacing: -0.5px;
        }
    }
}
</style>

<template>
    <div :class="['box-title', align]">
        <div v-if="!!title" class="title-area">
            <h2 v-if="type == 'h2'" class="title" v-html="title"></h2>

            <h3 v-else-if="type == 'h3'" class="title" v-html="title"></h3>

            <h4 v-else-if="type == 'h4'" class="title" v-html="title"></h4>
        </div>
        <slot />
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
    /** 타이틀 태그 */
    @Prop({ type: String, default: 'h2' })
    readonly type!: string

    /** 페이지 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** 제목하단 텍스트 / 페이지 설명 텍스트 */
    @Prop({ type: String })
    readonly subText!: string

    /* 텍스트 정렬 left(default) / center / right */
    @Prop({ type: String })
    readonly align!: string
}
</script>

<style lang="scss" scoped>
.box-title {
    margin-top: 48px;
    margin-bottom: 12px;
    // margin-bottom: 50px;
    &.center {
        text-align: center;
    }
    &.right {
        text-align: right;
    }
    .title {
        color: #222;
        letter-spacing: -0.5px;
        word-break: keep-all;
    }
    h2.title {
        font-size: 20px;
        line-height: 1.4;
        font-weight: 700;
    }
    h3.title {
        font-size: 16px;
        line-height: 1.5;
        font-weight: 500;
    }

    h4.title {
        font-size: 14px;
        line-height: 1.57;
        font-weight: 700;
    }
    .title-area {
        & + p {
            margin-top: 8px;
        }
    }
    p {
        font-size: 14px;
        font-weight: 400;
        color: #666;
        line-height: 1.57;
        letter-spacing: -0.5px;
    }

    .box-right {
        margin-left: auto;
    }
    &.flex {
        align-items: center;
        p {
            margin-top: 0;
        }
    }
}
.content .box-step + .box-title {
    margin-top: 0;
}
</style>

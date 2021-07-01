<template>
    <div class="caution-box" :class="type">
        <i class="icon-caution"></i>
        <div class="caution-text-box">
            <strong class="caution-title">{{ title }}</strong>
            <p v-if="description" class="caution-sub-txt">
                {{ description }}
            </p>
            <!-- ~이용이 어려운 상황입니다.일때 나오는 전화번호 안내 박스 -->
            <div v-if="linkInfo || link" class="tel-box">
                <p v-if="linkInfo">
                    {{ linkInfo }}
                </p>
                <a v-for="(item, index) in link" :key="`caution-box-link-${index}`" :href="getHref(item)" class="link-tel">
                    {{ item.text }}
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Link {
    href: string
    text: string
    type?: 'tel'
}

@Component
export default class CautionBox extends Vue {
    /**
     * @category Props
     */

    /** 아이콘 타입받음. complete / caution */
    @Prop({ type: String, default: 'complete' })
    readonly type!: string

    /** 제목 */
    @Prop({ type: String, required: true })
    readonly title!: string

    /** 설명 글 */
    @Prop({ type: String })
    readonly description!: string

    /** 링크 (복수 허용) */
    @Prop({ type: [Array, String] })
    readonly link!: Link[] | Link

    /** 링크에 대한 설명(or HTML) */
    @Prop({ type: String })
    readonly linkInfo!: string

    /** @category Methods */

    // getter용
    getHref(link: Link): string {
        let href = ''
        if (link.type === 'tel') {
            href = `tel:${link.href}`
        } else {
            href = link.href
        }
        return href
    }
}
</script>

<style lang="scss" scoped src="./CautionBox.scss"></style>

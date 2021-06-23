<template>
    <ul class="bullet-list">
        <li>사업장 운영 실적이 적용 되지 않았을 시 예상 3개월 운영 실적을 입력 해주세요.</li>
        <li>사업장 운영 실적이 적용 되지 않았을 시 예상 3개월 운영 실적을 입력 해주세요.</li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BulletList extends Vue {
    /**
     * @category Prop
     */

    /** 페이지 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** 제목하단 텍스트 / 페이지 설명 텍스트 */
    @Prop({ type: String })
    readonly subText!: string
}
</script>

<style lang="scss" scoped src="./BulletList.scss"></style>

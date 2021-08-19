<template>
    <div class="layout-default">
        <slot />
        <FixedBtnBox v-if="floating"></FixedBtnBox>
        <Footer v-if="footer" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Page extends Vue {
    /** floating 버튼 영역 사용/노출 여부 */
    @Prop({ type: Boolean, default: false })
    readonly floating!: boolean

    /** footer 노출여부 */
    @Prop({ type: Boolean, default: true })
    readonly footer!: boolean
}
</script>

<style scoped></style>

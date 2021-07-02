<template>
    <div class="label-title-box">
        <label v-if="labelType === 'label'" :for="id" class="label" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <strong v-else class="label">
            {{ label }}
        </strong>
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LabelTitle extends Vue {
    /**
     * @category PROPS
     */

    /** form에 사용될 id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** label tag / 단순 제목영역인지 구분 */
    @Prop({ type: String, default: '' })
    readonly labelType!: string
}
</script>

<style scoped lang="scss" src="./LabelTitle.scss"></style>

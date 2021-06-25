<template>
    <div class="form-text-box" :class="type">
        <LabelTitle id="labelid" title-type="label" :hidden-label="hiddenLabel" label="lable" />
        <div class="form-text-area">
            만 41세
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FormTextBox extends Vue {
    /**
     * @category Props
     */

    /** label */
    @Prop({ type: String })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** type : 좌우배치 row / 상하배치 col */
    @Prop({ type: String, default: 'row' })
    readonly type!: string
}
</script>

<style lang="scss" scoped src="./FormTextBox.scss"></style>

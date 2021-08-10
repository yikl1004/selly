<template>
    <div class="form-text-box field-box" :class="type">
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="form-text-area">
            {{ value }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FormTextBox extends Vue {
    /** label */
    @Prop({ type: String })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** type : 좌우배치 row / 상하배치 col */
    @Prop({ type: String, default: 'row' })
    readonly type!: string

    @Prop({ type: String })
    readonly value!: string
}
</script>

<style lang="scss" scoped src="./FormTextBox.scss"></style>

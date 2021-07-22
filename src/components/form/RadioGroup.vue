<template>
    <div class="radio-group">
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="radio-area">
            <div
                v-for="(check, index) in list"
                :key="`radio-group-${name}-${index}`"
                class="radio-list-item"
            >
                <Radio
                    :label="check.label"
                    :name="`radio-group-${name}`"
                    :value="check.value"
                    :checked="check.checked"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RadioProps } from '@components/form/Radio.vue'

/**
 * TODO: 보기 링크를 아직 만들지 않았음...
 */

@Component
export default class RadioGroup extends Vue {
    /**
     * @category Prop
     */

    /** 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** form name */
    @Prop({ type: String, required: true })
    readonly name!: string

    /** 비활성화 사용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** label */
    @Prop({ type: String })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 라디오 리스트 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: RadioProps[]
}
</script>

<style lang="scss" src="./RadioGroup.scss"></style>

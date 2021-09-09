<template>
    <div class="radio-group field-box">
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="radio-area">
            <div
                v-for="(check, index) in list"
                :key="`radio-group-${name}-${index}`"
                class="radio-list-item"
            >
                <Radio
                    :id="`${name}-${index}`"
                    :label="check.label"
                    :name="`radio-group-${name}`"
                    :value="check.value"
                    :checked="check.checked"
                    @change="onChange"
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

    /** 값이 변경 됬을 때 */
    onChange(value: string) {
        /**
         * @event change
         */
        this.$emit('change', value)
    }
}
</script>

<style lang="scss" src="./RadioGroup.scss"></style>

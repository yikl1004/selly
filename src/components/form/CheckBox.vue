<template>
    <div :class="['check-box', type]">
        <input :id="id" v-model="value" type="checkbox" :disabled="disabled" :name="name" />
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'

export type DesignType = 'normal' | 'circle'

@Component
export default class CheckBox extends Vue {
    /**
     * @category Prop
     */

    /** 디자인 타입 */
    @Prop({ type: String, default: 'normal' })
    readonly type!: DesignType

    /** form id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** name attribute */
    @Prop({ type: String, required: true })
    readonly name!: string

    /** label text */
    @Prop({ type: String, required: true })
    readonly label!: string

    /** 활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** form value */
    @PropSync('defaultValue', { type: Boolean, default: false, required: true })
    private value!: boolean

    /**
     * @category Watch
     */

    @Watch('value')
    changeValue(newValue: boolean) {
        console.log('changeValue', newValue)
        this.setCheckList(newValue)
    }

    @Watch('checkList', { deep: true })
    changeCheckList(newValue: any) {
        if (this.name in this.checkList) {
            this.$emit('update:defaultValue', this.checkList[this.name])
        }
    }

    /**
     * @category Etc
     */

    /** CheckBoxGroup 컴포넌트에서 주입 받는 전체 체크 여부 */
    @InjectReactive('checkList')
    private checkList!: { [key: string]: boolean }

    /**
     * @category Methods
     */

    mounted() {
        this.setCheckList(this.value)
    }

    setCheckList(value: boolean) {
        if (!!this.checkList) {
            this.checkList[this.name] = value
        }
    }
}
</script>

<style scoped lang="scss" src="./CheckBox.scss"></style>

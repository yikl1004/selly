<template>
    <div class="text-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <input
            ref="input"
            :value="value"
            type="text"
            autocomplete="new-password"
            :name="name"
            :required="required"
            :maxlength="maxLength"
            :disabled="disabled"
            @input="onInput"
            @keyup="onKeyup"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

export interface OnChangeParameters {
    value: string
    maxLength?: number
    index?: number
}

@Component
export default class TextField extends Vue {
    /** type 속성 */
    @Prop({ type: String, default: 'text', required: false })
    readonly type!: 'text' | 'number'

    /** form에 사용될 id */
    @Prop({ type: String, default: 'textField', required: true })
    readonly id!: string

    /** form에 사용될 name */
    @Prop({ type: String, default: '', required: true })
    readonly name!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly hiddenLabel!: boolean

    /** 필수 입력 여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly required!: boolean

    /** 최대 입력 글자수 */
    @Prop({ type: Number, default: undefined, required: false })
    readonly maxLength!: number | undefined

    /** 비활성화 여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly disabled!: boolean

    private value: string = ''

    get max(): number | undefined {
        return this.type === 'number' ? this.maxLength : undefined
    }

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string)
         */
        this.$emit('change', {
            value: newValue,
            name: this.name,
        })
    }

    onInput() {}

    onKeyup(event: KeyboardEvent) {
        const value = (event.target as HTMLInputElement).value
    }

    mounted() {
        this.$emit('mounted', this.$refs.input)
    }
}
</script>

<style scoped></style>

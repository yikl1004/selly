<template>
    <div class="text-field">
        <label :for="id">{{ label }}</label>
        <input v-model="value" type="text" :required="required" :maxlength="maxLength" :disabled="disabled" @keyup="onKeyup" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TextField extends Vue {
    /** form에 사용될 id */
    @Prop({ type: String, default: 'textField', required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

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

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string)
         */
        this.$emit('onChange', newValue)
    }

    onKeyup(event: KeyboardEvent) {
        const value = (event.target as HTMLInputElement).value
        console.log(value)
    }
}
</script>

<style scoped></style>

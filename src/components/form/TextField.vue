<template>
    <div class="text-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <input
            ref="input"
            :value="value"
            autocomplete="new-password"
            :pattern="pattern"
            v-bind="$attrs"
            @input="onInput"
            @keydown="onKeydown"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import _ from 'lodash'


export interface OnChangeParameters {

}

@Component
export default class TextField extends Vue {

    /** form에 사용될 id */
    @Prop({ type: String, default: 'textField', required: true })
    readonly id!: string

    @Prop({ type: String, default: 'text', required: false })
    readonly type?: 'number' | 'text'

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop({ type: Boolean, default: false, required: false })
    readonly hiddenLabel!: boolean

    private value: string = ''

    get pattern(): string {
        // const 
        return '\\d*'
    }

    get maxLength(): number {
        return _.toNumber(this.$attrs['max-length'])
    }

    get index(): number {
        return _.toNumber(this.$attrs['data-index'])
    }

    @Watch('value')
    changeValue(newValue: string) {
        /**
         * value가 변경 될때 마다 호출되는 callback(value: string, index: number, maxLength: number)
         */
        this.$emit('change', newValue, this.index, this.maxLength)
    }

    onInput(event: InputEvent) {
        const target = event.target as HTMLInputElement
        if ( this.type === 'number' && this.value.length >= this.maxLength ) {
            this.value = this.value
        } else {
            this.value = target.value
        }
    }

    onKeydown(event: KeyboardEvent) {
        this.$emit('keydown', event)
    }

    mounted() {
        this.$emit('mounted', this.$refs.input)
    }
}
</script>

<style scoped></style>

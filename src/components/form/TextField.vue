<template>
    <div class="text-field">
        <label :for="id">{{ label }}</label>
        <input v-model="value" type="text" />
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

    private value: string = ''

    @Watch('value')
    changeValue(newValue: string) {
        this.$emit('onChange', newValue)
    }
}
</script>

<style scoped></style>

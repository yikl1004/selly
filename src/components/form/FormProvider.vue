<template>
    <form @submit.prevent="onSubmit">
        <slot :schema="data" />
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export const FormBus = new Vue()
export const FormUpdateEvent = 'form:update'

type Schema = { [key: string]: object | boolean | number | string }

@Component
export default class FormProvider extends Vue {
    @Prop({ type: Object, required: true })
    readonly schema!: Schema

    private data: Schema = this.schema || {}

    onSubmit() {
        this.$emit('submit', this.data)
    }

    init() {
        FormBus.$on(FormUpdateEvent, (value: any) => {
            this.data[value.fieldName] = value.value
            this.$emit('change', this.data)
        })
    }

    mounted() {
        this.init()
    }
}
</script>

<style scoped></style>

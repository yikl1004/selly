<template>
    <div class="container">
        <h1>메인</h1>
        <form @submit.prevent="onSubmit">
            <TextField
                v-for="(input, index) in list"
                :id="input.id"
                ref="textField"
                :key="`card-input-${index}`"
                :type="input.type"
                :name="input.name"
                :label="input.label"
                :hidden-label="input.hiddenLabel"
                :max-length="input.maxLength"
                @change="onChange"
                @mounted="mountedInput"
            />
            <button type="submit">
                submit 11
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import { OnChangeParameters } from '@components/form/TextField.vue'

interface InputElement {
    id: string
    name: string
    label: string
    hiddenLabel?: boolean
    maxLength?: number
    type?: 'text' | 'number'
}

@Component
export default class Main extends Vue {
    private list: InputElement[] = [
        { id: 'cardNumber1', name: 'cardNumber1', label: '첫번째 4자리', hiddenLabel: true, maxLength: 4, type: 'number' },
        { id: 'cardNumber2', name: 'cardNumber2', label: '두번째 4자리', hiddenLabel: true, maxLength: 4, type: 'number' },
        { id: 'cardNumber3', name: 'cardNumber3', label: '세번째 4자리', hiddenLabel: true, maxLength: 4, type: 'number' },
        { id: 'cardNumber4', name: 'cardNumber4', label: '네번째 4자리', hiddenLabel: true, maxLength: 4, type: 'number' },
    ]
    private inputs: HTMLInputElement[] = []

    onChange(data: OnChangeParameters) {
        const { value, maxLength, index } = data
        const typedIndex = index as number
        const nextTarget = this.inputs[typedIndex + 1]
        if (value.length === maxLength && nextTarget) {
            nextTarget.focus()
        }
    }

    onSubmit(a: any) {
        console.log('@@@', a)
    }

    mountedInput(el: HTMLInputElement) {
        console.log('mountedInput', el)
        this.inputs.push(el)
    }

    mounted() {
        const refs = this.$refs
        console.log(refs.textField)
    }
}
</script>

<style scoped></style>

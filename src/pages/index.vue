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
                :data-index="index"
                @change="onChange"
                @mounted="mountedInput"
                @keydown="onKeydown"
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

interface InputElement {
    id: string;
    name: string;
    label: string;
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
        { id: 'cardNumber4', name: 'cardNumber4', label: '네번째 4자리', hiddenLabel: true, maxLength: 4, type: 'number' }
    ]
    private inputs: HTMLInputElement[] = []

    onChange(value: string, index: number, maxLength?: number) {
        this.focusNextInput(index)
    }

    onSubmit(a: any) {
        console.log('@@@', a)
    }

    applyMaxLength(event: KeyboardEvent) {
        const { shiftKey, ctrlKey, metaKey, altKey } = event
        const target = event.target as HTMLInputElement
        const { maxLength, type } = target
        const value = target.value
        const isBackspace = event.key.toLowerCase() === 'backspace'

        console.log({
            shiftKey ,ctrlKey ,metaKey ,altKey ,maxLength ,type ,value ,isBackspace
        })

        const conditions = [
            type === 'number',
            value.length >= maxLength,
            !(shiftKey || ctrlKey || metaKey || altKey || isBackspace)
        ]

        conditions.every(condition => condition) && 
            event.preventDefault()
    }

    focusPreviousInput(event: KeyboardEvent) {

    }

    focusNextInput(currentIndex: number) {
        const currentTarget = this.inputs[currentIndex]
        const nextTarget = this.inputs[currentIndex + 1]
        const conditions = [
            currentTarget.value.length === currentTarget.maxLength,
            nextTarget
        ]

        conditions.every(condition => !!condition) &&
            nextTarget.focus()
    }

    onKeydown(event: KeyboardEvent) {
        this.applyMaxLength(event)
        this.focusPreviousInput(event)
    }

    mountedInput(el: HTMLInputElement) {
        this.inputs.push(el)
    }

    mounted() {
        const refs = this.$refs
        console.log(refs.textField)
    }
}
</script>

<style scoped></style>

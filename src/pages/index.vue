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
                :maxlength="input.maxLength"
                :data-index="index"
                @change="onChange"
                @mounted="mountedInput"
                @keydown="onKeydown"
                @focus="onFocus"
            />
            <button type="submit">
                submit
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
    private currentIndex: number = -1

    onFocus(index: number) {
        console.log('onFocus', index)
        this.currentIndex = index
    }

    onChange(value: string) {
        this.focusNextInput(value)
    }

    onSubmit(a: any) {
        console.log('submit data...', a)
    }

    focusPreviousInput(event: KeyboardEvent) {
        const currentTarget = this.inputs[this.currentIndex]
        const prevTarget = this.inputs[this.currentIndex - 1]
        const conditions = [currentTarget.value.length === 0, prevTarget, event.key.toLowerCase() === 'backspace']

        conditions.every(condition => !!condition) && prevTarget.focus()
    }

    focusNextInput(value: string) {
        const currentTarget = this.inputs[this.currentIndex]
        const nextTarget = this.inputs[this.currentIndex + 1]
        const conditions = [currentTarget.value.length === currentTarget.maxLength, nextTarget]

        conditions.every(condition => !!condition) && nextTarget.focus()
    }

    onKeydown(event: KeyboardEvent) {
        this.focusPreviousInput(event)
    }

    mountedInput(el: HTMLInputElement) {
        if (this.inputs.length === this.list.length) {
            this.inputs = []
        }
        this.inputs.push(el)
    }

    mounted() {}
}
</script>

<style scoped></style>

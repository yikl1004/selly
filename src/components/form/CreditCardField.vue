<template>
    <div>
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
            <button type="submit">submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
interface InputElement {
    id: string
    name: string
    label: string
    hiddenLabel?: boolean
    maxLength?: number
    type?: 'text' | 'number'
}

/**
 * TODO: 미완성 컴포넌트
 */

@Component
export default class CreditCardField extends Vue {
    private list: InputElement[] = [
        {
            id: 'cardNumber1',
            name: 'cardNumber1',
            label: '첫번째 4자리',
            hiddenLabel: true,
            maxLength: 4,
            type: 'number',
        },
        {
            id: 'cardNumber2',
            name: 'cardNumber2',
            label: '두번째 4자리',
            hiddenLabel: true,
            maxLength: 4,
            type: 'number',
        },
        {
            id: 'cardNumber3',
            name: 'cardNumber3',
            label: '세번째 4자리',
            hiddenLabel: true,
            maxLength: 4,
            type: 'number',
        },
        {
            id: 'cardNumber4',
            name: 'cardNumber4',
            label: '네번째 4자리',
            hiddenLabel: true,
            maxLength: 4,
            type: 'number',
        },
    ]
    private inputs: HTMLInputElement[] = []
    private currentIndex = -1

    onSubmit(a: string) {
        console.log('submit data...', a)
    }

    onChange(/* value: string */) {
        this.focusNextInput()
    }

    mountedInput(el: HTMLInputElement) {
        if (this.inputs.length === this.list.length) {
            this.inputs = []
        }
        this.inputs.push(el)
    }

    focusNextInput() {
        const currentTarget = this.inputs[this.currentIndex]
        const nextTarget = this.inputs[this.currentIndex + 1]
        const conditions = [
            currentTarget.value.length === currentTarget.maxLength,
            nextTarget,
        ]

        conditions.every(condition => !!condition) && nextTarget.focus()
    }

    onFocus(event: FocusEvent) {
        const { name } = event.target as HTMLInputElement
        this.currentIndex = this.list.findIndex(item => item.name === name)
    }

    onKeydown(event: KeyboardEvent) {
        this.focusPreviousInput(event)
    }

    focusPreviousInput(event: KeyboardEvent) {
        const currentTarget = this.inputs[this.currentIndex]
        const prevTarget = this.inputs[this.currentIndex - 1]
        const conditions = [
            currentTarget.value.length === 0,
            prevTarget,
            event.key.toLowerCase() === 'backspace',
        ]

        conditions.every(condition => !!condition) && prevTarget.focus()
    }
}
</script>

<style scoped lang="scss" src="./CreditCardField.scss"></style>

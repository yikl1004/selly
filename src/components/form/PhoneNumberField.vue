<template>
    <div class="phone-number-field">
        <input type="text" :value="displayValue" @input="onInput" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

/**
 * TODO: 만들고 있는 중... 디자인이 없어서 아직 기능만 있음
 */
@Component
export default class CreditCardField extends Vue {
    private displayValue: string = ''
    private value: string = ''

    @Watch('value')
    changeValue() {
        let args: [RegExp, string] | []
        if (this.value.length < 7) {
            args = [/(\d{3})(\d)/, '$1-$2']
        } else if (this.value.length < 11) {
            args = [/^(\d{3})(\d{3})(\d)/, '$1-$2-$3']
        } else if (this.value.length >= 11) {
            args = [/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3']
        } else {
            args = []
        }

        this.displayValue = args.length === 2 ? this.value.replace(...args) : this.value
    }

    onInput(event: KeyboardEvent) {
        // console.log(phoneNumber.replace(/(^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3'))
        // console.log(phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3'))
        this.value = (event.target as HTMLInputElement).value.replace(/\-/g, '')
    }
}
</script>

<style scoped src="PhoneNumberField.scss"></style>

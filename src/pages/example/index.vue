<template>
    <div>
        <h1>예제 페이지</h1>
        <input type="text" :value="displayValue" @input="onInput" />
        <button type="button" @click="openModal">
            모달
        </button>
        <BottomSheet :show="visible" @close="closedModal" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    /**
     * @category METHODS
     * @title Custom
     */
    validate(value: string): boolean {
        return this._.toNumber(value) < 3500
    }

    private value: string = ''
    private displayValue: string = ''

    private visible: boolean = false

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

    openModal() {
        this.visible = true
    }

    closedModal() {
        this.visible = false
    }
}
</script>

<style scoped lang="scss"></style>

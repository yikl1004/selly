import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Validates extends Vue {
    private numberRegExp: RegExp = /^[0-9]*$/g
    private stringRegExp: RegExp = /^[ㄱ-힇a-zA-Z]*$/g

    readonly type!: 'number' | 'seperateNumber' | 'text'

    /** 숫자만 입력 받는 타입인지 여부 */
    get isNumberType(): boolean {
        return ['number', 'seperateNumber'].some(type => type === this.type)
    }

    /**
     * 특수문자를 제외한 문자열인지를 확인
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isString(event: KeyboardEvent): boolean {
        const result = new RegExp(this.stringRegExp).test(event.key)

        return result
    }

    /**
     * 숫자인지를 확인
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isNumber(event: KeyboardEvent): boolean {
        const result = new RegExp(this.numberRegExp).test(event.key)
        return result
    }

    /**
     * metaKey 여부 확인
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isMetaKeys(event: KeyboardEvent): boolean {
        const { shiftKey, ctrlKey, metaKey, altKey } = event
        const isBackspace = event.key.toLowerCase() === 'backspace'

        return [shiftKey, ctrlKey, metaKey, altKey, isBackspace].some(key => key)
    }

    /**
     * maxLength 기능을 직접 구현(number 타입인 경우 maxLength는 동작하지 않음)
     * @param {KeyboardEvent} event
     */
    applyMaxLength(event: KeyboardEvent) {
        const isMetaKeys = this.isMetaKeys(event)
        const target = event.target as HTMLInputElement
        const value = target.value
        const conditions = [this.isNumberType, value.length >= target.maxLength, !isMetaKeys]

        conditions.every(condition => condition) && event.preventDefault()
    }

    /**
     * 텍스트가 아닌 숫자만 입력 가능하게...
     * @param {KeyboardEvent} event
     */
    onlyNumber(event: KeyboardEvent) {
        if (this.isNumberType) {
            const conditions = [this.isString(event), !this.isMetaKeys(event)]
            conditions.every(condition => condition) && event.preventDefault()
        }
    }
}

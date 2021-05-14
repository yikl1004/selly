import { Component, Vue } from 'vue-property-decorator'

/**
 * 설명을 적어야 하는데 뭐라고 또 말을 만들어서 써야 하나...
 * @title 몰라...
 */
@Component
export default class Validates extends Vue {
    private numberRegExp: RegExp = /^[0-9]*$/g
    private stringRegExp: RegExp = /^[ㄱ-힇a-zA-Z]*$/g
    private specialRegExp: RegExp = /^[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]*$/g
    private phoneRegExp: RegExp = /^\d{2,3}-\d{3,4}-\d{4}$/

    readonly type!: 'number' | 'seperateNumber' | 'text' | 'select' | SecretType

    /** 숫자만 입력 받는 타입인지 여부 */
    get isNumberType(): boolean {
        return ['number', 'seperateNumber', 'regist', 'registeGender', 'card', 'card2'].some(type => type === this.type)
    }

    /**
     *
     * @param {RegExp} regExp 정규식 객체
     * @param {string} key event.key 값이 넘어올 걸 예상
     * @returns {boolean}
     */
    private execute(regExp: RegExp, key: string): boolean {
        const result = new RegExp(regExp).test(key)
        return result
    }

    /**
     * 특수문자를 제외한 문자열인지를 확인 (1글자만 확인)
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isString(event: KeyboardEvent): boolean {
        if (event.key.length > 1) {
            return false
        } else {
            return this.execute(this.stringRegExp, event.key)
        }
    }

    /**
     * 숫자인지를 확인
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isNumber(event: KeyboardEvent): boolean {
        return this.execute(this.numberRegExp, event.key)
    }

    /**
     * 키보드에서 입력가능한 특수문자 인지 확인(Unicode, ASCII code, Entity code 등은 추후에... ㅠㅠ )
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isSpecial(event: KeyboardEvent): boolean {
        return this.execute(this.specialRegExp, event.key)
    }

    /**
     * Key 여부 확인
     * @param {KeyboardEvent} event
     * @returns {boolean}
     */
    isMetaKeys(event: KeyboardEvent): boolean {
        const { shiftKey, ctrlKey, metaKey, altKey } = event
        const isBackspace = event.key.toLowerCase() === 'backspace'

        return [shiftKey, ctrlKey, metaKey, altKey, isBackspace].some(key => key)
    }

    /**
     * maxLength 기능을 직접 구현
     * number 타입인 경우 maxLength는 동작하지 않아서 직접 만듦, tel 타입을 써도 괜찮을 듯...
     * @param {KeyboardEvent} event
     */
    applyMaxLength(event: KeyboardEvent) {
        const target = event.target as HTMLInputElement
        const value = target.value
        const isMetaKeys = this.isMetaKeys(event)
        const conditionsNumberType = [value.length >= target.maxLength, !isMetaKeys]

        conditionsNumberType.every(condition => condition) && event.preventDefault()
    }

    /**
     * 텍스트가 아닌 숫자만 입력 가능하게...
     * @param {KeyboardEvent} event
     */
    onlyNumber(event: KeyboardEvent) {
        const isString = this.isString(event)
        const isSpecial = this.isSpecial(event)
        const conditions = [isString, isSpecial]

        if (this.isNumberType) {
            conditions.some(condition => condition) && event.preventDefault()
        }
    }

    /**
     * @TODO: 숫자가 아닌 텍스트만 입력 가능하게...
     * @param event
     */
    onlyText(event: KeyboardEvent) {}

    phoneNumber(value: string) {
        const cloneValue = this._.cloneDeep(value)
        let args: [RegExp, string] | []
        if (cloneValue.length < 7) {
            args = [/(\d{3})(\d)/, '$1-$2']
        } else if (cloneValue.length < 11) {
            args = [/^(\d{3})(\d{3})(\d)/, '$1-$2-$3']
        } else if (cloneValue.length >= 11) {
            args = [/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3']
        } else {
            args = []
        }

        return args.length === 2 ? cloneValue.replace(...args) : cloneValue
    }
}

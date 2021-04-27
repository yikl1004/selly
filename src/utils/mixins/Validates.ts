import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Validates extends Vue {
    private numberRegExp: RegExp = /^[0-9]*$/g
    private stringRegExp: RegExp = /^[ㄱ-힇a-zA-Z]*$/g

    /**
     * 특수문자를 제외한 문자열인지를 확인
     * @param event KeyboardEvent
     * @returns {boolean}
     */
    isString(event: KeyboardEvent): boolean {
        const result = new RegExp(this.stringRegExp).test(event.key)

        return result
    }

    /**
     * 숫자인지를 확인
     * @param event KeyboardEvent
     * @returns {boolean}
     */
    isNumber(event: KeyboardEvent): boolean {
        const result = new RegExp(this.numberRegExp).test(event.key)
        return result
    }

    /**
     * metaKey 여부 확인
     * @param event KeyboardEvent
     * @returns {boolean}
     */
    isMetaKeys(event: KeyboardEvent): boolean {
        const { shiftKey, ctrlKey, metaKey, altKey } = event
        const isBackspace = event.key.toLowerCase() === 'backspace'

        return [shiftKey, ctrlKey, metaKey, altKey, isBackspace].some(key => key)
    }
}

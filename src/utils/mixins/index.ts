import Vue from 'vue'
export { default as Validates } from '@utils/mixins/Validates'

interface ConvertBizNoFormatterParams {
    bizNo: string
    masking?: boolean
}

type ReplaceParams = [string | RegExp, string]

declare module 'vue/types/vue' {
    // 3. Vue에 보강할 내용을 선언하세요.
    interface Vue {
        convertBizNoFormatter(params: ConvertBizNoFormatterParams): string
        cellPhoneFormatter(cellphoneNumber: string): string
        getByteLength(text: string): number
    }
}

export const basicUtil = {
    /**
     * 사업자등록번호를 양식에 맞게 dash 붙여서 반환
     * @param {ConvertBizNoFormatterParams} params 옵션 값
     * @returns {string}
     */
    convertBizNoFormatter(params: ConvertBizNoFormatterParams): string {
        const { masking, bizNo } = params
        const separateDigit = /(\d{3})(\d{2})(\d{5})/
        const useMasking = masking ? '*****' : '$3'
        const replacer = `$1-$2-${useMasking}`

        return bizNo.replace(separateDigit, replacer)
    },

    /**
     * 휴대폰 번호 string을 입력받아 숫자 이외의 것들은 삭제하고 숫자만 남긴다. 국가코드는 0으로 치환
     * @param {string} cellphoneNumber 입력 받을 문자열
     * @returns {string}
     */
    cellPhoneFormatter(cellphoneNumber: string): string {
        if (!cellphoneNumber) {
            return ''
        }
        const dashRegExp: ReplaceParams = [/-/g, '']
        const nationaCodeRegExp: ReplaceParams = [/^\+\d{1,2}\s/g, '0']
        // 국가 코드를 0으로 치환, dash 삭제(숫자만 남기고 string으로 return)
        return cellphoneNumber
            .replace(...dashRegExp)
            .replace(...nationaCodeRegExp)
    },

    /**
     * 사업자등록번호를 양식에 맞게 dash 붙여서 반환
     * @param {string} text 옵션 값
     * @returns {number}
     */
    getByteLength(text: string): number {
        let bytes: number, index: number, characters: number // 한글 3byte
        for (
            bytes = index = 0;
            (characters = text.charCodeAt(index++));
            bytes += characters >> 11 ? 3 : characters >> 7 ? 2 : 1
        ) {
            console.log('getByteLength loop')
        }
        return bytes
    },
}

const registerMixins = () => {
    const {
        convertBizNoFormatter,
        cellPhoneFormatter,
        getByteLength,
    } = basicUtil

    Vue.mixin({
        data() {
            // kakao api
            return {
                kakaoApi: null,
            }
        },
        methods: {
            convertBizNoFormatter,
            cellPhoneFormatter,
            getByteLength,
        },
    })
}

export default registerMixins

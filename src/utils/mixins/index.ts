import Vue from 'vue'
export { default as KakaoSDK } from '@utils/mixins/KakaoSDK'
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
    }
}

const registerMixins = () => {
    Vue.mixin({
        data() {
            // kakao api
            return {
                kakaoApi: null,
            }
        },
        methods: {
            /**
             * @description
             * 사업자등록번호를 양식에 맞게 dash 붙여서 반환
             * @param {ConvertBizNoFormatterParams} params 옵션 값
             * @returns {string}
             */
            convertBizNoFormatter(params: ConvertBizNoFormatterParams) {
                const { masking, bizNo } = params
                const separateDigit = /(\d{3})(\d{2})(\d{5})/
                const useMasking = masking ? '*****' : '$3'
                const replacer = `$1-$2-${useMasking}`

                return bizNo.replace(separateDigit, replacer)
            },

            cellPhoneFormatter(cellphoneNumber: string) {
                if (!cellphoneNumber) {
                    return ''
                }
                const dashRegExp: ReplaceParams = [/\-/g, '']
                const nationaCodeRegExp: ReplaceParams = [/^\+\d{1,2}\s/g, '0']
                // 국가 코드를 0으로 치환, dash 삭제(숫자만 남기고 string으로 return)
                return cellphoneNumber.replace(...dashRegExp).replace(...nationaCodeRegExp)
            },
        },
    })
}

export default registerMixins

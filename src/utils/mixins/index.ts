import Vue from 'vue'

interface ConvertBizNoFormatterParams {
    bizNo: string
    masking?: boolean
}

declare module 'vue/types/vue' {
    // 3. Vue에 보강할 내용을 선언하세요.
    interface Vue {
        convertBizNoFormatter(params: ConvertBizNoFormatterParams): string
    }
}

const registerMixins = () => {
    Vue.mixin({
        methods: {
            convertBizNoFormatter(params: ConvertBizNoFormatterParams) {
                const { masking, bizNo } = params
                return bizNo.replace(/(\d{3})(\d{2})(\d{5})/, `$1-$2-${masking ? '*****' : '$3'}`)
            },
        },
    })
}

export default registerMixins

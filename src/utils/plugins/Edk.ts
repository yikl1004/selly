import type { PluginObject } from 'vue'

const load = (url: string) => {
    return new Promise((resolve, reject) => {
        if (typeof document === 'undefined') {
            return
        }

        const head = document.head || document.getElementsByTagName('head')[0]
        const script = document.createElement('script')

        script.async = true
        script.src = url

        head.appendChild(script)

        script.onload = resolve
        script.onerror = reject
    })
}

const bootstrap = () => {
    return load(process.env.VUE_APP_EDK_CDN)
        .then(() => {
            const edk: EmentalEDK = window.edk
            if (!edk) {
                throw new Error('EDK Inject에 실패했습니다.')
            }
            return edk
        })
        .catch(error => error)
}

/**
 * 에멘탈 EDK 모듈을 추가합니다.
 * https://data.emmental.co.kr/edk/edk.cdn.js을 받아 활성화하고
 * Vue 전역변수 $edkHost를 세팅합니다.
 */
interface PluginOptions {
    stage: 'prod'
    clientId: 'selly'
    debug: boolean
}

const Edk: PluginObject<PluginOptions> = {
    install: (app, options) => {
        let edkHost
        bootstrap()
            .then(edk => {
                edk.Host.init(options)
                edkHost = new edk.Host()
                window.$edkHost = edkHost
                app.prototype.$edkHost = edkHost
            })
            .catch(error => {
                console.warn('EDK host 초기화에 실패했습니다')
                console.error(error)
            })
    },
}

export default Edk

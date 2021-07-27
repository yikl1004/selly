import type { PluginObject } from 'vue'

interface LoadEFDSSuccessResult {
    success: true
    data: iTracerAF.Types.InitCallbackResult
}

interface LoadEFDSFailResult {
    success: false
}

type LoadEFDSResult = LoadEFDSSuccessResult | LoadEFDSFailResult

interface ScriptListItem {
    tagId: string
    src: string
    srcDev?: string
}

declare module 'vue/types/vue' {
    interface Vue {
        $efds: EFDS
    }
}

const isProduction = process.env.NODE_ENV === 'production'

const SCRIPT_LIST: ScriptListItem[] = [
    {
        tagId: 'swfobject-script',
        src: `/js/af/swfobject-min.js`,
    },
    {
        tagId: 'itraceraf-script',
        src: '/js/af/itraceraf.min.js',
    },
    {
        tagId: 'itraceraf-cfg-script',
        src: '/js/af/itraceraf.cfg.js',
        srcDev: '/js/af/itraceraf.cfg.dev.js',
    },
]

class EFDS {
    private __scriptLoaded = false

    async loadModule(): Promise<LoadEFDSResult> {
        if (!this.__scriptLoaded) {
            const success = await this.__addEFDSScript()

            if (!success) {
                return { success: false }
            }

            this.__scriptLoaded = true
        }

        try {
            const initResult = await this.__initEFDS()
            return {
                success: true,
                data: initResult,
            }
        } catch (error) {
            return { success: false }
        }
    }

    async __initEFDS(): Promise<iTracerAF.Types.InitCallbackResult> {
        return await new Promise(resolve => {
            iTracerAF.init(data => {
                resolve(data)
            })
        })
    }

    async __addEFDSScript(): Promise<boolean> {
        const promises = SCRIPT_LIST.map(({ tagId, src, srcDev }) => {
            if (isProduction) {
                return this.__addScriptTag(tagId, src)
            } else {
                return this.__addScriptTag(tagId, srcDev ?? src)
            }
        })

        try {
            await Promise.all(promises)
        } catch (error) {
            return false
        }

        return true
    }

    __addScriptTag(tagId: string, scriptUrl: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`#${tagId}`) !== null) {
                resolve()
            }

            const scriptElem = document.createElement('script')
            scriptElem.id = tagId
            scriptElem.src = scriptUrl

            scriptElem.onload = () => {
                resolve()
            }
            scriptElem.onerror = () => {
                reject()
            }

            document.body.appendChild(scriptElem)
        })
    }
}

const EFDSPlugin: PluginObject<{}> = {
    install(_Vue) {
        Object.defineProperty(_Vue.prototype, '$efds', {
            value: new EFDS(),
            enumerable: true,
        })
    },
}

export default EFDSPlugin

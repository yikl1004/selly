import type { PluginObject } from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $log: Function
        $warn: Function
        $debug: Function
        $error: Function
        $dir: Function
    }
}

type Level = 'log' | 'warn' | 'debug' | 'error' | 'dir'
interface PluginOptions {
    dev: boolean
    prefix: string
    shortname: boolean
    levels: Level[]
    forceLevels: Level[]
    history: string[]
}

const vLogger: PluginObject<PluginOptions> = {
    install(Vue, options) {
        if (vLogger.installed) {
            return
        }

        const { merge } = Vue._
        const defaultOptions: PluginOptions = {
            dev: true,
            prefix: '',
            shortname: true,
            levels: ['log', 'warn', 'debug', 'error', 'dir'],
            forceLevels: [],
            history: [],
        }

        const mergedOptions: PluginOptions = merge({}, defaultOptions, options || {})
        const logger: { [key: string]: Function } = {}

        for (const level of mergedOptions.levels) {
            logger[level] = function (...args: (string | number | symbol | object | undefined | null | [])[]) {
                if (typeof console === 'undefined') {
                    return
                }

                if (mergedOptions.dev || mergedOptions.forceLevels.includes(level)) {
                    const prefix = typeof logger.prefix === 'function' ? logger.prefix() : logger.prefix
                    const prefixWithLevel = `[${prefix} :: ${level}]`.toUpperCase()
                    args.unshift(prefixWithLevel)
                    window.console[level](args)
                    mergedOptions.history.push(args.join(' '))

                    if (mergedOptions.history.length >= 20) {
                        mergedOptions.history = []
                    }
                }
            }
            if (logger.shortname) {
                Vue.prototype[`$${level}`] = logger[level]
            }
        }
        Vue.prototype.$console = logger
    },
}

export default vLogger

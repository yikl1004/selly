import { registerCommonComponent } from '@components/common/index'
import registerPlugins from '@utils/plugins'
import registerMixins from '@utils/mixins'

export const initialize = (): void => {
    registerMixins()
    registerPlugins()
    registerCommonComponent()
}

export { registerCommonComponent, registerPlugins }

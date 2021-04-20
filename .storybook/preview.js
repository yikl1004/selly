import { addParameters } from '@storybook/vue'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Vue from 'vue'
import Vuex from 'vuex'
import { registerCommonComponent, registerPlugins } from '@utils/index'
import '../src/styles/index.scss'
import '../src/styles/storybook.md.scss'

Vue.use(Vuex)
registerPlugins()
registerCommonComponent()

addParameters({
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'iphone12',
    },
})

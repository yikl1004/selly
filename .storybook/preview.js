import { addParameters } from '@storybook/vue'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Vue from 'vue'
import Vuex from 'vuex'
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { initialize } from '@utils/index'

import 'animate.css/animate.css'

Vue.use(Vuex)
initialize()

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
    docs: {
        source: {
            language: 'html',
            // customStyle: atomOneDark,
        },
    },
})

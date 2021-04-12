import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
// import React from 'react'
// import { render } from 'react-dom'
// import toReact from '@egoist/vue-to-react'

export const parameters = {
    // docs: {
    //     prepareForInline: (storyFn, { args }) => {
    //         const Story = toReact(storyFn())
    //         return <Story {...args} />
    //     },
    // },
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
}

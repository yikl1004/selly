import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

addons.setConfig({
    // theme: themes.dark,
    theme: create({
        base: 'light',
        // Typography
        fontBase: '"Spoqa Han Sans", "Open Sans", sans-serif',
        fontCode: 'monospace',
    })
})

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-docs', '@storybook/addon-controls'],
    typescript: {
        check: false,
        checkOptions: {},
    },
    webpackFinal: async config => {
        config.resolve.plugins.push(new TsconfigPathsPlugin({}))
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        })
        return config
    },
}

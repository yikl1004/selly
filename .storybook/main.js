const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

const getResourceList = (list) => {
    return list.map(item => path.join(__dirname, item))
}

const resource = {
    scss: [
        '../src/styles/_variables.scss',
        '../src/styles/_mixins.scss',
        '../src/styles/index.scss',
        './storybook.md.scss'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-docs',
        '@storybook/addon-controls'
    ]
}

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: resource.addons,
    typescript: {
        check: false,
        checkOptions: {},
    },
    webpackFinal: async config => {
        config.resolve.plugins.push(new TsconfigPathsPlugin({}))
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader', {
                loader: 'style-resources-loader',
                options: {
                    patterns: getResourceList(resource.scss),
                    injector: 'prepend'
                }
            }],
        })
        return config
    },
}

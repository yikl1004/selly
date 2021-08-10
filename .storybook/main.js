const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

const getResourceList = list => {
    return list.map(item => path.join(__dirname, item))
}

const resource = {
    scss: ['../src/styles/_variables.scss', '../src/styles/_mixins.scss', '../src/styles/index.scss', './storybook.md.scss'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-docs', '@storybook/addon-controls'],
}

module.exports = {
    // src/stories/components/AccoItem.stories.ts
    stories: [
        // '../src/stories/**/*.stories.mdx',
        // '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/stories/components/AccoItem.stories.ts',
    ],
    addons: resource.addons,
    typescript: {
        check: true,
    },
    // babel: async options => {
    //     return options
    // },
    webpackFinal: async config => {
        config.resolve.plugins.push(new TsconfigPathsPlugin({}))
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: getResourceList(resource.scss),
                        injector: 'prepend',
                    },
                },
            ],
        })
        return config
    },
}

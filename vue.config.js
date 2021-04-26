/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */

const path = require('path')

/**
 * @type { Options }
 */
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@styles': path.join(__dirname, 'src/styles'),
                '@asstes': path.join(__dirname, 'src/assets'),
            },
            extensions: ['.vue', 'tsx'],
        },
    },
    chainWebpack(config) {
        // config.resolve.alias.delete('@')
        config.resolve.plugin('tsconfig-paths').use(require('tsconfig-paths-webpack-plugin'))
    },
    transpileDependencies: ['vuex-module-decorators'],
    runtimeCompiler: true,
}

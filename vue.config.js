/**
 * @typedef { import("path") } Path
 */
const path = require('path')

/**
 * @typedef { import("terser-webpack-plugin") } TerserPlugin
 */
const TerserPlugin = require('terser-webpack-plugin')

/**
 * @param {Array<string>} paths
 * @returns
 */
const getResourceList = paths => {
    return paths.map(res => path.join(__dirname, res))
}

const isDev = process.env.NODE_ENV !== 'production'
const styleResourceOptions = {
    preProcessor: 'scss',
    patterns: getResourceList(['./src/styles/_variables.scss', './src/styles/_mixins.scss']),
    rules: ['normal', 'normal-modules', 'vue', 'vue-modules'],
}

/**
 * @typedef { import("@vue/cli-service").ProjectOptions }
 */
module.exports = {
    // publicPath: '/selly',
    outputDir: 'dist',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@styles': path.join(__dirname, 'src/styles'),
                '@asstes': path.join(__dirname, 'src/assets'),
            },
            extensions: ['.vue', 'tsx'],
        },
        devServer: {
            https: true,
            host: 'selly.lottecard.com',
            proxy: {
                // 프록시 요청을 보낼 api의 시작 부분
                '/API': {
                    // 프록시 요청을 보낼 서버의 주소
                    target: process.env.VUE_APP_API_DOMAIN,
                },
            },
            disableHostCheck: true,
        },
        optimization: {
            minimizer: isDev
                ? []
                : [
                      new TerserPlugin({
                          terserOptions: {
                              compress: {
                                  drop_console: true, // 콘솔 로그를 제거한다
                              },
                          },
                      }),
                  ],
            splitChunks: {
                chunks: 'all',
            },
        },
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false,
        },
    },
    chainWebpack(config) {
        config.resolve.plugin('tsconfig-paths').use(require('tsconfig-paths-webpack-plugin'))
        styleResourceOptions.rules.forEach(oneOf => {
            config.module
                .rule(styleResourceOptions.preProcessor)
                // 규칙이 일치 할 때 첫 번째 일치하는 규칙 만 사용되는 규칙의 배열입니다.(말이 이해가 안되면 다시한번 곱씹어 읽어보자)
                .oneOf(oneOf)
                .use('style-resources-loader')
                .loader('style-resources-loader')
                .options({ patterns: styleResourceOptions.patterns })
        })
    },
    transpileDependencies: ['vuex-module-decorators'],
    runtimeCompiler: true,
}

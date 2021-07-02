/**
 * @typedef { import("path") } Path
 */
const path = require('path')

/**
 * @param {Array<string>} paths
 * @returns
 */
const getResourceList = paths => {
    return paths.map(res => path.join(__dirname, res))
}

const styleResourceOptions = {
    preProcessor: 'scss',
    patterns: getResourceList(['./src/styles/_variables.scss', './src/styles/_mixins.scss']),
    rules: ['normal', 'normal-modules', 'vue', 'vue-modules'],
}

/**
 * @typedef { import("@vue/cli-service").ProjectOptions }
 */
module.exports = {
    /**
     * @description style-resources-loader (vue-cli)
     * pluing 소스가 js인데 ts file에서 실행시 plugin함수에서 매개변수를 잘못받고 있어 오류가 남.
     * 아래 chainWepack 메서드에서 같은 코드를 직접 실행해 주는 것으로 변경
     * 실제 플러그인 소스도 dependency(tyle-resources-loader) 존재 유무와 관계 없이 아래 chainWebpack 코드처럼 실행만 시켜줌
     */
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'scss',
    //         patterns: getResourceList(resource.scss),
    //     },
    // },

    // publicPath: '/selly',
    outputDir: 'docs',
    configureWebpack: {
        resolve: {
            alias: {
                '@styles': path.join(__dirname, 'src/styles'),
                '@asstes': path.join(__dirname, 'src/assets'),
            },
            extensions: ['.vue', 'tsx'],
        },
        devServer: {
            // host: 'selly.lottecard.com',
            proxy: {
                // 프록시 요청을 보낼 api의 시작 부분
                '/API': {
                    // 프록시 요청을 보낼 서버의 주소
                    target: 'http://124.243.36.222:8080/',
                },
                '/addrlink': {
                    target: 'https://www.juso.go.kr',
                    changeOrigin: true,
                },
            },
            disableHostCheck: true,
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

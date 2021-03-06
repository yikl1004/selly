module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        'plugin:prettier/recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
    // parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unless-escape': 'off',
        // '@typescript-eslint/no-shadow': ['error', { builtinGlobals: true }],

        // 'prettier/prettier':
        // ['warn', { parser: 'babel-ts' }],
        // [
        //     'warn',
        //     {},
        //     {
        //         usePrettierrc: true,
        //     },
        // ],

        /**********************/
        /* General Code Rules */
        /**********************/

        // Enforce import order
        // 'import/order': 'error',

        // // Imports should come first
        // 'import/first': 'error',

        // // Other import rules
        // 'import/no-mutable-exports': 'error',

        // // Allow unresolved imports
        // 'import/no-unresolved': 'off',

        // Allow async-await
        'generator-star-spacing': 'off',

        // Prefer const over let
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false,
            },
        ],

        // No single if in an 'else' block
        'no-lonely-if': 'error',

        // Force curly braces for control flow,
        // including if blocks with a single statement
        curly: ['error', 'all'],

        // No async function without await
        'require-await': 'error',

        // Force dot notation when possible
        'dot-notation': 'error',

        'no-var': 'error',

        // Force object shorthand where possible
        'object-shorthand': 'error',

        // No useless destructuring/importing/exporting renames
        'no-useless-rename': 'error',

        /**********************/
        /*     Vue Rules      */
        /**********************/

        // Disable template errors regarding invalid end tags
        'vue/no-parsing-error': [
            'error',
            {
                'x-invalid-end-tag': false,
            },
        ],

        // Maximum 5 attributes per line instead of one
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 20,
                multiline: {
                    max: 1,
                    allowFirstLine: false,
                },
            },
        ],

        /***************************/
        /* ESLint Vue Plugin Rules */
        /***************************/
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],

        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'fetch',
                    'asyncData',
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    'head',
                    ['template', 'render'],
                    'renderError',
                ],
            },
        ],

        'vue/html-self-closing': ['off'],

        // https://eslint.vuejs.org/rules/attributes-order.html
        // TODO: ??? ??? ???????????? ????????? ??????
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    'UNIQUE',
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT',
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['src/services/*.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
        {
            files: ['src/services/core/*.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            files: ['./vue.config.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            files: ['src/**/*.vue'],
            globals: {
                BottomSheetOptionItem: 'readonly',
            },
            rules: {
                'prettier/prettier': [
                    'error',
                    {
                        printWidth: 80,
                    },
                ],
            },
        },
        {
            files: ['src/@types/node.d.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
        {
            files: ['src/stories/*.stories.ts', 'src/stories/**/*.stories.ts'],
            rules: {
                '@typescript-eslint/ban-ts-comment': 'off',
            },
        },

        {
            files: ['src/pages/example/*.vue', 'src/pages/example/**/*.vue'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },

        // FIXME: ?????? ??????, ?????? store ?????? ???????????? any??????, ?????? ?????? ?????? ??????
        {
            files: ['src/stores/modules/finance.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
}

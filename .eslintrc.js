module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['@vue/prettier', '@vue/typescript', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:vue/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'@typescript-eslint/ban-types': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		'prettier/prettier': 'off',
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
		'import/order': 'error',

		// Imports should come first
		'import/first': 'error',

		// Other import rules
		'import/no-mutable-exports': 'error',

		// Allow unresolved imports
		'import/no-unresolved': 'off',

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

		// No single if in an "else" block
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
			'error',
			{
				singleline: 5,
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
		// TODO: 팀 내 기준으로 재조정 필요
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
	],
}

const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/features/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				light: '#232F3E',
				DEFAULT: '#131921',
				sky: colors.sky,
				cyan: colors.cyan,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};

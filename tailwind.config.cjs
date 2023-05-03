/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto"],
			  },
		},
	},
	plugins: [],
}

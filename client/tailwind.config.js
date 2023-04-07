/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#101010",
				secondary: "#8455be",
				info: "#fffef5",
				wet: "#e9768f",
				dark: "#111",
				accent: "#fa8072",
				modal: "#0e1219d9",
				light: "#f6e9d4",
				darkGray: "#272727",
			},
			fontFamily: {
				display: ["Libre Baskerville", "serif"],
				paragraph: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};

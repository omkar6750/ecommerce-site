/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			textShadow: {
				sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
				DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)',
				lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				Maroon: '#8D0B41',
				Gold: '#D39D55',
				LightBeige: '#D6CFB4',
				OffWhite: '#FFF8E6',
				Navy: '#27445D',
				MossGreen: '#497D74',
				customTeal: '#71BBB2',
				Beige: '#EFE9D5',

				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(function ({ addUtilities, e, theme, variants }) {
			const textShadowValues = theme('textShadow') || {};
			const utilities = Object.entries(textShadowValues).map(([key, value]) => {
				return {
					[`.text-shadow-${e(key)}`]: {
						textShadow: value,
					},
				};
			});
			addUtilities(utilities, {
				variants: variants('textShadow', ['responsive']),
			});
		}),
	],

}


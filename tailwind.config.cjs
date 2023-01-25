const plugin = require('tailwindcss/plugin')
const { generatePalette } = require('./tools/tailwind/palette.cjs')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: generatePalette(
      {
        primary: { color: 'hsl(254, 66%, 52%)', shade: 500 },
        neutral: '#6b7280',
      },
      { dark: true },
    ),
    focusable: {
      primary: { width: '2px', style: 'solid', color: 'red', offset: '2px' },
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          focusable: (value) => {
            console.log(value)
            const { width = '2px', style = 'solid', color = 'currentColor', offset = '0px' } = value
            return {
              line: `${width} ${style} ${color}`,
              offset: offset,
            }
          },
        },
        { values: theme('focusable') },
      )
    }),
  ],
}

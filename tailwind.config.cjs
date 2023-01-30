const plugin = require('tailwindcss/plugin')
const { generatePalette } = require('./tools/tailwind/palette.cjs')

const colors = generatePalette(
  {
    primary: { color: 'hsl(254, 66%, 52%)', shade: 500 },
    neutral: '#6b7280',
  },
  { dark: true },
)

colors['base'] = colors.neutral[100]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors,
    focusable: {
      border: {
        width: `1px`,

        offset: '0px',
      },
      outline: {
        width: `2px`,

        offset: '2px',
      },
      // primary: {
      //   width: `2px`,
      //   style: `solid`,
      //   color: 'colors.primary.500 / 50%',
      //   offset: '2px',
      // },
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    // plugin(({ matchUtilities, theme }) => {
    //   matchUtilities(
    //     {
    //       focusable: (value) => {
    //         const { color, width = '2px', style = 'solid', offset = '0px' } = value
    //         console.log('color', theme(color))
    //         return {
    //           '&:focus-visible': {
    //             outline: `${width} ${style} ${color}`,
    //             outlineOffset: offset,
    //           },
    //         }
    //       },
    //     },
    //     { values: theme('focusable') },
    //   )
    // }),
  ],
}

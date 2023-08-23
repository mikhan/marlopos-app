const plugin = require('tailwindcss/plugin')
const { generatePalette } = require('./tools/tailwind/palette.cjs')

const palette = generatePalette(
  {
    primary: 'hsl(254, 66%, 52%)',
    neutral: '#6b7280',
  },
  { dark: false },
)

palette.colors['base'] = palette.colors.neutral[100]
palette.variables['--colors-base-100'] = palette.variables['--colors-neutral-100']

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: palette.colors,
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
    variables: palette.variables,
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        ':root': theme('variables'),
      })
    }),
  ],
}

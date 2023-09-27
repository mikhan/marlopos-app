import plugin from 'tailwindcss/plugin'

export function squarePlugin() {
  return plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        square: (value) => ({
          width: value,
          height: value,
        }),
      },
      { values: theme('spacing') },
    )
  })
}
